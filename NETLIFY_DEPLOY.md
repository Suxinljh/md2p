# Netlify 部署指南

## 前置准备
1. 注册 Netlify 账号: https://app.netlify.com
2. 安装 Netlify CLI
3. 准备你的 Gemini API Key

---

## 方法 1: 通过 Netlify CLI 部署（推荐）

### 1. 安装 Netlify CLI
```bash
npm install -g netlify-cli
```

### 2. 登录 Netlify
```bash
netlify login
```
这会打开浏览器进行授权。

### 3. 初始化站点
```bash
netlify init
```
按照提示操作：
- 选择 "Create & configure new site"
- 选择团队（如果有多个）
- 输入站点名称（可选，会自动生成）

### 4. 配置环境变量
```bash
# 在 Netlify 上设置环境变量
netlify env:set GEMINI_API_KEY "你的_GEMINI_API_KEY"
```

### 5. 部署！
```bash
# 部署到预览环境（会生成一个预览 URL）
netlify deploy

# 或者直接部署到生产环境
netlify deploy --prod
```

✅ 完成！你会得到一个类似 `https://your-site.netlify.app` 的 URL。

---

## 方法 2: 通过 Git 自动部署（CI/CD）

### 1. 推送代码到 GitHub
```bash
git init
git add .
git commit -m "Initial commit"
# 创建 GitHub 仓库后
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

### 2. 在 Netlify 中连接 GitHub
1. 访问 https://app.netlify.com
2. 点击 "Add new site" → "Import an existing project"
3. 选择 GitHub，授权访问你的仓库
4. 选择这个项目仓库

### 3. 配置构建设置
Netlify 会自动检测配置，但请确认以下设置：

```
Build command: npm run build
Publish directory: dist
```

### 4. 配置环境变量
在 Site settings → Environment variables 中添加：
```
GEMINI_API_KEY = 你的_GEMINI_API_KEY
```

### 5. 部署
点击 "Deploy site" 按钮。

✅ 之后每次推送到 main 分支都会自动重新部署！

---

## 方法 3: 手动拖拽部署（最简单）

1. **本地构建**
```bash
npm run build
```

2. **访问 Netlify Drop**
打开 https://app.netlify.com/drop

3. **拖拽 dist 文件夹**
将项目中的 `dist` 文件夹拖拽到页面中

4. **配置环境变量**
部署后进入 Site settings → Environment variables 添加：
```
GEMINI_API_KEY = 你的_GEMINI_API_KEY
```

5. **重新部署**
配置完环境变量后，点击 "Trigger deploy" → "Deploy site"

⚠️ 注意：拖拽部署后修改环境变量需要重新部署才能生效。

---

## 环境变量说明

### 必需的环境变量
- `GEMINI_API_KEY`: 你的 Google Gemini API 密钥
  - 获取地址: https://makersuite.google.com/app/apikey
  - 免费额度: 每天 15 个请求

### 可选的环境变量
- `NODE_VERSION`: Node.js 版本（默认 18）

---

## 常见问题

### Q: 部署后 API 调用失败？
A: 检查环境变量是否正确配置，在 Netlify Dashboard 的 Site settings → Environment variables 中确认。

### Q: 如何查看部署日志？
A:
- CLI: `netlify logs`
- Web: 在 Netlify Dashboard 点击 "Deploys" → 选择一个部署 → "Deploy log"

### Q: 如何自定义域名？
A: 在 Site settings → Domain management 中可以：
- 添加自定义域名
- 配置 HTTPS（免费自动）

### Q: 如何撤销部署？
A: 在 Netlify Dashboard 的 Deploys 页面，点击 "Rollback" 回滚到之前的版本。

---

## 部署后测试

部署完成后，访问你的站点并测试：
1. ✅ 页面正常加载
2. ✅ Markdown 转换功能正常
3. ✅ 图片下载功能正常
4. ✅ 样式显示正确

---

## 性能优化建议

项目已配置：
- ✅ 自动 Gzip/Brotli 压缩
- ✅ 静态资源长期缓存
- ✅ SPA 路由支持

可以进一步优化：
- 配置 CDN（Netlify 默认已包含）
- 启用 Netlify Image CDN
- 配置 Netlify Functions（如需后端功能）

---

## 更新部署

### CLI 方式
```bash
# 修改代码后
netlify deploy --prod
```

### Git 方式
```bash
git add .
git commit -m "Update"
git push
```
Netlify 会自动检测并重新部署。

---

## 费用说明

Netlify 免费计划包括：
- ✅ 无限带宽
- ✅ 无限站点
- ✅ 自动 HTTPS
- ✅ 300 分钟构建时间/月
- ✅ 100GB 流量/月

对于个人项目完全够用！

---

## 需要帮助？

- Netlify 文档: https://docs.netlify.com
- Netlify 社区: https://community.netlify.com
- 本项目配置文件: `netlify.toml`
