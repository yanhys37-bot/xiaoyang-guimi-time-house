# 建议技术架构

推荐纯 HTML + CSS + 原生 JavaScript；如果为了管理 view 拆 JS 模块，注意 file:// 下 CORS 行为，正式 Pages 则正常。为方便第一版双击 index.html 预览，可以在打包时将静态 JSON 数据内联至脚本或在 `file://` 环境回退内置数据；若使用 `fetch('./content/*.json')`，本地建议通过 `python -m http.server` 预览，GitHub Pages 正常支持静态 JSON。无论如何，绝不能要求用户在线上安装/运行服务器。

建议目录：

```
index.html
style.css
app.js
assets/{p1,p2,p3,p4}/...
content/*.json
references/* (仅开发参考，非运行时)
docs/*
.nojekyll
```

图片预加载可从 P1 开始低优先级加载 P2、P3：不应导致密码门迟迟打不开。P3时间与本地时区无关，`Date.now()` 才是时钟源。推荐只运行一个计时 interval，或者 rAF+秒边界定时；从P3离开时可暂停视图更新但回到时立即恢复正确绝对时间。P4 返回P3无需重新认证。

P1图片统一设计舞台参照941×1672，建议容器 `aspect-ratio:941/1672` 的相对定位层，在其上放三层图。键盘聚焦将输入DOM换紧凑模式，不能让图片舞台与图层比例错位。P3背景无需和人物做原图坐标精确对齐，只要按留白和视口灵活安排。P4透明抽签机机器摇动的是整个元素，不能从图里硬分离摇杆。

尽量避免无谓库、路由与重型动画插件。`role`, `aria-label`, `aria-live=polite` 为输入/状态/计时/抽签反馈提供辅助语义；计时每秒更新不建议每秒高频播报给屏幕阅读器，避免噪音。
