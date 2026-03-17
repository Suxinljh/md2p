# GitHub + Netlify 自动部署指南

## ✅ 已完成
- ✅ Git 仓库初始化
- ✅ 首次提交完成（42 个文件）
- ✅ .gitignore 配置完成
- ✅ netlify.toml 配置完成

---

## 📋 下一步：创建 GitHub 仓库并推送代码

### 步骤 1: 在 GitHub 创建新仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `md2p` (或你喜欢的名字)
   - **Description**: Markdown to Image converter - 美观的 Markdown 转图片工具
   - **可见性**: Public 或 Private 都可以
   - ⚠️ **不要勾选** "Add a README file"（我们已经有了）
   - ⚠️ **不要勾选** "Add .gitignore"（我们已经有了）
3. 点击 **Create repository**

### 步骤 2: 推送代码到 GitHub

创建仓库后，GitHub 会显示推送命令。复制以下命令到终端执行（将 `YOUR_USERNAME` 替换为你的 GitHub 用户名）：

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/md2p.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

**示例**：
```bash
git remote add origin https://github.com/suxin/md2p.git
git branch -M main
git push -u origin main
```

### 步骤 3: 在 Netlify 连接 GitHub 仓库

#### 3.1 登录 Netlify
1. 访问 https://app.netlify.com
2. 如果没有账号，点击 "Sign up"（可以用 GitHub 账号登录）

#### 3.2 导入 GitHub 仓库
1. 在 Netlify Dashboard，点击 **"Add new site"** → **"Import an existing project"**
2. 点击 **"GitHub"** 按钮
3. 如果是第一次使用，会提示授权 Netlify 访问你的 GitHub
4. 授权后，在仓库列表中找到并选择 `md2p` 仓库

#### 3.3 配置构建设置
Netlify 会自动检测到 `netlify.toml` 配置，确认以下设置：

| 配置项 | 值 |
|--------|-----|
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Branch to deploy** | `main` |

如果显示这些值，点击 **"Deploy site"** 或 **"Show advanced"** → **"Deploy site"**

### 步骤 4: 配置环境变量（重要！）

部署完成后，需要配置 Gemini API Key：

1. 在 Netlify Dashboard 中，进入你的站点
2. 点击 **"Site configuration"** 或 **"Site settings"**
3. 找到 **"Environment variables"** 部分
4. 点击 **"Add a variable"**
5. 添加以下变量：

```
Key:   GEMINI_API_KEY
Value: 你的_GEMINI_API_KEY_在这里
```

**获取 Gemini API Key**：
- 访问 https://makersuite.google.com/app/apikey
- 创建新的 API Key
- 复制并粘贴到 Netlify

### 步骤 5: 重新部署（触发环境变量生效）

添加环境变量后需要重新部署：

1. 在 Netlify Dashboard 点击 **"Deploys"**
2. 点击 **"Trigger deploy"** → **"Deploy site"**
3. 等待部署完成（约 1-2 分钟）

---

## 🎉 完成！

部署成功后，你会得到：
- **Netlify URL**: `https://your-site-name.netlify.app`
- **自动部署**: 每次 `git push` 都会自动触发部署

---

## 🔄 日常工作流

### 修改代码后更新部署

```bash
# 1. 查看修改状态
git status

# 2. 添加修改的文件
git add .
# 或者添加特定文件
git add src/App.tsx

# 3. 提交修改
git commit -m "描述你的修改"

# 4. 推送到 GitHub
git push

# ✅ Netlify 会自动检测并重新部署！
```

### 查看部署状态
- 在 Netlify Dashboard 的 **"Deploys"** 页面可以看到所有部署历史
- 每次推送都会显示部署进度（成功/失败）
- 点击任何部署可以查看详细日志

---

## 🔧 常用命令

### Git 相关
```bash
# 查看提交历史
git log --oneline

# 查看远程仓库
git remote -v

# 查看当前分支
git branch

# 创建新分支
git checkout -b feature/new-feature

# 合并分支到 main
git checkout main
git merge feature/new-feature
git push
```

### Netlify CLI（可选）
```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 查看部署状态
netlify status

# 查看部署日志
netlify logs

# 手动触发部署
netlify deploy --prod
```

---

## 🐛 故障排查

### Q: 推送失败，提示 "Authentication failed"
**A**: 需要设置 GitHub Personal Access Token：
1. 访问 https://github.com/settings/tokens
2. 生成新的 token（勾选 `repo` 权限）
3. 推送时使用 token 作为密码

### Q: Netlify 部署失败
**A**: 检查部署日志：
1. 在 Netlify Dashboard → Deploys
2. 点击失败的部署 → 查看详细日志
3. 常见问题：
   - 依赖安装失败：检查 `package.json`
   - 构建失败：检查 `npm run build` 是否本地能成功
   - 环境变量缺失：确认在 Netlify 中配置了 `GEMINI_API_KEY`

### Q: 环境变量不生效
**A**:
1. 确认变量名拼写正确：`GEMINI_API_KEY`（全大写）
2. 添加环境变量后需要重新部署才能生效
3. 检查变量值前后是否有空格

### Q: 页面显示但功能不正常
**A**:
1. 打开浏览器控制台（F12）查看错误信息
2. 检查 Network 标签，查看 API 调用是否成功
3. 确认 API Key 配额是否用完（免费版每天 15 次请求）

---

## 📊 监控和维护

### Netlify 提供的功能
- **自动 HTTPS**: 所有站点免费自动配置 SSL
- **CDN**: 全球 CDN 加速
- **回滚**: 随时回滚到之前的版本
- **分支预览**: 每个 PR 都有预览 URL（需要 Netlify Pro）
- **表单处理**: 免费表单处理功能

### 性能优化
项目已配置：
- ✅ 自动 Gzip/Brotli 压缩
- ✅ 静态资源长期缓存
- ✅ 零配置预渲染

---

## 🎯 下一步

部署成功后，你可以：
1. ✅ 自定义域名（Site settings → Domain management）
2. ✅ 添加分析工具（Google Analytics, Plausible 等）
3. ✅ 配置 GitHub Actions 自动测试
4. ✅ 添加更多功能（导出 PDF、更多主题等）

---

## 📚 有用的链接

- **Netlify 文档**: https://docs.netlify.com
- **Netlify 部署配置**: https://docs.netlify.com/configure-builds/file-based-configuration/
- **GitHub 文档**: https://docs.github.com
- **Vite 文档**: https://vitejs.dev

---

## 💡 小贴士

1. **本地先测试**: 推送前确保 `npm run build` 本域能成功
2. **有意义的提交信息**: 使用清晰的提交信息方便后续查找
3. **定期更新依赖**: `npm update` 保持依赖安全
4. **监控构建时间**: 如果构建时间变长，可能需要优化

---

**祝部署顺利！** 🚀

如有问题，可以查看 Netlify Dashboard 中的部署日志，或参考 Netlify 文档。
