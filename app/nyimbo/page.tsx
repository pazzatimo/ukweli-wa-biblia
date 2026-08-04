import { client } from '@/sanity/lib/sanity.client'
import { songsQuery } from '@/sanity/lib/sanity.queries'
import Link from 'next/link'

async function getSongs() {
  try {
    return await client.fetch(songsQuery)
  } catch (error) {
    console.error('Failed to fetch songs:', error)
    return []
  }
}

export default async function SongsPage() {
  const songs = await getSongs()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary-700">Nyimbo Zote</h1>

      {songs.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Hakuna nyimbo bado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song: any) => (
            <Link key={song._id} href={`/nyimbo/${song.slug.current}`}>
              <div className="border rounded-xl p-5 hover:shadow-medium transition-shadow bg-white">
                <h2 className="font-bold text-lg text-primary-700">{song.title}</h2>
                {song.composedBy && (
                  <p className="text-sm text-gray-500 mt-1">{song.composedBy.name}</p>
                )}
                {song.dateWritten && (
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(song.dateWritten).toLocaleDateString('sw', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                )}
                {song.scriptureBasis && song.scriptureBasis.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {song.scriptureBasis.map((ref: any, idx: number) => (
                      <span key={idx} className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">
                        {ref.displayText ||
                          `${ref.book} ${ref.chapter}:${ref.verseStart}${ref.verseEnd ? `-${ref.verseEnd}` : ''}`}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}