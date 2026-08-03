import { client } from '@/sanity/lib/sanity.client'
import { songQuery } from '@/sanity/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getSong(slug: string) {
  try {
    return await client.fetch(songQuery, { slug })
  } catch (error) {
    console.error('Failed to fetch song:', error)
    return null
  }
}

export default async function SongPage({ params }: PageProps) {
  const { slug } = await params
  const song = await getSong(slug)

  if (!song) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{song.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          {song.composedBy && <span>Mwandishi: {song.composedBy.name}</span>}
          {song.dateWritten && (
            <span>{new Date(song.dateWritten).toLocaleDateString('sw')}</span>
          )}
        </div>
      </header>

      {song.lyrics && song.lyrics.length > 0 && (
        <div className="prose prose-lg max-w-none">
          <PortableText value={song.lyrics} />
        </div>
      )}

      {song.scriptureBasis && song.scriptureBasis.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Msingi wa Biblia</h3>
          <ul className="list-disc list-inside">
            {song.scriptureBasis.map((ref: any, index: number) => (
              <li key={index}>
                {ref.displayText ||
                  `${ref.book} ${ref.chapter}:${ref.verseStart}${ref.verseEnd ? `-${ref.verseEnd}` : ''}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {song.audioDemo && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Demo ya Sauti</h3>
          <audio controls className="w-full">
            <source src={song.audioDemo.asset?.url} />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </article>
  )
}