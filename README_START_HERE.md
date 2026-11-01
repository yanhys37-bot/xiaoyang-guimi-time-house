# 小杨 × 诡秘｜Codex GitHub Pages 项目包 V1

**这是已确定素材 + 可执行开发说明包，不是已经写好的网页成品。** 目标是让 Codex 在此目录继续开发出可在 GitHub Pages 公开访问的静态站点。

## 立刻开始

1. 在本地解压此 ZIP 到一个新的 GitHub 仓库根目录。
2. 用 VS Code / Codex 打开解压后的目录（根目录就是包含本 README、`CODEX_MASTER_TASK.md`、`assets/` 的文件夹）。
3. 将 `COPY_TO_CODEX.txt` 中的指令粘贴给 Codex；它会读取 `CODEX_MASTER_TASK.md`、逐页说明及 JSON 后**直接实现**。
4. Codex 完成 HTML/CSS/JS 后，先本地检查手机尺寸、密码输入、动画和秒级计时，再 push 到 GitHub，按 `docs/DEPLOY_GITHUB_PAGES.md` 部署。
5. 实际手机访问线上 `https://用户名.github.io/仓库名/`，根据截图继续迭代。

## 已确定内容

- 主题：**小杨 × 诡秘的相识时间记录**；可爱像素猫系是画风，不是剧情主题。
- 密码：`261009`；时间起点：北京时间 `2026-10-09T08:15:00+08:00`。
- P1 密码门：`assets/p1`，三层构图；原设计在 `references/P1_APPROVED_VISUAL_01.png`。
- P2 加载：`assets/p2` 四帧，按 300ms/帧循环两轮，2400ms 切换。
- P3 主页：`assets/p3` 背景、两位角色、团子；实时计时、点击气泡、三入口。
- P4：`assets/p4` 抽签机 + 共用施工形象；10 条签文在 `content/P4_FORTUNE_CONTENT.json`。
- P4 直接沿用 `P3_BG_01.webp` 作为背景，CSS 处理遮罩。

## 概念图是否要给 Codex？

**要，但只当布局参考。**

- `references/P3_LAYOUT_ONLY_USER_SKETCH.jpg`：只说明“标题/计时器在上，角色在中，三个入口在下”的**空间层级**。它是临时 UI 概念图，**不是网站背景，不是已确定的 UI 造型**。Codex 必须自行用 CSS/SVG 做符合猫系像素画风的 UI。
- `references/P1_APPROVED_VISUAL_01.png`：用户最满意的 P1 完整观感，指导“奶油色/像素门/团子/排版氛围”。不能直接用它当可交互整页背景，因为它的输入框和文字都被画死。
- `references/P1_LAYER_ALIGNMENT_01.jpg`：实际拆层位置参考；门与底图有白边，**必须浏览器内调试，不允许宣称无缝**。

## 素材约束

正式网页只引用 `assets/`，不得把 `references/` 或 `source_originals/` 当成运行时资源；不得随意替换已选角色、重生成素材、改剧情/更换名字。查看 `docs/ASSET_INDEX.md` 和 `docs/ASSET_MANIFEST.json` 获取完整编号与文件路径。所有图片从当前仓库根目录用相对路径访问。

## 开发优先级

1. **先跑通 P1 → P2 → P3 → P4 → 返回 P3**，不要过度堆动效。
2. 计时必须与真实绝对时间对应；时区正确；每秒更新。
3. 角色互动和 10 签完整实现；两个施工中页面不能冒充已经开放。
4. 9:16 手机竖屏优先，支持手机系统键盘弹出时输入框/按钮不被遮挡。
5. GitHub Pages 子目录路径部署成功，不依赖后端、服务端 API、数据库或 router。

## 文件入口

- `CODEX_MASTER_TASK.md` → 总开发规范（Codex 应优先阅读）
- `COPY_TO_CODEX.txt` → 给 Codex 的启动指令
- `docs/P1_PASSWORD.md` ... `docs/P4_SUBPAGES.md` → 每页要求
- `docs/DESIGN_SYSTEM.md` → 像素/猫系 UI 的具体设计语言
- `docs/ASSET_INDEX.md` → 编号、尺寸、用途
- `docs/MOBILE_QA_CHECKLIST.md` → 检查项
- `docs/DEPLOY_GITHUB_PAGES.md` → Pages 部署
