import Link from 'next/link'

interface SocialLink {
  platform: string
  url: string
}

interface SiteSettings {
  siteTitle: string
  footerText?: any[]
  socialLinks: SocialLink[]
  contactEmail?: string
  contactPhone?: string
  address?: string
}

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{settings?.siteTitle || 'Ukweli Wa Biblia'}</h3>
            {settings?.footerText && (
              <p className="text-gray-400 text-sm">
                {/* Portable text rendering would go here – simplified for now */}
              </p>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-4">Wasiliana Nasi</h4>
            {settings?.contactEmail && (
              <p className="text-gray-400 text-sm">Email: {settings.contactEmail}</p>
            )}
            {settings?.contactPhone && (
              <p className="text-gray-400 text-sm">Simu: {settings.contactPhone}</p>
            )}
            {settings?.address && (
              <p className="text-gray-400 text-sm">{settings.address}</p>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-4">Social Media</h4>
            <div className="flex gap-4">
              {settings?.socialLinks?.map((link: SocialLink) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} {settings?.siteTitle || 'Ukweli Wa Biblia'}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}