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

// 启用Express
const app = express();

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

// 启用Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: '来自此IP的请求过多，请1小时后再尝试访问'
  }
});

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
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// 启用errorHandler
app.use(errorHandler);

module.exports = app;
