// 商品目录 —— 支付模块的唯一商品来源
// 修改商品（新增/改价/上下架）只需编辑本文件并重启服务。
// 注意：priceJpy 必须是整数日元（JPY 无小数），加载时会校验，非法配置将导致进程拒绝启动。

const products = [
  {
    id: 'lesson-deposit',
    name: '课程预约定金',
    description: '预约滑雪课程的定金，余款上课前另行支付。',
    priceJpy: 3000
  },
  {
    id: 'trial-lesson',
    name: '单次体验课',
    description: '双板或单板体验课一次（2小时，含中文教学）。',
    priceJpy: 15000
  },
  // ⚠️ QA 联调专用：1 日元测试商品，仅用于 NetStars 测试环境验证真实支付闭环。
  // 生产切换前必须删除本条目。
  {
    id: 'qa-test-1yen',
    name: '【QA测试】支付联调验证',
    description: 'NetStars QA 环境联调专用（1日元），非真实商品，不会发货。',
    priceJpy: 1
  }
];

// ---- 加载时校验（fail-fast）----
function validate(list) {
  const seen = new Set();
  for (const p of list) {
    if (!p.id || typeof p.id !== 'string') throw new Error('商品缺少 id');
    if (seen.has(p.id)) throw new Error(`商品 id 重复: ${p.id}`);
    seen.add(p.id);
    if (!p.name) throw new Error(`商品 ${p.id} 缺少 name`);
    if (!Number.isInteger(p.priceJpy) || p.priceJpy <= 0) {
      throw new Error(`商品 ${p.id} 的 priceJpy 必须是正整数日元，当前值: ${p.priceJpy}`);
    }
  }
}
validate(products);

module.exports = {
  getProducts() {
    return products;
  },
  getProductById(id) {
    return products.find(p => p.id === id) || null;
  }
};
