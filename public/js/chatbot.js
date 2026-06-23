(function() {
  'use strict';

  // FAQ Data
  var FAQS = [
    {
      id: 'booking',
      label: '如何约课？',
      answer: '<p>您可以通过下方链接进入预约表单，填写课程信息并提交：</p><p><a href="http://jski-outdoors.jp.mikecrm.com/A0OwB3V" target="_blank">👉 点击这里预约课程</a></p><p>提交后客服会尽快与您确认行程安排。</p>'
    },
    {
      id: 'fees',
      label: '是否有其他隐藏费用？',
      answer: '<p>JSKI 的课程报价中<strong>不含任何隐藏费用</strong>。</p><p>教学费用包含：教学全部费用、基础旅行责任保险（需要提供姓名信息），以及学校责任事故赔偿保险。</p><p>教学费用<strong>不包含</strong>：学员雪票、装备租赁、学员交通住宿、餐饮、海外旅游保险及滑雪/运动相关的意外险等教学以外的费用。</p>'
    },
    {
      id: 'insurance',
      label: '是否有加入学校责任保险？',
      answer: '<p>JSKI 中文国际滑雪学校加入了正规的<strong>学校责任保险</strong>，由<strong>東京海上日動</strong>保险公司承保。</p><p>保险包含因学校/教练责任所导致的摔伤、扭伤、骨折，其所涉及的在日医疗费用。具体索保范围需根据保险公司定责为准。</p><p>保额参考：</p><ul><li>死亡赔偿：300 万日元</li><li>住院赔偿：3,000 日元/天</li><li>看病赔偿：1,000 日元/天</li><li>个人责任赔偿：最大 3,000 万日元</li><li>学校责任事故赔偿：最大 5 亿日元</li></ul><p style="margin-top:8px;">参加课程的学员仍需根据自身需求另外自行购买滑雪保险，请在理解并同意上述 JSKI 保险内容、并自行加入滑雪保险的前提下参加课程。</p>'
    },
    {
      id: 'cancel',
      label: '我是否可以取消预约？',
      answer: '<p>可以取消，但会根据取消时间产生不同比例的<strong>取消费用</strong>。</p><p>预定时需支付全款。因个人原因（因伤病取消属于个人原因，包括新冠阳性等）取消或更改课程，违约金如下：</p><ul><li>课程开始 <strong>21 天前</strong>：免费取消</li><li><strong>20 ~ 7 天前</strong>：收取 10%</li><li><strong>6 ~ 3 天前</strong>：收取 50%</li><li><strong>3 ~ 2 天前</strong>：收取 80%</li><li><strong>1 天前</strong>：收取 100%</li></ul>'
    },
    {
      id: 'instructor',
      label: '我能否指定教练？',
      answer: '<p>JSKI 中文国际滑雪学校拥有超过 <strong>60 名持证教练</strong>团队。团队成员各有所长，教学风格多样。</p><p>在课程安排允许的前提下，我们可以根据您的需求协调教学安排（如同性教学、指定女教练进行儿童教学等）。</p><p>如有特殊需求，欢迎联系客服协商，我们将尽力协调以满足您的合理需求。</p>'
    },
    {
      id: 'location',
      label: '可否选择上课地点？',
      type: 'location'
    },
    {
      id: 'human',
      label: '💬 转人工客服',
      type: 'human'
    }
  ];

  // Resort Data
  var RESORTS = {
    hakuba: {
      name: '白马地区',
      list: [
        {
          name: '栂池高原滑雪场',
          desc: '<ul><li>超宽新手道，雪道丰富，滑行距离长</li><li>精心规划树林粉雪区</li><li>刻滑 & 公园进阶练习</li><li>设施（餐厅、小吃、足汤等）丰富</li></ul>',
          image: 'img/teams/team-12.jpg'
        },
        {
          name: 'Cortina 滑雪场',
          desc: '<ul><li>粉雪胜地</li><li>滑进滑出温泉酒店</li><li>儿童乐园</li></ul>',
          image: 'img/teams/IMG_7502.jpeg'
        },
        {
          name: '白马五龙滑雪场',
          desc: '<ul><li>日本滑雪场中最有名的夜场之一</li><li>山顶高海拔，山下造雪机，雪量有保证</li><li>Burton 租赁站</li><li>室内儿童娱乐设施</li></ul>',
          image: 'img/teams/IMG_7503.jpeg'
        }
      ]
    },
    yuzawa: {
      name: '汤泽地区',
      list: [
        {
          name: '舞子高原滑雪场',
          desc: '<ul><li>高速公路直通，新干线可达，交通超方便</li><li>滑进滑出温泉酒店，单日雪票含夜场</li><li>FWT 世界野雪巡回赛赛场</li><li>山顶咖啡厅、酒店内墨画墙等网红打卡点</li><li>最受日本年轻人喜爱的雪场之一</li></ul>',
          image: 'img/teams/IMG_7505.jpeg'
        },
        {
          name: '汤泽中里滑雪场',
          desc: '<ul><li>新潟汤泽地区热门雪场之一</li><li>适合家庭及初学者的宽敞雪道</li><li>交通便利，配套设施完善</li></ul>'
        },
        {
          name: '神乐滑雪场',
          desc: '<ul><li>新潟地区大型滑雪场</li><li>雪道多样，适合各级别雪友</li><li>与苗场滑雪场有缆车联通</li></ul>'
        },
        {
          name: '神立滑雪场',
          desc: '<ul><li>周末夜场营业到凌晨</li><li>雪场内温泉</li><li>女生特价票</li><li>交通便利，年轻人多</li></ul>',
          image: 'img/teams/IMG_7511.jpeg'
        },
        {
          name: '苗场滑雪场',
          desc: '<ul><li> Prince 酒店集团旗下大型雪场</li><li>设施豪华，亲子友好</li><li>与神乐滑雪场联通，可一日畅滑两山</li></ul>'
        }
      ]
    },
    others: {
      name: '其他地区',
      list: [
        {
          name: '轻井泽王子滑雪场',
          desc: '<ul><li>紧邻奥特莱斯，购物滑雪两不误</li><li>日本观光胜地，高档酒店众多</li><li>人工造雪为主，11 月开始即可入场</li></ul>',
          image: 'img/teams/IMG_7517.jpeg'
        },
        {
          name: '乐天新井滑雪场',
          desc: '<ul><li>滑进滑出五星温泉酒店，轻奢滑雪好去处</li><li>粉雪天堂，大山式雪道设计，广域纵滑</li><li>室内攀岩、蹦床等娱乐设施丰富</li><li>灯光秀、儿童乐园、网红打卡处</li></ul>',
          image: 'img/teams/IMG_7515.jpeg'
        },
        {
          name: '志贺高原各滑雪场',
          desc: '<ul><li>日本面积最大、海拔最高的滑雪区域之一</li><li>由 18 个滑雪场组成，雪票通用</li><li>1998 年长野冬奥会赛场</li><li>适合中高级雪友探索连峰纵滑</li></ul>'
        }
      ]
    }
  };

  // Human contact channels
  var CHANNELS = [
    { id: 'wechat', label: '微信', qr: 'img/contact/wechat-qr.png', text: '请使用微信扫码添加客服' },
    { id: 'line', label: 'LINE', qr: 'img/contact/line-qr.png', text: '请使用 LINE 扫码添加客服' },
    { id: 'whatsapp', label: 'WhatsApp', qr: 'img/contact/whatsapp-qr.png', text: '请使用 WhatsApp 扫码添加客服' }
  ];

  // Build DOM
  function init() {
    if (document.getElementById('jski-chatbot')) return;

    var container = document.createElement('div');
    container.id = 'jski-chatbot';

    var toggleBtn = document.createElement('button');
    toggleBtn.className = 'chatbot-toggle';
    toggleBtn.setAttribute('aria-label', '打开客服助手');
    toggleBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';

    var windowEl = document.createElement('div');
    windowEl.className = 'chatbot-window';
    windowEl.innerHTML =
      '<div class="chatbot-header">' +
        '<div class="chatbot-header-info">' +
          '<img src="img/logo/JSKI_Black.png" alt="JSKI">' +
          '<span>JSKI 小助手</span>' +
        '</div>' +
        '<button class="chatbot-close" aria-label="关闭">&times;</button>' +
      '</div>' +
      '<div class="chatbot-body" id="chatbot-body"></div>';

    container.appendChild(windowEl);
    container.appendChild(toggleBtn);
    document.body.appendChild(container);

    // Event listeners
    toggleBtn.addEventListener('click', function() {
      windowEl.classList.toggle('open');
      if (windowEl.classList.contains('open')) {
        var body = document.getElementById('chatbot-body');
        if (body.children.length === 0) {
          showWelcome(body);
        }
        setTimeout(function() {
          body.scrollTop = body.scrollHeight;
        }, 50);
      }
    });

    windowEl.querySelector('.chatbot-close').addEventListener('click', function() {
      windowEl.classList.remove('open');
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!container.contains(e.target)) {
        windowEl.classList.remove('open');
      }
    });
  }

  function showWelcome(body) {
    addBotMessage(body,
      '<p>您好！我是 <strong>JSKI 小助手</strong> 🎿</p>' +
      '<p>请问有什么可以帮您的？您可以点击下方按钮快速提问：</p>',
      FAQS.map(function(f) {
        return { label: f.label, action: function() { handleFaq(body, f); } };
      })
    );
  }

  function addBotMessage(body, html, buttons) {
    var msg = document.createElement('div');
    msg.className = 'chatbot-message bot';

    var avatar = document.createElement('div');
    avatar.className = 'chatbot-avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';

    var bubble = document.createElement('div');
    bubble.className = 'chatbot-bubble';
    bubble.innerHTML = html;

    if (buttons && buttons.length) {
      var btnWrap = document.createElement('div');
      btnWrap.className = 'chatbot-buttons';
      buttons.forEach(function(btn) {
        var b = document.createElement('button');
        b.className = 'chatbot-btn' + (btn.small ? ' small' : '') + (btn.back ? ' back' : '');
        b.textContent = btn.label;
        b.addEventListener('click', function() {
          btn.action();
        });
        btnWrap.appendChild(b);
      });
      bubble.appendChild(btnWrap);
    }

    msg.appendChild(avatar);
    msg.appendChild(bubble);
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  function addUserMessage(body, text) {
    var msg = document.createElement('div');
    msg.className = 'chatbot-message user';

    var bubble = document.createElement('div');
    bubble.className = 'chatbot-bubble';
    bubble.textContent = text;

    msg.appendChild(bubble);
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  function handleFaq(body, faq) {
    addUserMessage(body, faq.label);

    setTimeout(function() {
      if (faq.type === 'location') {
        showLocationMenu(body);
      } else if (faq.type === 'human') {
        showHumanMenu(body);
      } else {
        addBotMessage(body, faq.answer, [
          { label: '← 返回主菜单', back: true, action: function() { showWelcome(body); } },
          { label: '💬 转人工', small: true, action: function() { showHumanMenu(body); } }
        ]);
      }
    }, 300);
  }

  function showLocationMenu(body) {
    addBotMessage(body,
      '<p>学员可根据自身行程，灵活选择 JSKI 任意官方教学点上课。</p><p>作为正规持牌滑雪学校，JSKI 严格遵守行业规范，坚决不在未获授权的雪场开展任何形式的"黑教练"活动。如有特殊需求需要在官方教学点以外的雪场上课，JSKI 将先行与目标雪场及其中文滑雪学校沟通，在获得入场教学许可后安排课程。</p><p>JSKI 在以下地区和雪场提供教学服务，请点击查看详情：</p>',
      [
        { label: '🏔️ 白马地区', action: function() { showRegion(body, 'hakuba'); } },
        { label: '❄️ 汤泽地区', action: function() { showRegion(body, 'yuzawa'); } },
        { label: '🗻 其他地区', action: function() { showRegion(body, 'others'); } },
        { label: '← 返回', back: true, action: function() { showWelcome(body); } }
      ]
    );
  }

  function showRegion(body, regionKey) {
    var region = RESORTS[regionKey];
    addUserMessage(body, region.name);

    setTimeout(function() {
      addBotMessage(body,
        '<p><strong>' + region.name + '</strong> 可选择以下雪场：</p>',
        region.list.map(function(r) {
          return {
            label: r.name,
            action: function() { showResortDetail(body, r); }
          };
        }).concat([
          { label: '← 返回地区选择', back: true, action: function() { showLocationMenu(body); } }
        ])
      );
    }, 200);
  }

  function showResortDetail(body, resort) {
    addUserMessage(body, resort.name);

    setTimeout(function() {
      var html = '<p><strong>' + resort.name + '</strong></p>';
      if (resort.image) {
        html += '<div class="chatbot-resort-preview"><img src="' + resort.image + '" alt="' + resort.name + '"></div>';
      }
      html += '<div class="chatbot-resort-preview">' + resort.desc + '</div>';
      html += '<p style="margin-top:10px;"><a href="http://jski-outdoors.jp.mikecrm.com/A0OwB3V" target="_blank">👉 预约此雪场课程</a></p>';

      addBotMessage(body, html, [
        { label: '← 返回雪场列表', back: true, action: function() { showRegion(body, findRegionKey(resort.name)); } },
        { label: '🏠 主菜单', small: true, action: function() { showWelcome(body); } }
      ]);
    }, 200);
  }

  function findRegionKey(resortName) {
    for (var key in RESORTS) {
      for (var i = 0; i < RESORTS[key].list.length; i++) {
        if (RESORTS[key].list[i].name === resortName) return key;
      }
    }
    return 'hakuba';
  }

  function showHumanMenu(body) {
    addBotMessage(body,
      '<p>请选择您想使用的联系方式，我会为您发送对应的客服二维码：</p>',
      CHANNELS.map(function(ch) {
        return {
          label: ch.label,
          action: function() { showQr(body, ch); }
        };
      }).concat([
        { label: '← 返回', back: true, action: function() { showWelcome(body); } }
      ])
    );
  }

  function showQr(body, channel) {
    addUserMessage(body, '使用 ' + channel.label + ' 咨询');

    setTimeout(function() {
      var html =
        '<p>' + channel.text + '</p>' +
        '<div class="chatbot-qr">' +
          '<img src="' + channel.qr + '" alt="' + channel.label + ' 二维码">' +
          '<p>扫码后可直接与客服沟通课程与行程</p>' +
        '</div>';

      addBotMessage(body, html, [
        { label: '← 更换联系方式', back: true, action: function() { showHumanMenu(body); } },
        { label: '🏠 主菜单', small: true, action: function() { showWelcome(body); } }
      ]);
    }, 200);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
