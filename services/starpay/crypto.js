// StarPay RSA-SHA256 签名 / 验签
// 签名算法: SHA256withRSA (RSA 2048)
// 规则: 对整个请求 body 的原始字符串用我方私钥签名, base64 后放入 header sign 字段;
//       NSS 的响应与通知同样携带 sign, 用 NSS 公钥验签, 确保信息确实来自 NSS。

const crypto = require('crypto');

// 对 body 原始字符串签名，返回 base64 签名值
function signBody(rawBody, privateKeyPem) {
  return crypto
    .createSign('RSA-SHA256')
    .update(rawBody, 'utf8')
    .sign(privateKeyPem, 'base64');
}

// 验签：NSS 响应/通知的 body 原文 + header sign 值 + NSS 公钥
function verifyBody(rawBody, signValue, publicKeyPem) {
  if (!signValue) return false;
  try {
    return crypto
      .createVerify('RSA-SHA256')
      .update(rawBody, 'utf8')
      .verify(publicKeyPem, signValue, 'base64');
  } catch (e) {
    return false;
  }
}

module.exports = { signBody, verifyBody };
