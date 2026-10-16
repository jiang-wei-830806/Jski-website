// 对账兜底定时任务（单进程 setInterval）
// 每轮做两件事：
//   1. PAYING 状态超过 N 分钟未收到终态通知 → 主动调 /v1.0/query 收口
//      （NSS 通知重试不保证送达，这是最终兜底）
//   2. INIT/PAYING 超过 expire 时间 → 置 CLOSED（未支付订单清扫）
// 注意：进程重启期间停走，重启后下一轮会补扫（基于 updated_at 而非内存水位）。

const orderStore = require('../models/orderStore');
const starpayClient = require('../services/starpay/client');

let timer = null;
let running = false;

async function reconcileOnce() {
  if (running) return; // 上一轮未结束则跳过，防止重叠
  running = true;
  try {
    // 1) 超时未终态的支付中订单 → 主动查询
    const staleMinutes = parseInt(process.env.PAY_RECONCILE_STALE_MIN || '3', 10);
    const stale = orderStore.listStalePaying(staleMinutes, 20);
    for (const order of stale) {
      try {
        const r = await starpayClient.queryOrder({ merchantOrderNo: order.merchantOrderNo });
        orderStore.applyNotifyResult({
          merchantOrderNo: order.merchantOrderNo,
          tradeNo: r.tradeNo,
          payStatus: r.payStatus,
          notifyType: 'QUERY',
          signValid: true,
          rawBody: JSON.stringify(r)
        });
        console.log(`[reconciler] 兜底查询 order=${order.merchantOrderNo} → payStatus=${r.payStatus}`);
      } catch (e) {
        // 查询失败（网络/超时）不改状态，等下一轮
        console.error(`[reconciler] 查询失败 order=${order.merchantOrderNo}: ${e.code} ${e.message}`);
      }
    }

    // 2) 超时未支付订单清扫
    const expired = orderStore.listExpired(50);
    for (const order of expired) {
      if (orderStore.markClosed(order.merchantOrderNo)) {
        console.log(`[reconciler] 超时订单关闭 order=${order.merchantOrderNo} status=${order.status}`);
      }
    }
  } catch (e) {
    console.error(`[reconciler] 本轮异常: ${e.message}`);
  } finally {
    running = false;
  }
}

function start() {
  if (timer) return;
  const intervalMs = parseInt(process.env.PAY_RECONCILE_INTERVAL_MS || '60000', 10);
  timer = setInterval(reconcileOnce, intervalMs);
  timer.unref(); // 不阻止进程正常退出
  console.log(`| 支付对账兜底任务已启动（每 ${intervalMs / 1000}s）`);
}

function stop() {
  if (timer) clearInterval(timer);
  timer = null;
}

module.exports = { start, stop };
