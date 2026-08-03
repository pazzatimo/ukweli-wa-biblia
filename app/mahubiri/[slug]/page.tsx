import { client } from '@/sanity/lib/sanity.client'
import { sermonQuery } from '@/sanity/lib/sanity.queries'
import { urlFor } from '@/sanity/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getSermon(slug: string) {
  try {
    return await client.fetch(sermonQuery, { slug })
  } catch (error) {
    console.error('Failed to fetch sermon:', error)
    return null
  }
}

export default async function SermonPage({ params }: PageProps) {
  const { slug } = await params
  const sermon = await getSermon(slug)

  if (!sermon) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{sermon.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          {sermon.speaker && <span>{sermon.speaker.name}</span>}
          <span>{new Date(sermon.dateDelivered).toLocaleDateString('sw')}</span>
        </div>
        {sermon.categories && sermon.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {sermon.categories.map((cat: any) => (
              <Link
                key={cat._id}
                href={`/mahubiri?category=${cat.slug.current}`}
                className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        )}
      </header>

      {sermon.media && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          {sermon.media.type === 'audio' && sermon.media.fileUrl && (
            <audio controls className="w-full">
              <source src={sermon.media.fileUrl} />
              Your browser does not support the audio element.
            </audio>
          )}
          {sermon.media.type === 'youtube' && sermon.media.youtubeUrl && (
            <div className="aspect-video">
              <iframe
                src={sermon.media.youtubeUrl.replace('watch?v=', 'embed/')}
                className="w-full h-full"
                allowFullScreen
                title={sermon.title}
              />
            </div>
          )}
          {sermon.media.type === 'external' && sermon.media.externalUrl && (
            <a
              href={sermon.media.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Sikiliza nje (SoundCloud, n.k.)
            </a>
          )}
          {sermon.media.duration && (
            <p className="text-sm text-gray-500 mt-2">Muda: {sermon.media.duration}</p>
          )}
        </div>
      )}

      {sermon.summary && (
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-lg text-gray-700">{sermon.summary}</p>
        </div>
      )}

      {sermon.transcript && sermon.transcript.length > 0 && (
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4">Nakala</h2>
          <PortableText value={sermon.transcript} />
        </div>
      )}

      {sermon.scriptureReferences && sermon.scriptureReferences.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Rejea za Biblia</h3>
          <ul className="list-disc list-inside">
            {sermon.scriptureReferences.map((ref: any, index: number) => (
              <li key={index}>
                {ref.displayText ||
                  `${ref.book} ${ref.chapter}:${ref.verseStart}${ref.verseEnd ? `-${ref.verseEnd}` : ''}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}