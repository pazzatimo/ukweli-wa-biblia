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

  // Separate past and upcoming events
  const now = new Date()
  const upcoming = events.filter((e: any) => new Date(e.startDateTime) >= now)
  const past = events.filter((e: any) => new Date(e.startDateTime) < now)

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Matukio Yote</h1>

      {events.length === 0 ? (
        <p className="text-gray-600">Hakuna matukio bado. Jisajili katika Studio kuongeza matukio.</p>
      ) : (
        <>
          {/* Upcoming Events */}
          {upcoming.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Matukio Yajayo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((event: any) => (
                  <Link key={event._id} href={`/matukio/${event.slug.current}`}>
                    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      {event.coverImage && (
                        <Image
                          src={urlFor(event.coverImage).width(400).height(200).url()}
                          alt={event.title}
                          width={400}
                          height={200}
                          className="w-full h-40 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(event.startDateTime).toLocaleDateString('sw', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                        {event.location && (
                          <p className="text-sm text-gray-500">{event.location}</p>
                        )}
                        {event.recurring?.isRecurring && (
                          <p className="text-xs text-blue-600 mt-1">
                            {event.recurring.rule || 'Mara kwa mara'}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Past Events */}
          {past.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Matukio Yaliyopita</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {past.map((event: any) => (
                  <Link key={event._id} href={`/matukio/${event.slug.current}`}>
                    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow opacity-75">
                      {event.coverImage && (
                        <Image
                          src={urlFor(event.coverImage).width(400).height(200).url()}
                          alt={event.title}
                          width={400}
                          height={200}
                          className="w-full h-40 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(event.startDateTime).toLocaleDateString('sw')}
                        </p>
                        {event.location && (
                          <p className="text-sm text-gray-500">{event.location}</p>
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