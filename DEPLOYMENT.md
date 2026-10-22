# 部署指南 - ezjobs 招聘 H5 页面

## 快速开始（本地开发）

### 1. 安装依赖

```bash
cd ezjobs-hire-landing
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000 查看页面

### 3. 构建生产版本

```bash
pnpm build
pnpm start
```

---

## 部署到 Vercel

### 方式 1：通过 Vercel CLI（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod
```

### 方式 2：通过 GitHub 集成

1. 将代码推送到 GitHub：
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ezjobs-hire-landing.git
git push -u origin main
```

2. 在 Vercel 导入项目：
   - 访问 https://vercel.com/new
   - 选择 GitHub 仓库
   - 点击 "Deploy"
   - 自动部署完成

3. 获取部署链接：
   - 预览链接：`https://ezjobs-hire-landing-xxx.vercel.app`
   - 生产链接：`https://ezjobs-hire-landing.vercel.app`

### 方式 3：绑定自定义域名

1. 在 Vercel 项目设置中添加域名：
   - `hire.ezjobs.com` 或 `ezjobs-bd.com`

2. 配置 DNS：
   - 添加 CNAME 记录指向 `cname.vercel-dns.com`

3. 等待 SSL 证书自动生成（约 5 分钟）

---

## 配置飞书 CRM 集成

### 1. 获取飞书应用凭证

访问飞书开放平台创建应用：
- https://open.feishu.cn/app

获取：
- App ID
- App Secret

### 2. 配置环境变量

创建 `.env.local` 文件：

```bash
# 飞书 Base API
FEISHU_APP_ID=cli_xxxxxxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FEISHU_BASE_TOKEN=EE4zbfKhPaWGSms77zEcJfwwnIE
FEISHU_TABLE_ID=tblAwifxfxgIzlKy

# Google Analytics（可选）
GA_TRACKING_ID=G-XXXXXXXXXX

# Facebook Pixel（可选）
FB_PIXEL_ID=XXXXXXXXXXXXXXX
```

### 3. 更新 API 路由

编辑 `app/api/submit/route.ts`，集成飞书 API：

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 调用飞书 Base API 创建记录
    const response = await fetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BASE_TOKEN}/tables/${process.env.FEISHU_TABLE_ID}/records`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAccessToken()}`,
        },
        body: JSON.stringify({
          fields: {
            'Company Name': body.companyName,
            'Contact Person': body.contactName,
            'Phone': body.phone,
            'Industry': body.industry,
            'Job Count': parseInt(body.jobCount) || 0,
            'Status': 'New Lead',
            'Source': 'H5 Landing Page',
          }
        })
      }
    )

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false }, { status: 500 })
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

async function getAccessToken() {
  // 实现飞书 access token 获取逻辑
  // 参考：https://open.feishu.cn/document/ukTM5YjL1UDN14iN1AjN
}
```

---

## 添加追踪代码

### Google Analytics

编辑 `app/layout.tsx`，添加 GA 脚本：

```typescript
export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GA_TRACKING_ID}');
            `
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Facebook Pixel

编辑 `app/layout.tsx`，添加 FB Pixel：

```typescript
<script
  dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${process.env.FB_PIXEL_ID}');
      fbq('track', 'PageView');
    `
  }}
/>
```

---

## 优化 OG 分享图片

### 生成 OG 图片

使用在线工具生成 1200x630 的分享封面：
- https://www.canva.com/templates/og-image/
- https://opengraph.design/

替换 `public/og-image.svg` 为 `public/og-image.jpg`

### 测试分享效果

使用 Facebook Sharing Debugger 测试：
- https://developers.facebook.com/tools/debug/

---

## 性能优化

### 1. 启用图片优化

编辑 `next.config.js`：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
```

### 2. 添加字体优化

编辑 `app/layout.tsx`：

```typescript
import { Hind_Siliguri, Inter } from 'next/font/google'

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bengali',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

---

## 监控与分析

### Vercel Analytics

在 Vercel 项目设置中启用 Analytics：
- 自动追踪 PV/UV
- 性能指标（Core Web Vitals）
- 无需额外代码

### 自定义分析

编辑 `app/api/submit/route.ts`，添加转化追踪：

```typescript
// 记录转化事件
console.log('Conversion:', {
  timestamp: new Date().toISOString(),
  source: request.headers.get('referer'),
  userAgent: request.headers.get('user-agent'),
  ...body
})
```

---

## 常见问题

### Q: 如何修改 WhatsApp 号码？

编辑以下文件中的 `+8801XXXXXXXXX`：
- `components/RegistrationForm.tsx`
- `components/Footer.tsx`

### Q: 如何添加更多语言？

1. 创建 `locales/` 目录
2. 添加 `bn.json`, `en.json`, `zh.json`
3. 使用 `next-intl` 或 `react-i18next` 集成

### Q: 如何修改颜色主题？

编辑 `tailwind.config.js`：

```javascript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',
      accent: '#YOUR_COLOR',
    },
  },
}
```

---

## 技术支持

如有问题，请联系：
- Email: tech@ezjobs.com
- WhatsApp: +880 1XXX-XXXXXX
