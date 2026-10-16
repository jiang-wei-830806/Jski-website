// 支付模块路由
// 数据流：
//   GET  /products              商品列表页（表单带一次性 nonce，防重复提交）
//   POST /payment/create        创建订单 → 调 NSS /pay → 302 到托管收银台
//   GET  /payment/result        支付结果页（frontCallbackUrl 落点，不信参数，只轮询本地状态）
//   GET  /payment/status/:token 轮询接口（仅暴露 UUID token，防订单号枚举）
//   POST /payment/notify        NSS 异步通知（验签→状态机→任何分支都回 200）
// mock 模式（NSS_MOCK=true）额外注册：
//   GET  /mock-cashier          本地模拟收银台页面
//   POST /mock-cashier/complete 触发与真实通知同构的回调（含验签链路）

const express = require('express');
const crypto = require('crypto');
const { rateLimit } = require('express-rate-limit');
const productCatalog = require('../config/products');
const orderStore = require('../models/orderStore');
const starpayCfg = require('../services/starpay/config');
const starpayCrypto = require('../services/starpay/crypto');
const starpayClient = require('../services/starpay/client');

const router = express.Router();

// ---- 局部限流（全局 limiter 在 server.js 中对 /payment/notify 做了豁免）----
const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false,
  message: { error: '支付请求过于频繁，请1小时后再尝试' }
});
const statusLimiter = rateLimit({
  windowMs: 60 * 1000, max: 60, standardHeaders: true, legacyHeaders: false,
  message: { error: '请求过于频繁' }
});
const mockCompleteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false,
  message: { error: '请求过于频繁' }
});

// ---- 表单一次性 nonce ----
// 15分钟窗口内同一商品 → 同一 nonce → 幂等；窗口外刷新 → 新订单
// 用窗口而不是随机数，避免用户刷新商品页就产生一堆 INIT 垃圾订单
function formNonce(productId) {
  const windowId = Math.floor(Date.now() / (15 * 60 * 1000));
  return crypto.createHmac('sha256', starpayCfg.formSecret).update(`${productId}:${windowId}`).digest('hex');
}

function yen(n) {
  return '¥' + Number(n).toLocaleString('ja-JP');
}

// ---- 商品列表页 ----
router.get('/products', (req, res) => {
  res.render('payment/products', {
    pageTitle: '在线支付 | JSKI 中文国际滑雪学校',
    pageDesc: 'JSKI 课程费用在线支付，支持 PayPay、信用卡、便利店等多种支付方式。',
    noindex: true,
    products: productCatalog.getProducts().map(p => ({
      ...p,
      priceFormatted: yen(p.priceJpy),
      nonce: formNonce(p.id)
    }))
  });
});

// ---- 创建订单并跳转收银台 ----
router.post('/payment/create', createLimiter, async (req, res) => {
  const { productId, nonce } = req.body || {};
  const product = productId ? productCatalog.getProductById(String(productId)) : null;
  if (!product || !nonce || typeof nonce !== 'string' || nonce.length > 128) {
    return res.status(400).render('payment/result', {
      pageTitle: '支付失败 | JSKI', noindex: true,
      state: 'error', message: '支付请求无效，请回到商品页重新发起。'
    });
  }

  // 幂等：同一 nonce（双击/重发/刷新）直接复用已有订单
  let order = orderStore.getByNonce(nonce);
  if (order) return redirectForExistingOrder(res, order);

  try {
    order = orderStore.createOrder({ product, clientNonce: nonce });
  } catch (e) {
    // 并发下唯一索引冲突 → 另一请求已创建，走复用
    order = orderStore.getByNonce(nonce);
    if (order) return redirectForExistingOrder(res, order);
    throw e;
  }

  let payResult;
  try {
    payResult = await starpayClient.createCashierOrder({
      merchantOrderNo: order.merchantOrderNo,
      amountJpy: order.amountJpy,
      goodsDescription: order.productName,
      orderToken: order.orderToken
    });
  } catch (e) {
    // NSS 调用失败（网络超时=状态未知 / 业务错误）：订单保持 INIT，等超时清扫收口
    // 只记录错误码与信息，绝不打印请求体
    console.error(`[payment] 创建收银台订单失败 order=${order.merchantOrderNo}: ${e.code} ${e.message}`);
    return res.status(502).render('payment/result', {
      pageTitle: '支付发起失败 | JSKI', noindex: true,
      state: 'error', message: '支付发起失败，请稍后重试；如已扣款请勿重复支付，请联系客服核对。'
    });
  }

  if (!orderStore.markPaying(order.orderToken, { tradeNo: payResult.tradeNo, paymentUrl: payResult.paymentUrl })) {
    // 并发：状态已被其他请求推进，按最新状态走
    return redirectForExistingOrder(res, orderStore.getByToken(order.orderToken));
  }
  return res.redirect(payResult.paymentUrl);
});

// 已存在订单的跳转逻辑：支付中 → 回收银台；否则 → 结果页
function redirectForExistingOrder(res, order) {
  if (!order) return res.redirect('/products');
  if (order.status === 'PAYING' && order.paymentUrl) return res.redirect(order.paymentUrl);
  return res.redirect(`/payment/result?token=${order.orderToken}`);
}

// ---- 支付结果页（frontCallbackUrl 落点，不据参数判定结果）----
router.get('/payment/result', (req, res) => {
  const token = typeof req.query.token === 'string' ? req.query.token : '';
  const order = token ? orderStore.getByToken(token) : null;
  if (!order) {
    return res.status(404).render('payment/result', {
      pageTitle: '订单不存在 | JSKI', noindex: true,
      state: 'error', message: '订单不存在或链接已失效。'
    });
  }
  res.render('payment/result', {
    pageTitle: '支付结果 | JSKI', noindex: true,
    state: 'pending', token: order.orderToken,
    productName: order.productName, amountFormatted: yen(order.amountJpy)
  });
});

// ---- 轮询接口（2s 间隔 × 60 次，前端脚本使用）----
router.get('/payment/status/:token', statusLimiter, (req, res) => {
  const order = orderStore.getByToken(req.params.token);
  if (!order) return res.status(404).json({ error: '订单不存在' });
  if (['SUCCESS', 'FAILURE', 'CLOSED', 'REFUNDED'].includes(order.status)) {
    res.set('Cache-Control', 'no-store');
  }
  res.json({
    status: order.status,
    productName: order.productName,
    amountJpy: order.amountJpy,
    updatedAt: order.updatedAt
  });
});

// ---- NSS 异步通知 ----
// ⚠️ 任何分支都必须返回 HTTP 200：验签失败、订单不存在、重复通知、处理异常
//     返回非 200 会触发 NSS 重试风暴；异常处理自成一体，不依赖全局 errorHandler。
router.post('/payment/notify', (req, res) => {
  const rawBody = req.rawBody || '';
  try {
    const sign = req.headers['sign'];
    const signValid = starpayCrypto.verifyBody(rawBody, sign, starpayCfg.publicKeyPem);

    let body;
    try {
      body = JSON.parse(rawBody || '{}');
    } catch (e) {
      orderStore.applyNotifyResult({
        merchantOrderNo: 'UNPARSEABLE', notifyType: 'BAD_JSON', signValid, rawBody
      });
      return res.status(200).json({ received: true });
    }

    const notifyType = body.notifyType || 'UNKNOWN';

    // 验签失败：落库告警但不改订单状态，照样回 200
    if (!signValid) {
      const orderInfo = body.orderInfo || {};
      orderStore.applyNotifyResult({
        merchantOrderNo: orderInfo.merchantOrderNo || 'SIGN_INVALID',
        notifyType, payStatus: orderInfo.payStatus, signValid, rawBody
      });
      console.error(`[payment] 通知验签失败 notifyType=${notifyType}`);
      return res.status(200).json({ received: true });
    }

    // P1 只处理支付结果；退款/绑卡/订阅结果仅落审计日志，业务处理属 P2
    if (notifyType === 'PAY_RESULT') {
      const orderInfo = body.orderInfo || {};
      orderStore.applyNotifyResult({
        merchantOrderNo: orderInfo.merchantOrderNo,
        tradeNo: orderInfo.tradeNo,
        payStatus: orderInfo.payStatus,
        notifyType,
        signValid,
        rawBody
      });
    } else {
      const orderInfo = body.orderInfo || {};
      orderStore.applyNotifyResult({
        merchantOrderNo: orderInfo.merchantOrderNo || 'UNSUPPORTED_TYPE',
        notifyType, payStatus: orderInfo.payStatus, signValid, rawBody
      });
      console.log(`[payment] 收到未处理的通知类型（已记录，P2 处理）: ${notifyType}`);
    }
  } catch (e) {
    // 兜底：通知处理绝不允许抛到 errorHandler（会回 500）
    console.error(`[payment] 通知处理异常: ${e.message}`);
  }
  return res.status(200).json({ received: true });
});

// ---- mock 收银台（仅 NSS_MOCK=true 注册，用于无凭证阶段本地联调）----
if (starpayCfg.mock) {
  router.get('/mock-cashier', (req, res) => {
    const token = typeof req.query.token === 'string' ? req.query.token : '';
    const order = token ? orderStore.getByToken(token) : null;
    if (!order) {
      return res.status(404).render('payment/result', {
        pageTitle: '订单不存在 | JSKI', noindex: true,
        state: 'error', message: '订单不存在。'
      });
    }
    res.render('payment/mock-cashier', {
      layout: false, // 模拟第三方页面，不带本站布局
      token: order.orderToken,
      merchantOrderNo: order.merchantOrderNo,
      productName: order.productName,
      amountFormatted: yen(order.amountJpy)
    });
  });

  router.post('/mock-cashier/complete', mockCompleteLimiter, (req, res) => {
    const { token, outcome } = req.body || {};
    const order = token ? orderStore.getByToken(token) : null;
    if (!order) return res.status(404).json({ error: '订单不存在' });

    // 构造与 spec 同构的通知 body，用本地测试密钥对签名后走真实验签链路
    const notifyBody = {
      notifyType: 'PAY_RESULT',
      orderInfo: {
        merchantId: starpayCfg.merchantId || 'mock-merchant',
        merchantOrderNo: order.merchantOrderNo,
        tradeNo: order.tradeNo || ('MOCK' + order.merchantOrderNo),
        payStatus: outcome === 'success' ? 'SUCCESS' : 'FAILURE',
        amount: { currency: 'JPY', orderAmount: order.amountJpy, payAmount: order.amountJpy },
        payTime: new Date().toISOString(),
        settleDate: new Date().toISOString().slice(0, 10).replace(/-/g, '')
      },
      paymentProductNo: outcome === 'success' ? 'PAYPAYOM' : ''
    };
    const rawBody = JSON.stringify(notifyBody);
    const sign = starpayCrypto.signBody(rawBody, starpayCfg.privateKeyPem);
    const signValid = starpayCrypto.verifyBody(rawBody, sign, starpayCfg.publicKeyPem);

    const result = orderStore.applyNotifyResult({
      merchantOrderNo: order.merchantOrderNo,
      tradeNo: notifyBody.orderInfo.tradeNo,
      payStatus: notifyBody.orderInfo.payStatus,
      notifyType: 'PAY_RESULT',
      signValid,
      rawBody
    });
    res.json({ applied: result.applied, status: result.order ? result.order.status : null });
  });
}

module.exports = router;
