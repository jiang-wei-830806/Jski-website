// 加载全局所需的模块
const path = require('path');
const express = require('express');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
// colors removed - see index.js for chalk usage
const exphbs = require('express-handlebars');

// 加载中间件
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

// 加载route文件
const index = require('./routes/index');

// StarPay 支付功能开关：未完成测试前默认关闭（不加载路由/配置，/payment/* 返回 404）
// 启用方式：.env 设置 PAYMENT_ENABLED=true 并配齐 NSS_* 参数
const paymentEnabled = process.env.PAYMENT_ENABLED === 'true';

// 启用Express
const app = express();

// 站点位于 nginx 反向代理之后（同一台机器一跳）：
// 信任第一跳，使 req.ip 取 X-Forwarded-For 中的真实访客 IP，
// 否则所有访客在限流器里共用 127.0.0.1 一个桶，全站很快集体 429。
app.set('trust proxy', 1);

// 全局模板变量
app.locals.siteUrl = 'https://jcosa.net';

// 为每个请求设置 canonicalPath
app.use((req, res, next) => {
  res.locals.canonicalPath = req.path;
  next();
});

// Gzip 压缩
app.use(compression());

// 调用Helmet来防止http header污染
// 开发环境禁用 HSTS，避免 Safari 在本地 HTTP 访问时强制升级 HTTPS 导致资源被 blocked
const isDev = process.env.NODE_ENV === 'development';
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  strictTransportSecurity: isDev ? false : undefined,
  contentSecurityPolicy: {
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: isDev
        ? ["'self'", "'unsafe-inline'", "https:", "http:"]
        : ["'self'", "'unsafe-inline'", "https:"],
      scriptSrc: isDev
        ? ["'self'", "'unsafe-inline'", "https:", "http:"]
        : ["'self'", "'unsafe-inline'", "https:"],
      imgSrc: isDev
        ? ["'self'", "data:", "https:", "http:"]
        : ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https:", "data:"],
      connectSrc: ["'self'"]
    }
  }
}));

// 启用Rate Limiter（只限动态页面，静态资源带扩展名不计数——
// 一次页面加载会拉取几十个 css/js/图片，计入会把正常浏览误判为超限）
// 注意：NSS 异步通知（/payment/notify）来自 NSS 服务器且会重试，必须豁免全局限流，否则可能被误杀
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/payment/notify' || /\.[a-z0-9]+$/i.test(req.path),
  message: {
    error: '来自此IP的请求过多，请1小时后再尝试访问'
  }
});
app.use(limiter);

// NSS 通知专用 body parser：放宽到 100kb，并用 verify 捕获原始字节供验签。
// 必须放在全局 10kb parser 之前；body-parser 有 _body 保护，不会重复解析。
if (paymentEnabled) {
  app.use('/payment/notify', express.json({
    limit: '100kb',
    verify: (req, res, buf) => { req.rawBody = buf.toString('utf8'); }
  }));
}

// Body Parser中间件
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// 启用logger中间件
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 健康检查接口
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 启用 view routes
app.use('/', index);
if (paymentEnabled) {
  app.use('/', require('./routes/payment'));
}

// WebP 自动降级/升级中间件：浏览器支持 webp 时优先返回 .webp 版本
const fs = require('fs');
app.use((req, res, next) => {
  const accept = req.headers.accept || '';
  if (!accept.includes('image/webp')) return next();

  const ext = path.extname(req.path).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return next();

  const webpPath = path.join(__dirname, 'public', req.path.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
  if (fs.existsSync(webpPath)) {
    req.url = req.url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    res.set('Content-Type', 'image/webp');
  }
  next();
});

// 设定静态文件夹（带浏览器缓存头）
const staticMaxAge = process.env.NODE_ENV === 'production' ? '30d' : 0;
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: staticMaxAge,
  etag: false,
  lastModified: false
}));

// 设定view engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    // 简单的相等判断（结果页按 state 渲染不同区块）
    eq: (a, b) => a === b
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// 启用errorHandler
app.use(errorHandler);

module.exports = app;
