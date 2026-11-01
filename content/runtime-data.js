/* Generated from content/*.json by tools/build_runtime_data.cjs. */
window.TimeHouseData = {
  "SITE_CONFIG": {
    "project": "小杨 × 天爱 · 相识时间记录站",
    "page_title": "小杨 × 天爱｜我们的时间小屋",
    "frontend_only": true,
    "password": "261009",
    "relationship_start_iso": "2026-10-09T08:15:00+08:00",
    "timezone_label": "北京时间",
    "views": [
      "p1_password",
      "p2_loading",
      "p3_home",
      "p4_fortune",
      "p4_capsule_placeholder",
      "p4_emergency_placeholder"
    ],
    "initial_view": "p1_password",
    "asset_base": "./assets/",
    "target_deployment": "https://<GitHub用户名>.github.io/<仓库名>/",
    "design_priority": "9:16 mobile; pixel-kawaii game UI, warm cream + gold + wood, main timer always dominant",
    "privacy_note": "Static front-end passcode is not security; all assets and password can be seen in public repository."
  },
  "P1_CONTENT": {
    "page": "p1_password",
    "headline": "小杨 × 天爱",
    "subtitle": "时间小屋入口",
    "small_english": "TIME RECORD",
    "input_label": "请输入六位暗号",
    "input_placeholder": "请输入六位暗号",
    "action_label": "开门啦！",
    "footer": "嘘，这是一个藏着时间的小地方。",
    "empty_error": "还没输入暗号呢，喵～",
    "short_error_template": "咦？暗号还差{remaining}位哦。",
    "wrong_by_attempt": [
      "喵？这串暗号好像不太对哦。",
      "团子歪了歪脑袋：再想想嘛～",
      "团子表示：不对不对，再试一次！"
    ],
    "right_reply": "暗号正确！团子来开门啦！",
    "cat_click_lines": [
      "喵～",
      "我是看门猫！",
      "不许偷偷溜进去哦～"
    ],
    "wrong_policy": "no lockout; do not clear user input automatically",
    "security_note": "only a visual gate, not authentication"
  },
  "P2_CONTENT": {
    "headline": "小杨 × 天爱 · 时间小屋",
    "duration_ms": 2400,
    "frame_ms": 300,
    "frames": [
      "./assets/p2/P2_CH_F01.png",
      "./assets/p2/P2_CH_F02.png",
      "./assets/p2/P2_CH_F03.png",
      "./assets/p2/P2_CH_F04.png"
    ],
    "frame_order_original_names": [
      "1000095819.png",
      "1000095820.png",
      "1000095822.png",
      "1000095821.png"
    ],
    "messages": [
      {
        "start_ms": 0,
        "text": "正在打开时间小屋……"
      },
      {
        "start_ms": 800,
        "text": "正在翻找我们的相识记录……"
      },
      {
        "start_ms": 1600,
        "text": "找到啦，准备进入！"
      }
    ],
    "next_view": "p3_home"
  },
  "P3_CONTENT": {
    "headline": "小杨 × 天爱",
    "subtitle": "我们的相识记录",
    "timer_heading": "我们已经认识了",
    "start_iso": "2026-10-09T08:15:00+08:00",
    "start_label": "开始记录：2026.10.09 08:15（北京时间）",
    "timer_parts": [
      "天",
      "小时",
      "分钟",
      "秒"
    ],
    "characters": {
      "left": "P3_CH_01",
      "center": "P3_CAT_01",
      "right": "P3_CH_02"
    },
    "dialogue": {
      "xiaoyang": [
        "诡秘想你了，比昨天多一点，比明天少一点。",
        "诡秘诡秘在一起的时间又多加了一秒。",
        "诡秘如果想我了可以来给我发个消息！",
        "诡秘喵喵喵"
      ],
      "tuanzi": [
        "喵喵喵",
        "喵喵?喵喵喵！",
        "喵呜～"
      ]
    },
    "buttons": [
      {
        "label": "今日运势",
        "target": "p4_fortune",
        "symbol": "star"
      },
      {
        "label": "时间胶囊",
        "target": "p4_capsule_placeholder",
        "symbol": "hourglass"
      },
      {
        "label": "应急按钮",
        "target": "p4_emergency_placeholder",
        "symbol": "heart"
      }
    ],
    "interaction_note": "Only Xiaoyang and Tuanzi require tap dialogue; do not invent dialogue for Tianai; illustration speech-heart decorations are baked in, real words go in new DOM bubbles."
  },
  "P4_CONTENT": {
    "fortune": {
      "headline": "团子今日运势",
      "start_button": "抽一签",
      "redraw_button": "再抽一签",
      "back_button": "返回主页",
      "empty_state": "今日运势，交给团子决定！",
      "fun_disclaimer": "娱乐抽签，仅供开心。",
      "fortune_file": "./content/P4_FORTUNE_CONTENT.json",
      "chance": "first draw uniform among 10, next among remaining 9 to avoid immediate repeat"
    },
    "placeholders": {
      "time_capsule": {
        "heading": "时间胶囊",
        "body": "时间胶囊正在施工中，挖到回忆就通知你！"
      },
      "emergency": {
        "heading": "应急按钮",
        "body": "应急通道正在抢修中，小杨施工队已经到达现场！"
      }
    },
    "back_button": "返回主页"
  },
  "P4_FORTUNE_CONTENT": {
    "version": "1.0",
    "page": "P4-FORTUNE",
    "title": "团子今日运势",
    "description": "纯娱乐随机签文，10条等概率，不依赖网络请求或本地服务。",
    "draw_mode": "random_with_retries",
    "allow_redraw": true,
    "avoid_immediate_repeat": true,
    "fortune_items": [
      {
        "id": "P4_FT_01",
        "title": "跨山延迟签",
        "grade": "趣味签",
        "description": "瑞士山太多，今日运势需要翻山越岭才能送达。",
        "good": "耐心等待",
        "avoid": "催促命运",
        "tag": "瑞士限定"
      },
      {
        "id": "P4_FT_02",
        "title": "霉运精准投放",
        "grade": "小凶签",
        "description": "今天运气差点意思，疑似被霉运精准投放。建议立即去找诡秘聊两句，进行一次赛博驱邪。",
        "good": "找诡秘驱邪",
        "avoid": "独自硬扛",
        "tag": "赛博玄学"
      },
      {
        "id": "P4_FT_03",
        "title": "世界线修复",
        "grade": "神秘签",
        "description": "平行宇宙的你已经找诡秘唠了半天，只有这个宇宙的你还在犹豫。请尽快修复世界线。",
        "good": "主动联系",
        "avoid": "持续犹豫",
        "tag": "平行宇宙"
      },
      {
        "id": "P4_FT_04",
        "title": "好运待签收",
        "grade": "中吉签",
        "description": "你的好运正在派送途中，但快递员说必须由诡秘本人签收。什么？还没联系？那还不快去！！",
        "good": "联系诡秘",
        "avoid": "拒收好运",
        "tag": "好运快递"
      },
      {
        "id": "P4_FT_05",
        "title": "大吉大利",
        "grade": "上上签",
        "description": "今日运势大吉大利，想做什么大胆去吧！",
        "good": "大胆尝试",
        "avoid": "畏首畏尾",
        "tag": "今日好兆头"
      },
      {
        "id": "P4_FT_06",
        "title": "高端局抉择",
        "grade": "趣味签",
        "description": "今天你将面临一场高端局：是继续发呆，还是找诡秘聊点有的没的？团子已经替你选了第二项。",
        "good": "找诡秘唠嗑",
        "avoid": "继续发呆",
        "tag": "团子裁决"
      },
      {
        "id": "P4_FT_07",
        "title": "诡秘旺你",
        "grade": "上上签",
        "description": "经系统检测，你今天命里带诡秘。此人旺你，旺得很不讲道理。建议立即联系，过期不补。",
        "good": "立即联系",
        "avoid": "装高冷",
        "tag": "专属旺运"
      },
      {
        "id": "P4_FT_08",
        "title": "赛博锦鲤附体",
        "grade": "大吉签",
        "description": "恭喜你随机成为今日互联网幸运用户！转发给诡秘即可获得精神上的好运加成，不转也没事，猫猫批准了。",
        "good": "分享开心",
        "avoid": "过度内耗",
        "tag": "锦鲤认证"
      },
      {
        "id": "P4_FT_09",
        "title": "霉运退退退",
        "grade": "转运签",
        "description": "今日水逆指数99%，但问题不大。诡秘具有未知的反向水逆体质，靠近即可使霉运当场下班。",
        "good": "召唤诡秘",
        "avoid": "硬刚水逆",
        "tag": "水逆克星"
      },
      {
        "id": "P4_FT_10",
        "title": "文曲星下凡",
        "grade": "学业大吉",
        "description": "今日运势文曲星下凡，考试必过，适合学习",
        "good": "认真学习",
        "avoid": "临时抱佛脚",
        "tag": "学业BUFF"
      }
    ]
  }
};
