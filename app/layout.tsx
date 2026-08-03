import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { client } from '@/sanity/lib/sanity.client'
import { siteSettingsQuery } from '@/sanity/lib/sanity.queries'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Ukweli Wa Biblia - Kutangaza Neno la Mungu kwa uaminifu',
  description: 'Ukweli Wa Biblia ni kanisa linalojitolea kwenye uinjilisti, kufundisha Neno la Mungu, na kuweka imani katika Kristo.',
  keywords: 'kanisa, ibada, imani, Biblia, Ukweli wa Biblia, mahubiri, makala, nyimbo',
  authors: [{ name: 'Ukweli Wa Biblia' }],
  openGraph: {
    title: 'Ukweli Wa Biblia',
    description: 'Kutangaza Neno la Mungu kwa uaminifu',
    url: 'https://ukweliwabiblia.com',
    siteName: 'Ukweli Wa Biblia',
    locale: 'sw',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

async function getSiteSettings() {
  try {
    const settings = await client.fetch(siteSettingsQuery)
    return settings || {
      siteTitle: 'Ukweli Wa Biblia',
      siteDescription: 'Kutangaza Neno la Mungu kwa uaminifu',
      navigation: [
        { label: 'Nyumbani', url: '/' },
        { label: 'Makala', url: '/makala' },
        { label: 'Mahubiri', url: '/mahubiri' },
        { label: 'Nyimbo', url: '/nyimbo' },
        { label: 'Matukio', url: '/matukio' },
        { label: 'Media', url: '/media' },
        { label: 'Kuhusu', url: '/kuhusu' },
        { label: 'Wasiliana', url: '/wasiliana' },
      ],
      socialLinks: [],
      footerText: [],
      contactEmail: '',
      contactPhone: '',
      address: '',
    }
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
    return {
      siteTitle: 'Ukweli Wa Biblia',
      siteDescription: 'Kutangaza Neno la Mungu kwa uaminifu',
      navigation: [
        { label: 'Nyumbani', url: '/' },
        { label: 'Makala', url: '/makala' },
        { label: 'Mahubiri', url: '/mahubiri' },
        { label: 'Nyimbo', url: '/nyimbo' },
        { label: 'Matukio', url: '/matukio' },
        { label: 'Media', url: '/media' },
        { label: 'Kuhusu', url: '/kuhusu' },
        { label: 'Wasiliana', url: '/wasiliana' },
      ],
      socialLinks: [],
      footerText: [],
      contactEmail: '',
      contactPhone: '',
      address: '',
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <html lang="sw" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a3c5e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header settings={settings} />
        <main className="min-h-screen">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}