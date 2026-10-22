import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ezjobs - 孟加拉招聘平台 | 3天免费发布岗位',
  description: '已有1000+企业通过ezjobs招到人才。免费发布岗位，精准匹配候选人，3步完成招聘。',
  keywords: '孟加拉招聘, Bangladesh recruitment, hiring, employer, 招聘平台, ezjobs',
  authors: [{ name: 'ezjobs' }],
  openGraph: {
    title: 'ezjobs - 3天免费招聘，找到合适员工',
    description: '已有1000+企业通过ezjobs招到人才。免费发布岗位，精准匹配候选人。',
    type: 'website',
    locale: 'bn_BD',
    siteName: 'ezjobs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ezjobs - 孟加拉招聘平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ezjobs - 3天免费招聘，找到合适员工',
    description: '已有1000+企业通过ezjobs招到人才',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1A73E8',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
