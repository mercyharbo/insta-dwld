import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Instagram Photo & Video Downloader | InstaDWL',
  description:
    'Download Instagram photos, videos, reels, and stories easily with InstaDWL. Fast, free, and secure Instagram downloader tool.',
  keywords: [
    'Instagram downloader',
    'Download Instagram photos',
    'Download Instagram videos',
    'Instagram reels downloader',
    'Instagram stories downloader',
    'InstaDWL',
  ],
  authors: [{ name: 'Code With Mercy' }],
  openGraph: {
    title: 'Instagram Photo & Video Downloader | InstaDWL',
    description:
      'Download Instagram photos, videos, reels, and stories easily with InstaDWL.',
    url: 'https://insta-dwld.vercel.app/',
    siteName: 'InstaDWL',
    images: [
      {
        url: 'https://insta-dwld.vercel.app/seo-image.png',
        width: 1200,
        height: 630,
        alt: 'InstaDWL - Instagram Downloader',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instagram Photo & Video Downloader | InstaDWL',
    description:
      'Download Instagram photos, videos, reels, and stories easily with InstaDWL.',
    images: ['https://insta-dwld.vercel.app//seo-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
