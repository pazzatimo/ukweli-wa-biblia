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
      <h1 className="text-4xl font-bold mb-8">Nyimbo Zote</h1>

      {songs.length === 0 ? (
        <p className="text-gray-600">Hakuna nyimbo bado. Jisajili katika Studio kuongeza nyimbo.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song: any) => (
            <Link key={song._id} href={`/nyimbo/${song.slug.current}`}>
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white p-4">
                <h2 className="font-semibold text-lg mb-2">{song.title}</h2>
                {song.composedBy && (
                  <p className="text-sm text-gray-600">Mwandishi: {song.composedBy.name}</p>
                )}
                {song.dateWritten && (
                  <p className="text-sm text-gray-400">
                    {new Date(song.dateWritten).toLocaleDateString('sw')}
                  </p>
                )}
                {song.scriptureBasis && song.scriptureBasis.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Msingi wa Biblia:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {song.scriptureBasis.map((ref: any, index: number) => (
                        <span key={index} className="text-xs bg-gray-200 px-2 py-1 rounded">
                          {ref.displayText ||
                            `${ref.book} ${ref.chapter}:${ref.verseStart}${ref.verseEnd ? `-${ref.verseEnd}` : ''}`}
                        </span>
                      ))}
                    </div>
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