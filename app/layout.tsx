import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import { client } from '@/sanity/lib/sanity.client'
import { siteSettingsQuery } from '@/sanity/lib/sanity.queries'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-inter',
})

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['700'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Ukweli Wa Biblia - Ufunuo 10:7',
  description: 'Sisi ni kanisa dogo amabalo sio dhehebu lenye makao yake Maeneo ya Kigurunyembe njia ya kuelekea Bigwa, Morogoro. Kwa neema ya Mungu, dhamira yetu ni kuhubiri Injili ya Yesu Kristo bila kulegeza masharti. Mioyo yetu inaridhika pale tunapoona uhusiano wa kweli wa kiroho baina ya Mungu na wanadamu umeanzishwa, ambapo wanadamu wanakuwa viumbe vipya katika Kristo, wakiwa wamejazwa na Roho Wake na kuishi kulingana na Neno Lake.',
  keywords: 'kanisa, ibada, imani, Biblia, Ukweli wa Biblia, Ubatizo wa kweli, mahubiri, makala, nyimbo',
  authors: [{ name: 'Ukweli Wa Biblia' }],
  openGraph: {
    title: 'Ukweli Wa Biblia',
    description: 'Malaki 4:5-6',
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
      siteDescription: 'Malaki 4:5-6',
      navigation: [
        { label: 'Nyumbani', url: '/' },
        { label: 'Makala', url: '/makala' },
        { label: 'Mahubiri', url: '/mahubiri' },
        { label: 'Nyimbo', url: '/nyimbo' },
        { label: 'Matukio', url: '/matukio' },
        { label: 'Media', url: '/media' },
        { label: 'Shuhuda', url: '/shuhuda' },
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
      siteDescription: 'Malaki 4:5-6',
      navigation: [
        { label: 'Nyumbani', url: '/' },
        { label: 'Makala', url: '/makala' },
        { label: 'Mahubiri', url: '/mahubiri' },
        { label: 'Nyimbo', url: '/nyimbo' },
        { label: 'Matukio', url: '/matukio' },
        { label: 'Media', url: '/media' },
        { label: 'Shuhuda', url: '/shuhuda' },
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
    <html
      lang="sw"
      className={`${inter.variable} ${manrope.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a3c5e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-gray-50 text-gray-800">
        <Header settings={settings} />
        <main className="min-h-screen">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}