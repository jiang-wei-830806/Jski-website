// 加载全局所需的模块
const dotenv = require('dotenv');
const moment = require('moment-timezone');
const chalk = require('chalk');

// 加载env参数
dotenv.config({ path: './config/config.env' });

// 处理uncaught promise exception
process.on('uncaughtException', reason => {
  console.log('|---------------------------------------------------');
  console.log(chalk.red.bold('| 发生uncaughtException错误'));
  console.log(chalk.red.bold(`| 错误:${reason.name}, 理由为: ${reason.message}`));
  if (process.env.NODE_ENV === 'development') {
    console.log('| ', reason);
  }
  console.log('|---------------------------------------------------');
  console.log(chalk.green.bold('| 正在结束进程...'));
  console.log(chalk.green.bold('| 后台服务器已正常关闭'));
  console.log('|---------------------------------------------------');
  process.exit(1);
});

// 加载Express
const app = require('./server');

// 定义端口
const PORT = process.env.PORT || 5000;

console.log('|---------------------------------------------------');
console.log(chalk.green.bold('| 正在启动后台服务器...'));

// Express监听端口服务（0.0.0.0 允许局域网内其他设备访问）
const server = app.listen(PORT, '0.0.0.0', () => {
  const date = moment()
    .tz(`${process.env.LOG_TIME_ZONE}`)
    .locale(`${process.env.LOG_LANGUAGE}`)
    .format(`${process.env.LOG_FORMAT}`);
  console.log(chalk.green.bold('| 后台服务器已启动'));
  console.log('|---------------------------------------------------');
  console.log(chalk.yellow.bold(`| 应用名  : ${process.env.APP_NAME}`));
  console.log(chalk.yellow.bold(`| 部署环境: ${process.env.NODE_ENV}`));
  console.log(chalk.yellow.bold(`| 部署端口: ${process.env.PORT}`));
  console.log(chalk.yellow.bold(`| 部署日期: ${date}`));
  const paymentEnabled = process.env.PAYMENT_ENABLED === 'true';
  console.log(chalk.yellow.bold(`| 支付功能: ${paymentEnabled ? (process.env.NSS_MOCK === 'true' ? 'MOCK（模拟，禁止生产）' : 'StarPay 真实接口') : '未启用'}`));
  console.log('|---------------------------------------------------');

  // 支付对账兜底任务（超时订单主动查询 / 未支付订单清扫）
  if (paymentEnabled) {
    require('./jobs/reconciler').start();
  }
});

// 处理unhandled promise rejection
process.on('unhandledRejection', (reason, p) => {
  console.log('|---------------------------------------------------');
  console.log(chalk.red.bold('| 发生unhandledRejection错误'));
  console.log(chalk.red.bold(`| 错误:${reason.name}, 理由为: ${reason.message}`));
  if (process.env.NODE_ENV === 'development') {
    console.log('| ', reason);
    console.log('| ', p);
  }
  console.log('|---------------------------------------------------');
  console.log(chalk.green.bold('| 正在关闭后台服务器...'));
  server.close(() => {
    process.exit(1);
  });
  console.log(chalk.green.bold('| 后台服务器已正常关闭'));
  console.log('|---------------------------------------------------');
});
