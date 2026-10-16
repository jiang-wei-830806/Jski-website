// StarPay (NetStars) 配置归一化与启动自检
// 所有 NSS_* 环境变量在此集中读取校验，其他模块只引用本文件的导出对象。

const fs = require('fs');
const path = require('path');

function readPem(envKey) {
  const p = process.env[envKey];
  if (!p) return null;
  const abs = path.isAbsolute(p) ? p : path.join(process.cwd(), p);
  if (!fs.existsSync(abs)) return null;
  return fs.readFileSync(abs, 'utf8');
}

const cfg = {
  mock: process.env.NSS_MOCK === 'true',
  baseUrl: (process.env.NSS_BASE_URL || '').replace(/\/+$/, ''), // 去掉结尾斜杠
  oemId: process.env.NSS_OEM_ID || '',
  sysMerchantId: process.env.NSS_SYS_MERCHANT_ID || '',
  merchantId: process.env.NSS_MERCHANT_ID || '',
  privateKeyPem: readPem('NSS_PRIVATE_KEY_PATH'),   // 我方 RSA 私钥，用于请求签名
  publicKeyPem: readPem('NSS_PUBLIC_KEY_PATH'),     // NSS 的 RSA 公钥，用于响应/通知验签
  frontCallbackUrl: process.env.NSS_FRONT_CALLBACK_URL || '',
  notifyUrl: process.env.NSS_NOTIFY_URL || '',
  language: 'en-US',
  payTimeoutMs: 60000,
  formSecret: process.env.PAY_FORM_SECRET || ''
};

// ---- 启动自检 ----
// 生产环境绝不允许 mock 模式，防止误配把假支付流程带到线上
if (cfg.mock && process.env.NODE_ENV === 'production') {
  throw new Error('NSS_MOCK=true 不允许在生产环境（NODE_ENV=production）使用');
}

if (!cfg.mock) {
  const missing = [];
  if (!cfg.baseUrl) missing.push('NSS_BASE_URL');
  if (!cfg.oemId) missing.push('NSS_OEM_ID');
  if (!cfg.sysMerchantId) missing.push('NSS_SYS_MERCHANT_ID');
  if (!cfg.merchantId) missing.push('NSS_MERCHANT_ID');
  if (!cfg.privateKeyPem) missing.push('NSS_PRIVATE_KEY_PATH(文件不存在或路径错误)');
  if (!cfg.publicKeyPem) missing.push('NSS_PUBLIC_KEY_PATH(文件不存在或路径错误)');
  if (!cfg.frontCallbackUrl) missing.push('NSS_FRONT_CALLBACK_URL');
  if (!cfg.notifyUrl) missing.push('NSS_NOTIFY_URL');
  if (missing.length) {
    throw new Error(`StarPay 配置缺失，无法启动: ${missing.join(', ')}（如处于本地开发请设置 NSS_MOCK=true）`);
  }
} else {
  // mock 模式下密钥对用于本地模拟收银台的签名/验签链路自测，没有则自动生成不可用——要求必须配置
  if (!cfg.privateKeyPem || !cfg.publicKeyPem) {
    throw new Error('NSS_MOCK=true 也需要配置 NSS_PRIVATE_KEY_PATH / NSS_PUBLIC_KEY_PATH（本地测试密钥对，见 README）');
  }
  if (!cfg.formSecret) {
    throw new Error('NSS_MOCK=true 也需要配置 PAY_FORM_SECRET');
  }
}

module.exports = cfg;
