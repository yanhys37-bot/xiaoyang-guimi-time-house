# 小杨 × 诡秘｜我们的时间小屋

这是可直接打开的静态网站，已部署到 GitHub Pages：

**https://yanhys37-bot.github.io/xiaoyang-guimi-time-house/**

## 打开网站

双击根目录的 `index.html`。暗号为 `261009`；进入后依次是连接动画、相识计时首页。首页的三个入口分别通往今日运势、时间胶囊与应急按钮。后两页按任务要求显示“施工中”，均可返回首页。

如需用本地静态服务器预览，在本目录运行 `python -m http.server 8000`，然后打开 `http://127.0.0.1:8000/`。这只用于本地预览，网站上线无需运行服务器。

## 文件

- `index.html`：网站入口和六个视图。
- `style.css`：响应式布局与像素风界面。
- `app.js`、`logic.js`：页面交互、计时、抽签与纯逻辑函数。
- `content/*.json`：原始文案与配置，保持原文；`content/runtime-data.js` 是供浏览器直接读取的同内容静态副本。
- `assets/`：正式使用的图像素材；`references/` 只供设计参考，未作为页面背景。
- `.nojekyll`：供 GitHub Pages 使用。
- `preview/`：本地浏览器生成的手机竖屏截图。
- `tests/`、`tools/`：本地验证脚本。若修改了源 JSON，运行 `node tools/build_runtime_data.cjs` 更新浏览器数据副本。

## 本地验收

在桌面 Edge 的手机视口模拟中，已检查 360×640、375×667、390×844、412×915 和桌面 1280×800。P1→P2→P3、三个 P4 页面与返回、错误暗号提示、计时和重复抽签均通过；没有浏览器报错或水平溢出。360×640 首页可向下滚动。P1 门底图层原有白缝已用 CSS 遮盖，截图中未见明显白缝。还没有在真实 iOS Safari 或安卓 Chrome 上复核。

可重新验证：

```text
node --test tests/logic.test.cjs
python tools/verify_assets.py
node tests/browser-smoke.cjs
```

浏览器脚本默认需要本地 `http://127.0.0.1:4174/` 静态服务；也可通过 `TIME_HOUSE_URL` 指向其他地址。已另行用 `file://` 方式跑过完整浏览器流程，确认双击打开可用。

## GitHub Pages 更新方式

仓库为 `yanhys37-bot/xiaoyang-guimi-time-house`。更新后推送到 `main`，GitHub Pages 会从仓库根目录自动构建。公开地址不变。上线版本已在桌面 Edge 的手机视口模拟中通过完整流程；真实手机仍建议实际访问检查键盘与交互。详细设置见 `docs/DEPLOY_GITHUB_PAGES.md`。

暗号是前端互动效果，不提供隐私保护。
