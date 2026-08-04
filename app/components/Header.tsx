'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/sanity.image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              {settings?.logo ? (
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-primary-100 group-hover:ring-gold-300 transition-all duration-300">
                  <Image
                    src={urlFor(settings.logo).width(60).height(60).url()}
                    alt={settings.siteTitle}
                    fill
                    className="object-cover"
                    sizes="60px"
                    priority
                  />
                </div>
              ) : (
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl group-hover:bg-primary-700 transition-colors duration-300">
                  U
                </div>
              )}
              <span className="text-lg md:text-xl font-bold text-primary-700 group-hover:text-gold-600 transition-colors duration-300 whitespace-nowrap">
                {settings?.siteTitle || 'Ukweli Wa Biblia'}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {settings?.navigation?.map((item: NavigationItem) => {
                const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url))
                return (
                  <Link
                    key={item.label}
                    href={item.url}
                    className={`
                      relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-gray-600 hover:text-primary-700 hover:bg-primary-50'
                      }
                    `}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gold-500 rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors relative z-[9999]"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 bg-primary-700 rounded-full transition-all duration-300 origin-left ${
                    isMenuOpen ? 'rotate-45 translate-x-0.5' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 bg-primary-700 rounded-full transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 bg-primary-700 rounded-full transition-all duration-300 origin-left ${
                    isMenuOpen ? '-rotate-45 translate-x-0.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 9998 }}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Navigation Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 9999 }}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-6 overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {settings?.navigation?.map((item: NavigationItem) => {
              const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url))
              return (
                <Link
                  key={item.label}
                  href={item.url}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    px-4 py-3 text-base font-medium rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-gray-600 hover:text-primary-700 hover:bg-primary-50'
                    }
                  `}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-auto pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              © {new Date().getFullYear()} {settings?.siteTitle || 'Ukweli Wa Biblia'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}