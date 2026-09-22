import type { Metadata } from 'next'
import { Inter, Be_Vietnam_Pro } from 'next/font/google'
import '../globals.css'
import { SITE_CONFIG } from '@/lib/types'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingContact from '@/components/layout/FloatingContact'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
})

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'hóa chất công nghiệp',
    'dung môi công nghiệp',
    'phụ gia thực phẩm',
    'hóa chất xử lý nước thải',
    'hóa chất tẩy rửa',
    'Hóa Chất Hải Vân',
    'Hải Vân',
    'hóa chất Bình Dương',
    'cung cấp hóa chất toàn quốc',
    'hóa chất dệt nhuộm',
    'hóa chất xi mạ',
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/hero-warehouse.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Nhà cung cấp hóa chất công nghiệp uy tín`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ['/hero-warehouse.jpg'],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${inter.variable} ${beVietnamPro.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  )
}
