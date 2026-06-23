// 加载全局所需的模块
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index/index', {
    pageTitle: 'JSKI | 日本滑雪学校 — 中文滑雪教学·白马·汤泽',
    pageDesc: 'JSKI 中文国际滑雪学校，提供日本白马、汤泽等地区的中文滑雪教学服务。单双板入门到进阶，SAJ/JSBA等级考试对策。'
  })
});

router.get('/contact', (req, res) => {
  res.render('index/contact', {
    pageTitle: '联系我们 | JSKI 中文国际滑雪学校',
    pageDesc: '联系 JSKI 中文国际滑雪学校，预约课程、咨询滑雪教学详情。微信/ LINE / WhatsApp 多通道客服。'
  });
});

router.get('/faq', (req, res) => {
  res.render('index/faq', {
    pageTitle: '常见问题 | JSKI 中文国际滑雪学校',
    pageDesc: 'JSKI 中文国际滑雪学校常见问题解答：课程费用、保险说明、取消政策、教练指定、上课地点等。'
  });
});

router.get('/organization', (req, res) => {
  res.render('index/organization', { noindex: true });
});

router.get('/terms', (req, res) => {
  res.render('index/terms', {
    pageTitle: '用户条款 | JSKI 中文国际滑雪学校',
    pageDesc: 'JSKI 中文国际滑雪学校用户条款与服务协议。'
  });
});

router.get('/privacy', (req, res) => {
  res.render('index/privacy', {
    pageTitle: '隐私政策 | JSKI 中文国际滑雪学校',
    pageDesc: 'JSKI 中文国际滑雪学校隐私政策，关于个人信息保护的说明。'
  });
});

router.get('/schedule', (req, res) => {
  res.render('index/schedule', {
    pageTitle: '课程介绍 | JSKI 中文国际滑雪学校',
    pageDesc: 'JSKI 中文国际滑雪学校课程介绍：单板/双板入门到进阶，私教课、团课，白马·汤泽·轻井泽等多雪场可选。'
  });
});

router.get('/participation-notice', (req, res) => {
  res.render('index/participation-notice', { noindex: true });
});

router.get('/participation-explanation', (req, res) => {
  res.render('index/participation-explanation', { noindex: true });
});

router.get('/school', (req, res) => {
  res.render('school/school', {
    pageTitle: '学校介绍 | JSKI 中文国际滑雪学校',
    pageDesc: 'JSKI 中文国际滑雪学校介绍：超过60名持证教练，SAJ/JSBA体系教学，白马·汤泽·轻井泽等官方教学点。'
  });
});

router.get('/instructor', (req, res) => {
  res.render('school/instructor', { noindex: true });
});

module.exports = router;
