'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/sanity.image'
import { useState } from 'react'

interface NavigationItem {
  label: string
  url: string
}

interface SiteSettings {
  siteTitle: string
  logo?: any
  navigation: NavigationItem[]
}

export function Header({ settings }: { settings: SiteSettings }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-soft border-b border-gray-100 sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {settings?.logo ? (
              <div className="relative w-12 h-12 overflow-hidden rounded-full">
                <Image
                  src={urlFor(settings.logo).width(48).height(48).url()}
                  alt={settings.siteTitle}
                  fill
                  sizes="48px"
                  className="object-cover"
                  priority // <-- Added for LCP optimization
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                U
              </div>
            )}
            <span className="text-xl font-bold text-primary-700 group-hover:text-gold-600 transition-colors">
              {settings?.siteTitle || 'Ukweli Wa Biblia'}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {settings?.navigation?.map((item: NavigationItem) => (
              <Link
                key={item.label}
                href={item.url}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-500 after:transition-all hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-700"
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-100 space-y-2">
            {settings?.navigation?.map((item: NavigationItem) => (
              <Link
                key={item.label}
                href={item.url}
                className="block px-4 py-2 rounded-lg hover:bg-primary-50 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}