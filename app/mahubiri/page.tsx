import { client } from '@/sanity/lib/sanity.client'
import { sermonsQuery } from '@/sanity/lib/sanity.queries'
import { urlFor } from '@/sanity/lib/sanity.image'
import Link from 'next/link'
import Image from 'next/image'

async function getSermons() {
  try {
    return await client.fetch(sermonsQuery)
  } catch (error) {
    console.error('Failed to fetch sermons:', error)
    return []
  }
}

export default async function SermonsPage() {
  const sermons = await getSermons()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary-700">Mahubiri Yote</h1>

      {sermons.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Hakuna mahubiri bado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((sermon: any) => (
            <Link key={sermon._id} href={`/mahubiri/${sermon.slug.current}`}>
              <div className="group bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 p-5 border-l-4 border-gold-300 hover:border-gold-500">
                <h3 className="text-lg font-bold text-primary-700 group-hover:text-gold-500 transition-colors">
                  {sermon.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{sermon.speaker?.name || 'Mhubiri'}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <span>
                    {new Date(sermon.dateDelivered).toLocaleDateString('sw', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  {sermon.media?.type && (
                    <>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-gold-500 font-medium">
                        {sermon.media.type === 'audio' ? 'Audio' : 'Video'}
                      </span>
                    </>
                  )}
                </div>
                {sermon.summary && (
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{sermon.summary}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}