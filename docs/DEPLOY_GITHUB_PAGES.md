# 部署到 GitHub Pages

**最终目标:** `https://<GitHub用户名>.github.io/<仓库名>/`，无需后端、数据库或常驻服务器。

1. Codex 按 `CODEX_MASTER_TASK.md` 实现网站：仓库根目录须存在 `index.html`，资源在 `assets/`，数据在 `content/`，`.nojekyll` 放根目录。
2. 在本地用一个静态 HTTP 服务自测：在仓库根目录执行 `python -m http.server 8000`（仅本地预览），然后访问 `http://localhost:8000/`；上线不需要这个服务。
3. GitHub 新建仓库（自由命名，如 `xiaoyang-guimi-time-house`），将完成后的文件 push 至仓库默认分支 `main`。
4. 进入仓库 `Settings > Pages`，在 `Build and deployment` 选择 `Deploy from a branch`，分支 `main` / `/(root)`，保存。
5. 待 GitHub Pages 构建成功后，使用 `https://用户名.github.io/仓库名/` 打开。根目录 `index.html` 被自动加载。
6. 用手机访问真实线上链接，检查图片加载、密码键盘、计时和P4返回。若某资源404，首先检查是否错误写成 `/assets/...`（这是域名根路径，不是仓库子路径）；正确通常是 `./assets/...`。区分文件名大小写。

注意：公开 GitHub Pages 仓库中的静态密码、图片、JSON 都能被访问者查看。密码只是“推门仪式”而非数据安全保障，不要上传私人秘密、真实账号或敏感资料。
