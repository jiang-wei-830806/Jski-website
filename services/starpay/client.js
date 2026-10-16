// StarPay (NetStars) 收银台 API 客户端
// 封装 /v1.0/pay（创建托管收银台订单）与 /v1.0/query（支付结果查询）。
//
// ⚠️ 最高危约束：签名原文必须是实际发送的 body 字节。
//    本文件保证 rawBody 只序列化一次，签名与 fetch 使用同一字符串。
//    修改本文件时绝不允许改成“先签名再让 fetch 序列化对象”的写法。

const moment = require('moment-timezone');
const cfg = require('./config');
const crypto = require('./crypto');

// NSS 业务错误（result.status 非 SUCCESS / 网络失败 / 验签失败）
class StarpayError extends Error {
  constructor(message, code, status) {
    super(message);
    this.name = 'StarpayError';
    this.code = code || 'UNKNOWN';
    this.status = status;
    this.isOperational = true;
  }
}

function nowIsoTokyo() {
  return moment().tz('Asia/Tokyo').format('YYYY-MM-DDTHH:mm:ssZ'); // ISO8601，例: 2026-10-15T12:34:56+09:00
}

// 组装单订单托管收银台模式请求体
function buildPayPayload({ merchantOrderNo, amountJpy, goodsDescription }) {
  if (!Number.isInteger(amountJpy) || amountJpy <= 0) {
    throw new StarpayError(`金额必须是正整数日元，当前值: ${amountJpy}`, 'INVALID_AMOUNT');
  }
  return {
    orderInfo: [{
      merchantId: cfg.merchantId,
      merchantOrderNo,
      amount: { currency: 'JPY', orderAmount: String(amountJpy), payAmount: String(amountJpy) },
      payTime: nowIsoTokyo(),
      payParam: {},
      frontCallbackUrl: '', // 由调用方（routes/payment.js）拼入 orderToken 后传入
      notifyUrl: cfg.notifyUrl,
      goodsInfo: { goodsDescription: Buffer.from(goodsDescription, 'utf8').toString('base64') } // spec 要求 base64
    }],
    businessInfo: { businessType: 'SINGLE', businessParams: [{}] },
    paymentProduct: { paymentSource: 'API', paymentProductNo: '', paymentBrand: '' },
    isCashier: true,
    isBatchNotify: false,
    batchNotifyUrl: '',
    environmentInfo: {}
  };
}

// 带签名的统一请求：签名与发送共用同一 rawBody 字符串，响应验签后再 JSON.parse
async function signedPost(pathname, payload) {
  const rawBody = JSON.stringify(payload);
  const sign = crypto.signBody(rawBody, cfg.privateKeyPem);
  let res;
  try {
    res = await fetch(cfg.baseUrl + pathname, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'oem': cfg.oemId,
        'sysMerchantId': cfg.sysMerchantId,
        'language': cfg.language,
        'sign': sign
      },
      body: rawBody,
      signal: AbortSignal.timeout(cfg.payTimeoutMs)
    });
  } catch (e) {
    // 超时/网络错误 = 状态未知，绝不能当作支付失败处理（由调用方保持订单 INIT 等兜底）
    throw new StarpayError(`StarPay 请求失败: ${e.name === 'TimeoutError' ? '请求超时（状态未知）' : e.message}`, 'NETWORK_ERROR');
  }
  const text = await res.text();
  if (!res.ok) {
    throw new StarpayError(`StarPay HTTP ${res.status}`, 'HTTP_' + res.status, res.status);
  }
  if (!crypto.verifyBody(text, res.headers.get('sign'), cfg.publicKeyPem)) {
    throw new StarpayError('StarPay 响应验签失败', 'VERIFY_FAILED');
  }
  let body;
  try {
    body = JSON.parse(text);
  } catch (e) {
    throw new StarpayError('StarPay 响应非合法 JSON', 'BAD_JSON');
  }
  return body;
}

// 创建托管收银台订单 → { tradeNo, paymentUrl, orderStatus }
// frontCallbackUrl 带 orderToken，用户支付完成后 NSS 引导浏览器回到我们的结果页
async function createCashierOrder({ merchantOrderNo, amountJpy, goodsDescription, orderToken }) {
  if (cfg.mock) {
    return {
      tradeNo: 'MOCK' + merchantOrderNo,
      paymentUrl: '/mock-cashier?token=' + orderToken,
      orderStatus: 'INIT'
    };
  }
  const payload = buildPayPayload({ merchantOrderNo, amountJpy, goodsDescription });
  payload.orderInfo[0].frontCallbackUrl = `${cfg.frontCallbackUrl}?token=${orderToken}`;
  const body = await signedPost('/v1.0/pay', payload);
  if (body.result?.status !== 'SUCCESS' || body.dealStatus !== 'SUCCESS') {
    // 只记录错误码与信息，不打整个请求体
    throw new StarpayError(
      `创建支付订单失败: ${body.result?.code} ${body.result?.message}`,
      body.result?.code
    );
  }
  const info = body.resOrderInfo && body.resOrderInfo[0];
  if (!info || !info.paymentUrl) {
    throw new StarpayError('StarPay 响应缺少 paymentUrl', 'NO_PAYMENT_URL');
  }
  return { tradeNo: info.tradeNo, paymentUrl: info.paymentUrl, orderStatus: info.orderStatus };
}

// 支付结果查询（兜底用，merchantOrderNo / tradeNo 二选一，本模块统一用前者）
// → { tradeNo, payStatus, orderStatus, settleDate, payTime, amount }
async function queryOrder({ merchantOrderNo }) {
  if (cfg.mock) {
    // mock 下被兜底查询说明用户停留在收银台但未完成支付（通知一直没来），按放弃处理
    return { tradeNo: 'MOCK' + merchantOrderNo, payStatus: 'FAILURE', orderStatus: 'FAILURE' };
  }
  const body = await signedPost('/v1.0/query', { merchantId: cfg.merchantId, merchantOrderNo });
  if (body.result?.status !== 'SUCCESS') {
    throw new StarpayError(`查询支付结果失败: ${body.result?.code} ${body.result?.message}`, body.result?.code);
  }
  const info = body.orderInfo || (body.resOrderInfo && body.resOrderInfo[0]) || {};
  return {
    tradeNo: info.tradeNo,
    payStatus: info.payStatus,
    orderStatus: info.orderStatus,
    settleDate: info.settleDate,
    payTime: info.payTime,
    amount: info.amount
  };
}

module.exports = { createCashierOrder, queryOrder, StarpayError };
