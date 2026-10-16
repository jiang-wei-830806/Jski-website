// 订单存储层 —— better-sqlite3（嵌入式，零运维）
// 两张表：
//   orders      —— 订单主表 + 状态机（INIT → PAYING → SUCCESS/FAILURE/CLOSED；SUCCESS → REFUNDED）
//   notify_log  —— 通知/查询审计日志（验签失败也落库，便于排查争议）
// 幂等设计：状态转移用「UPDATE ... WHERE status IN (允许的前置态)」，按影响行数判断是否转移成功，
//           重复通知/并发到达时天然幂等，不会产生重复状态迁移。

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = process.env.SQLITE_PATH || path.join(process.cwd(), 'data', 'payment.db');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ---- 建表（幂等）----
db.exec(`
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_token TEXT NOT NULL UNIQUE,             -- UUIDv4，对外唯一标识（结果页/轮询）
  merchant_order_no TEXT NOT NULL UNIQUE,       -- 我方订单号，NSS 侧唯一
  client_nonce TEXT UNIQUE,                     -- 表单一次性令牌，防重复提交
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  amount_jpy INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'JPY',
  status TEXT NOT NULL DEFAULT 'INIT',          -- INIT/PAYING/SUCCESS/FAILURE/CLOSED/REFUNDED
  trade_no TEXT,
  payment_url TEXT,
  notify_count INTEGER NOT NULL DEFAULT 0,
  error_code TEXT,
  error_message TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  paid_at TEXT,
  expire_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_orders_status_updated ON orders (status, updated_at);
CREATE INDEX IF NOT EXISTS idx_orders_expire ON orders (expire_at);

CREATE TABLE IF NOT EXISTS notify_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  merchant_order_no TEXT NOT NULL,
  notify_type TEXT NOT NULL,                    -- PAY_RESULT / REFUND_RESULT / QUERY
  pay_status TEXT,
  sign_valid INTEGER NOT NULL DEFAULT 0,        -- 0/1，验签失败也落库
  raw_body TEXT NOT NULL,                       -- 通知原文（托管模式不含卡号）
  received_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_notify_log_order ON notify_log (merchant_order_no);
`);

// ---- 状态机 ----
const TERMINAL = ['SUCCESS', 'FAILURE', 'CLOSED', 'REFUNDED'];
const TRANSITIONS = {
  INIT: ['PAYING', 'CLOSED'],
  PAYING: ['SUCCESS', 'FAILURE', 'CLOSED'],
  SUCCESS: ['REFUNDED'],
  FAILURE: [],
  CLOSED: [],
  REFUNDED: []
};

function nowIso() {
  return new Date().toISOString();
}

// merchantOrderNo 规则：J + base36时间戳 + 6位随机，满足 string[6,64] 且只含字母数字
function genMerchantOrderNo() {
  return 'J' + Date.now().toString(36).toUpperCase() + crypto.randomBytes(3).toString('hex').toUpperCase();
}

const stmts = {
  insertOrder: db.prepare(`
    INSERT INTO orders (order_token, merchant_order_no, client_nonce, product_id, product_name,
                        amount_jpy, currency, status, created_at, updated_at, expire_at)
    VALUES (@order_token, @merchant_order_no, @client_nonce, @product_id, @product_name,
            @amount_jpy, 'JPY', 'INIT', @now, @now, @expire_at)
  `),
  getByToken: db.prepare('SELECT * FROM orders WHERE order_token = ?'),
  getByMerchantOrderNo: db.prepare('SELECT * FROM orders WHERE merchant_order_no = ?'),
  getByNonce: db.prepare('SELECT * FROM orders WHERE client_nonce = ?'),
  markPaying: db.prepare(`
    UPDATE orders SET status = 'PAYING', trade_no = @trade_no, payment_url = @payment_url,
                      updated_at = @now
    WHERE order_token = @order_token AND status = 'INIT'
  `),
  // 状态转移守卫：单前置状态原子更新（WHERE status = 期望值），影响行数 0 = 已被并发/前序通知处理。
  // 允许的前置状态在 applyNotifyResult 里用 TRANSITIONS 表判定。
  transition: db.prepare(`
    UPDATE orders SET status = @to_status, trade_no = COALESCE(@trade_no, trade_no),
                      paid_at = CASE WHEN @to_status = 'SUCCESS' THEN @now ELSE paid_at END,
                      error_code = COALESCE(@error_code, error_code),
                      error_message = COALESCE(@error_message, error_message),
                      notify_count = notify_count + 1, updated_at = @now
    WHERE merchant_order_no = @merchant_order_no AND status = @expected_status
  `),
  bumpNotify: db.prepare(`
    UPDATE orders SET notify_count = notify_count + 1, updated_at = @now
    WHERE merchant_order_no = @merchant_order_no
  `),
  insertNotifyLog: db.prepare(`
    INSERT INTO notify_log (merchant_order_no, notify_type, pay_status, sign_valid, raw_body, received_at)
    VALUES (@merchant_order_no, @notify_type, @pay_status, @sign_valid, @raw_body, @now)
  `),
  listStalePaying: db.prepare(`
    SELECT * FROM orders WHERE status = 'PAYING' AND updated_at < @before
    ORDER BY updated_at ASC LIMIT @limit
  `),
  listExpired: db.prepare(`
    SELECT * FROM orders WHERE status IN ('INIT', 'PAYING') AND expire_at < @now
    ORDER BY expire_at ASC LIMIT @limit
  `)
};

function rowToOrder(row) {
  if (!row) return null;
  return {
    orderToken: row.order_token,
    merchantOrderNo: row.merchant_order_no,
    clientNonce: row.client_nonce,
    productId: row.product_id,
    productName: row.product_name,
    amountJpy: row.amount_jpy,
    currency: row.currency,
    status: row.status,
    tradeNo: row.trade_no,
    paymentUrl: row.payment_url,
    notifyCount: row.notify_count,
    errorCode: row.error_code,
    errorMessage: row.error_message,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    paidAt: row.paid_at,
    expireAt: row.expire_at
  };
}

function writeNotifyLog({ merchantOrderNo, notifyType, payStatus, signValid, rawBody }) {
  stmts.insertNotifyLog.run({
    merchant_order_no: merchantOrderNo || 'UNKNOWN',
    notify_type: notifyType || 'UNKNOWN',
    pay_status: payStatus || null,
    sign_valid: signValid ? 1 : 0,
    raw_body: rawBody || '',
    now: nowIso()
  });
}

const orderStore = {
  // 创建订单。clientNonce 重复（双击/重发）时抛 SQLiteError（UNIQUE 约束），由路由捕获走幂等分支
  createOrder({ product, clientNonce }) {
    const expireHours = parseInt(process.env.PAY_ORDER_EXPIRE_HOURS || '24', 10);
    const now = nowIso();
    const row = {
      order_token: crypto.randomUUID(),
      merchant_order_no: genMerchantOrderNo(),
      client_nonce: clientNonce,
      product_id: product.id,
      product_name: product.name,
      amount_jpy: product.priceJpy,
      now,
      expire_at: new Date(Date.now() + expireHours * 3600 * 1000).toISOString()
    };
    stmts.insertOrder.run(row);
    return rowToOrder(stmts.getByToken.get(row.order_token));
  },

  getByToken(token) {
    return rowToOrder(stmts.getByToken.get(token));
  },

  getByMerchantOrderNo(no) {
    return rowToOrder(stmts.getByMerchantOrderNo.get(no));
  },

  getByNonce(nonce) {
    return rowToOrder(stmts.getByNonce.get(nonce));
  },

  // INIT → PAYING。返回 false 表示订单不在 INIT（并发下已被处理），路由需读取最新状态再决定
  markPaying(orderToken, { tradeNo, paymentUrl }) {
    const info = stmts.markPaying.run({
      order_token: orderToken,
      trade_no: tradeNo,
      payment_url: paymentUrl,
      now: nowIso()
    });
    return info.changes > 0;
  },

  /**
   * 应用支付结果（通知或主动查询），核心幂等入口。
   * @returns {{ applied: boolean, order: object|null }}
   *   applied=true  状态发生了迁移
   *   applied=false 重复通知/终态短路/订单不存在（已记 notify_log、bump notify_count）
   */
  applyNotifyResult({ merchantOrderNo, payStatus, tradeNo, notifyType, signValid, rawBody, errorCode, errorMessage }) {
    writeNotifyLog({ merchantOrderNo, notifyType, payStatus, signValid, rawBody });

    const order = this.getByMerchantOrderNo(merchantOrderNo);
    if (!order) return { applied: false, order: null };

    if (TERMINAL.includes(order.status)) {
      // 终态短路：计数 +1，不再迁移，照常返回 200
      stmts.bumpNotify.run({ merchant_order_no: merchantOrderNo, now: nowIso() });
      return { applied: false, order };
    }

    // 通知里的支付状态映射到我方状态机目标
    const toStatus = { SUCCESS: 'SUCCESS', FAILURE: 'FAILURE', CANCEL: 'CLOSED', REFUNDED: 'REFUNDED' }[payStatus];
    if (!toStatus || !TRANSITIONS[order.status].includes(toStatus)) {
      // 中间状态（INIT）或非法迁移不处理，只计数
      stmts.bumpNotify.run({ merchant_order_no: merchantOrderNo, now: nowIso() });
      return { applied: false, order };
    }

    const info = stmts.transition.run({
      merchant_order_no: merchantOrderNo,
      to_status: toStatus,
      trade_no: tradeNo,
      error_code: errorCode,
      error_message: errorMessage,
      expected_status: order.status,
      now: nowIso()
    });
    return { applied: info.changes > 0, order: this.getByMerchantOrderNo(merchantOrderNo) };
  },

  // reconciler 兜底：PAYING 超过 N 分钟未收到终态通知的订单
  listStalePaying(minutes, limit = 20) {
    const before = new Date(Date.now() - minutes * 60 * 1000).toISOString();
    return stmts.listStalePaying.all({ before, limit }).map(rowToOrder);
  },

  // 超时未支付订单（INIT 未发起 / PAYING 未完成），reconciler 置 CLOSED
  listExpired(limit = 50) {
    return stmts.listExpired.all({ now: nowIso(), limit }).map(rowToOrder);
  },

  // INIT/PAYING → CLOSED（仅超时清扫使用），返回是否发生迁移
  markClosed(merchantOrderNo) {
    const info = db.prepare(`
      UPDATE orders SET status = 'CLOSED', updated_at = ?
      WHERE merchant_order_no = ? AND status IN ('INIT', 'PAYING')
    `).run(nowIso(), merchantOrderNo);
    return info.changes > 0;
  }
};

module.exports = orderStore;
