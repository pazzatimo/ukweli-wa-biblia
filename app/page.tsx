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
      {/* Hero Slider */}
      <HeroSlider />

      {/* Featured Section - Latest Articles */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Makala</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mt-2 mb-4">
              Makala za Hivi Karibuni
            </h2>
            <p className="text-gray-600 text-lg">
              Soma makala za kujenga imani na kuelimisha roho yako.
            </p>
          </div>

          {data.latestArticles.length === 0 ? (
            <p className="text-gray-500 text-center py-12">Hakuna makala bado.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.latestArticles.slice(0, 3).map((article: any) => (
                <Link key={article._id} href={`/makala/${article.slug.current}`}>
                  <div className="group card overflow-hidden bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300">
                    {article.coverImage && (
                      <div className="relative h-56 overflow-hidden bg-gray-100">
                        <Image
                          src={urlFor(article.coverImage).width(600).height(350).url()}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary-700 mb-2 group-hover:text-gold-500 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        {article.author && (
                          <span>{article.author.name}</span>
                        )}
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

          <div className="text-center mt-12">
            <Link
              href="/makala"
              className="inline-block border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Tazama Makala Zote
            </Link>
          </div>
        </div>
      </section>

      {/* Sermons Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Mahubiri</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mt-2 mb-4">
              Mahubiri ya Hivi Karibuni
            </h2>
            <p className="text-gray-600 text-lg">
              Sikiliza na ujifunze kutoka kwa Neno la Mungu.
            </p>
          </div>

          {data.latestSermons.length === 0 ? (
            <p className="text-gray-500 text-center py-12">Hakuna mahubiri bado.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.latestSermons.slice(0, 3).map((sermon: any) => (
                <Link key={sermon._id} href={`/mahubiri/${sermon.slug.current}`}>
                  <div className="group bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 p-6 border-l-4 border-gold-400 hover:border-gold-600">
                    <h3 className="text-xl font-bold text-primary-700 mb-2 group-hover:text-gold-500 transition-colors">
                      {sermon.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {sermon.speaker?.name || 'Mhubiri'}
                    </p>
                    <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
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
                          <span className="text-gold-600 font-medium">
                            {sermon.media.type === 'audio' ? 'Audio' : 'Video'}
                          </span>
                        </>
                      )}
                    </div>
                    {sermon.summary && (
                      <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                        {sermon.summary}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/mahubiri"
              className="inline-block border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Tazama Mahubiri Yote
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Matukio</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mt-2 mb-4">
              Matukio Yajayo
            </h2>
            <p className="text-gray-600 text-lg">
              Jiunge nasi katika matukio yetu yajayo.
            </p>
          </div>

          {data.upcomingEvents.length === 0 ? (
            <p className="text-gray-500 text-center py-12">Hakuna matukio yajayo.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.upcomingEvents.slice(0, 3).map((event: any) => (
                <Link key={event._id} href={`/matukio/${event.slug.current}`}>
                  <div className="group bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden">
                    {event.coverImage && (
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <Image
                          src={urlFor(event.coverImage).width(600).height(300).url()}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary-700 mb-2 group-hover:text-gold-500 transition-colors">
                        {event.title}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          {new Date(event.startDateTime).toLocaleDateString('sw', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                        {event.location && (
                          <p className="text-gray-500">{event.location}</p>
                        )}
                      </div>
                      {event.recurring?.isRecurring && (
                        <p className="text-xs text-gold-600 font-medium mt-2">
                          {event.recurring.rule || 'Mara kwa mara'}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/matukio"
              className="inline-block border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Tazama Matukio Yote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}