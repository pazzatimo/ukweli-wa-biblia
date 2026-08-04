import { client } from '@/sanity/lib/sanity.client'
import { shuhudasQuery } from '@/sanity/lib/sanity.queries'
import { urlFor } from '@/sanity/lib/sanity.image'
import Link from 'next/link'
import Image from 'next/image'

async function getShuhudas() {
  try {
    return await client.fetch(shuhudasQuery)
  } catch (error) {
    console.error('Failed to fetch shuhudas:', error)
    return []
  }
}

export default async function ShuhudaPage() {
  const shuhudas = await getShuhudas()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary-700">Shuhuda</h1>
      <p className="text-gray-600 mb-8">Matendo Makuu ya Mungu miongoni mwa watu</p>

      {shuhudas.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Hakuna shuhuda bado. Jisajili katika Studio kuongeza shuhuda.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shuhudas.map((item: any) => (
            <Link key={item._id} href={`/shuhuda/${item.slug.current}`}>
              <div className="group bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-gray-50">
                {item.images && item.images.length > 0 && (
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={urlFor(item.images[0]).width(600).height(350).url()}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-primary-700 group-hover:text-gold-500 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  {item.person && (
                    <p className="text-sm text-gray-500 mt-1">Na {item.person}</p>
                  )}
                  {item.date && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.date).toLocaleDateString('sw', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.audio && (
                      <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">🎵 Sauti</span>
                    )}
                    {(item.video?.file || item.video?.url) && (
                      <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">🎬 Video</span>
                    )}
                    {item.images && item.images.length > 1 && (
                      <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">📷 Picha ({item.images.length})</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}