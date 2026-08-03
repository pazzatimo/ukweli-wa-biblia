import { client } from '@/sanity/lib/sanity.client'
import { eventQuery } from '@/sanity/lib/sanity.queries'
import { urlFor } from '@/sanity/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getEvent(slug: string) {
  try {
    return await client.fetch(eventQuery, { slug })
  } catch (error) {
    console.error('Failed to fetch event:', error)
    return null
  }
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="mb-8">
        {event.coverImage && (
          <div className="relative w-full h-96 mb-6">
            <Image
              src={urlFor(event.coverImage).width(1200).height(600).url()}
              alt={event.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
        <div className="space-y-2 text-gray-600">
          <p>
            <strong>Tarehe:</strong>{' '}
            {new Date(event.startDateTime).toLocaleDateString('sw', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          {event.endDateTime && (
            <p>
              <strong>Mpaka:</strong>{' '}
              {new Date(event.endDateTime).toLocaleDateString('sw', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
          {event.location && (
            <p>
              <strong>Mahali:</strong> {event.location}
            </p>
          )}
          {event.recurring?.isRecurring && (
            <p className="text-blue-600">
              <strong>Mara kwa mara:</strong> {event.recurring.rule || 'Ndiyo'}
            </p>
          )}
        </div>
      </header>

      {event.description && event.description.length > 0 && (
        <div className="prose prose-lg max-w-none">
          <PortableText value={event.description} />
        </div>
      )}
    </article>
  )
}