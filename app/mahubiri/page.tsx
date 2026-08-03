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
      <h1 className="text-4xl font-bold mb-8">Mahubiri Yote</h1>

      {sermons.length === 0 ? (
        <p className="text-gray-600">Hakuna mahubiri bado. Jisajili katika Studio kuongeza mahubiri.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((sermon: any) => (
            <Link key={sermon._id} href={`/mahubiri/${sermon.slug.current}`}>
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-2">{sermon.title}</h2>
                  <p className="text-gray-600 text-sm">{sermon.speaker?.name}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(sermon.dateDelivered).toLocaleDateString('sw')}
                  </p>
                  {sermon.summary && (
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{sermon.summary}</p>
                  )}
                  {sermon.categories && sermon.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {sermon.categories.map((cat: any) => (
                        <span key={cat._id} className="text-xs bg-gray-200 px-2 py-1 rounded">
                          {cat.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}