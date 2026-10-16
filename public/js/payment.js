// 支付结果页轮询脚本
// 每 2s 查询本地订单状态（以服务端落库为准，不信任前端回调参数），上限 60 次（2分钟）。
// 终止状态：SUCCESS / FAILURE / CLOSED / REFUNDED。

(function () {
  var root = document.getElementById('pay-result');
  if (!root) return;
  var token = root.getAttribute('data-token');
  var attempts = 0;
  var MAX_ATTEMPTS = 60;

  function showDone(title, message) {
    root.querySelector('.js-pending').style.display = 'none';
    var done = root.querySelector('.js-done');
    done.style.display = '';
    done.querySelector('.js-title').textContent = title;
    done.querySelector('.js-message').textContent = message;
  }

  function poll() {
    attempts += 1;
    fetch('/payment/status/' + encodeURIComponent(token), { cache: 'no-store' })
      .then(function (r) {
        if (r.status === 404) { showDone('查询失败', '订单不存在或链接已失效。'); return null; }
        return r.json();
      })
      .then(function (data) {
        if (!data) return;
        switch (data.status) {
          case 'SUCCESS':
            showDone('支付成功', '感谢您的购买！课程相关事宜请联系客服安排。');
            return;
          case 'FAILURE':
            showDone('支付失败', '本次支付未完成扣款，请返回商品页重新尝试。');
            return;
          case 'CLOSED':
            showDone('订单已关闭', '订单超时未支付或已取消，如需购买请重新下单。');
            return;
          case 'REFUNDED':
            showDone('已退款', '该订单已退款。');
            return;
        }
        if (attempts >= MAX_ATTEMPTS) {
          showDone('结果确认中', '支付结果暂未确认，请稍后通过客服查询，勿重复支付。');
          return;
        }
        setTimeout(poll, 2000);
      })
      .catch(function () {
        if (attempts >= MAX_ATTEMPTS) {
          showDone('结果确认中', '网络异常，请稍后通过客服查询，勿重复支付。');
        } else {
          setTimeout(poll, 2000);
        }
      });
  }

  setTimeout(poll, 500);
})();
