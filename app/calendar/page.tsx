import { client } from '@/sanity/lib/sanity.client'
import { groq } from 'next-sanity'
import Link from 'next/link'
import { CalendarGrid } from '@/app/components/CalendarGrid'

const eventsQuery = groq`
  *[_type == "event"] | order(startDateTime asc) {
    _id,
    title,
    slug,
    startDateTime,
    endDateTime,
    location,
    description,
    coverImage,
    recurring
  }
`

async function getEvents() {
  try {
    return await client.fetch(eventsQuery)
  } catch (error) {
    console.error('Failed to fetch events:', error)
    return []
  }
}

export default async function CalendarPage() {
  const events = await getEvents()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kalenda</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Tazama matukio yetu yajayo na yaliyopita
          </p>
          <div className="w-24 h-1 bg-gold-400 mx-auto mt-4"></div>
        </div>
      </section>

      {/* Calendar Grid */}
      <section className="container py-12">
        <CalendarGrid events={events} />
      </section>
    </div>
  )
}