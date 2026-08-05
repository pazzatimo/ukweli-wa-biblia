import { client } from '@/sanity/lib/sanity.client'
import { eventsQuery } from '@/sanity/lib/sanity.queries'
import { urlFor } from '@/sanity/lib/sanity.image'
import Link from 'next/link'
import Image from 'next/image'

async function getEvents() {
  try {
    return await client.fetch(eventsQuery)
  } catch (error) {
    console.error('Failed to fetch events:', error)
    return []
  }
}

export default async function EventsPage() {
  const events = await getEvents()
  const now = new Date()
  const upcoming = events.filter((e: any) => new Date(e.startDateTime) >= now)
  const past = events.filter((e: any) => new Date(e.startDateTime) < now)

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary-700">Matukio Yote</h1>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Hakuna matukio bado.</p>
      ) : (
        <>
          {upcoming.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-primary-600">Matukio Yajayo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((event: any) => (
                  <Link key={event._id} href={`/matukio/${event.slug.current}`}>
                    <div className="group bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-gray-50">
                      {event.coverImage && (
                        <div className="relative aspect-video overflow-hidden bg-gray-100">
                          <Image
                            src={urlFor(event.coverImage).width(600).height(338).url()}
                            alt={event.title}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
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
                            weekday: 'long',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                          {event.endDateTime && (
                            <span>
                              {' '}
                              – {new Date(event.endDateTime).toLocaleDateString('sw', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          )}
                        </p>
                        {event.location && <p className="text-xs text-gray-400 mt-1">{event.location}</p>}
                        {event.recurring?.isRecurring && (
                          <p className="text-xs text-gold-600 font-medium mt-2">
                            🔄 {event.recurring.rule || 'Linarudia'}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-500">Matukio Yaliyopita</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {past.map((event: any) => (
                  <Link key={event._id} href={`/matukio/${event.slug.current}`}>
                    <div className="group bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-gray-50 opacity-75">
                      {event.coverImage && (
                        <div className="relative aspect-video overflow-hidden bg-gray-100">
                          <Image
                            src={urlFor(event.coverImage).width(600).height(338).url()}
                            alt={event.title}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
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
                        {event.location && <p className="text-xs text-gray-400 mt-1">{event.location}</p>}
                        {event.recurring?.isRecurring && (
                          <p className="text-xs text-gold-600 font-medium mt-2">
                            🔄 {event.recurring.rule || 'Linarudia'}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}