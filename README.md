# ezjobs 招聘雇主注册 H5 页面

孟加拉市场招聘雇主注册落地页，用于社交媒体分享引流。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **部署**: Vercel

## 功能特性

✅ 6 屏滚动设计（Hero → 痛点 → 方案 → 社会证明 → 表单 → 页脚）
✅ 孟加拉语 + 中文双语支持
✅ 表单验证（手机号格式校验）
✅ 社交分享优化（Open Graph 元标签）
✅ 移动端优先响应式设计
✅ CTA 按钮动效
✅ 表单提交 API（待集成飞书 CRM）

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
```

## 部署到 Vercel

### 方式 1：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 生产环境部署
vercel --prod
```

### 方式 2：通过 GitHub 集成

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 自动部署

## 环境变量

创建 `.env.local` 文件：

```bash
# 飞书 Base API（待配置）
FEISHU_APP_ID=your_app_id
FEISHU_APP_SECRET=your_app_secret
FEISHU_BASE_TOKEN=EE4zbfKhPaWGSms77zEcJfwwnIE
FEISHU_TABLE_ID=tblAwifxfxgIzlKy

# Google Analytics（可选）
GA_TRACKING_ID=GA_XXXXXXXX
```

## 待完成

- [x] 集成飞书 Base API，表单提交写入 Companies 表
- [ ] 添加 Google Analytics / Facebook Pixel 追踪
- [ ] 创建 OG 分享图片（1200x630）
- [ ] 添加 WhatsApp 分享按钮
- [ ] A/B 测试不同文案/颜色
- [ ] 添加多语言切换（孟加拉语/英语/中文）

## 飞书 CRM 集成

表单提交后，数据会自动写入飞书 Companies 表（`tblAwifxfxgIzlKy`），字段映射：

| 表单字段 | Companies 表字段 | 说明 |
|---|---|---|
| companyName | Company Name | 公司名称 |
| phone | Phone | 手机号（+880 格式） |
| industry | Industry | 行业（自动映射到飞书选项） |
| contactName | Notes | 联系人（写入备注） |
| jobCount | Notes | 预计岗位数（写入备注） |
| - | Source | 固定为 "Other" |
| - | Lead Status | 固定为 "New" |
| - | Call Status | 固定为 "Pending" |

### 配置飞书 API

1. 复制 `.env.example` 为 `.env.local`
2. 填入飞书应用凭证（从飞书开放平台获取）
3. 部署到 Vercel 后，在 Settings → Environment Variables 中配置相同的环境变量

## 页面结构

```
app/
├── layout.tsx          # 根布局（SEO 元标签）
├── page.tsx           # 主页
├── globals.css        # 全局样式
└── api/
    └── submit/
        └── route.ts   # 表单提交 API

components/
├── HeroSection.tsx           # 第 1 屏：Hero 区
├── PainPointsSection.tsx     # 第 2 屏：痛点共鸣
├── SolutionSection.tsx       # 第 3 屏：3 步方案
├── SocialProofSection.tsx    # 第 4 屏：社会证明
├── RegistrationForm.tsx      # 第 5 屏：注册表单
└── Footer.tsx                # 第 6 屏：页脚
```

## 设计稿

- **主色**: 品牌蓝 `#1A73E8` + 橙色 CTA `#FF6B35`
- **字体**: Hind Siliguri (孟加拉语) + Inter (英语)
- **圆角**: 12px
- **动效**: 滚动渐入，CTA 按钮 pulse

## 联系方式

- WhatsApp: +880 1XXX-XXXXXX
- Email: info@ezjobs.com
