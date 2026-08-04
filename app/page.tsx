import { client } from '@/sanity/lib/sanity.client'
import { homeQuery } from '@/sanity/lib/sanity.queries'
import { urlFor } from '@/sanity/lib/sanity.image'
import { HeroSlider } from '@/app/components/HeroSlider'
import Link from 'next/link'
import Image from 'next/image'

async function getHomeData() {
  try {
    return await client.fetch(homeQuery)
  } catch (error) {
    console.error('Failed to fetch home data:', error)
    return {
      latestArticles: [],
      latestSermons: [],
      upcomingEvents: [],
    }
  }
}

export default async function Home() {
  const data = await getHomeData()

  return (
    <div>
      <HeroSlider />

      {/* Articles Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-700">Makala</h2>
            <Link
              href="/makala"
              className="text-primary-600 hover:text-gold-500 font-medium text-sm transition-colors flex items-center gap-1"
            >
              Tazama Zote <span className="text-lg">→</span>
            </Link>
          </div>

          {data.latestArticles.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Hakuna makala bado.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.latestArticles.slice(0, 3).map((article: any) => (
                <Link key={article._id} href={`/makala/${article.slug.current}`}>
                  <div className="group bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-gray-50">
                    {article.coverImage && (
                      <div className="relative h-52 overflow-hidden bg-gray-100">
                        <Image
                          src={urlFor(article.coverImage).width(600).height(350).url()}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-primary-700 group-hover:text-gold-500 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                        {article.author && <span>{article.author.name}</span>}
                        {article.publishedAt && (
                          <>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span>
                              {new Date(article.publishedAt).toLocaleDateString('sw', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sermons Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-700">Mahubiri</h2>
            <Link
              href="/mahubiri"
              className="text-primary-600 hover:text-gold-500 font-medium text-sm transition-colors flex items-center gap-1"
            >
              Tazama Yote <span className="text-lg">→</span>
            </Link>
          </div>

          {data.latestSermons.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Hakuna mahubiri bado.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.latestSermons.slice(0, 3).map((sermon: any) => (
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
      </section>

      {/* Events Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-700">Matukio</h2>
            <Link
              href="/matukio"
              className="text-primary-600 hover:text-gold-500 font-medium text-sm transition-colors flex items-center gap-1"
            >
              Yote <span className="text-lg">→</span>
            </Link>
          </div>

          {data.upcomingEvents.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Hakuna matukio yajayo.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.upcomingEvents.slice(0, 3).map((event: any) => (
                <Link key={event._id} href={`/matukio/${event.slug.current}`}>
                  <div className="group bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-gray-50">
                    {event.coverImage && (
                      <div className="relative h-44 overflow-hidden bg-gray-100">
                        <Image
                          src={urlFor(event.coverImage).width(600).height(300).url()}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-primary-700 group-hover:text-gold-500 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(event.startDateTime).toLocaleDateString('sw', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                      {event.location && (
                        <p className="text-xs text-gray-400 mt-1">{event.location}</p>
                      )}
                      {event.recurring?.isRecurring && (
                        <p className="text-xs text-gold-500 font-medium mt-2">
                          {event.recurring.rule || 'Mara kwa mara'}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}