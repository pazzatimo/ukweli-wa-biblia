import { client } from '@/sanity/lib/sanity.client'
import { sermonQuery } from '@/sanity/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
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

  // Check if summary has actual content
  const hasSummary = sermon.summary && sermon.summary.trim().length > 0
  const hasTranscript = sermon.transcript && sermon.transcript.length > 0
  const hasScriptures = sermon.scriptureReferences && sermon.scriptureReferences.length > 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-3xl py-4">
        {/* Back Button – Compact */}
        <Link
          href="/mahubiri"
          className="inline-flex items-center gap-1 text-primary-600 hover:text-gold-500 text-sm font-medium transition-colors"
        >
          ← Mahubiri Yote
        </Link>

        <article className="mt-4 space-y-4">
          {/* Header – Compact */}
          <div className="bg-white rounded-xl shadow-soft p-4">
            <h1 className="text-xl md:text-2xl font-bold text-primary-700 leading-tight">
              {sermon.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-500">
              {sermon.speaker && (
                <span className="font-medium text-primary-600">{sermon.speaker.name}</span>
              )}
              {sermon.dateDelivered && (
                <>
                  <span className="text-gray-300">|</span>
                  <span>
                    {new Date(sermon.dateDelivered).toLocaleDateString('sw', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </>
              )}
              {sermon.media?.duration && (
                <>
                  <span className="text-gray-300">|</span>
                  <span className="text-gold-600 font-medium">{sermon.media.duration}</span>
                </>
              )}
            </div>
            {sermon.categories && sermon.categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {sermon.categories.map((cat: any) => (
                  <Link
                    key={cat._id}
                    href={`/mahubiri?category=${cat.slug.current}`}
                    className="text-[10px] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full hover:bg-primary-100 transition-colors"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Media Player – Ultra Thin */}
          {sermon.media && (
            <div className="bg-white rounded-xl shadow-soft p-3">
              {sermon.media.type === 'audio' && sermon.media.fileUrl && (
                <audio controls className="w-full h-9">
                  <source src={sermon.media.fileUrl} />
                  Your browser does not support the audio element.
                </audio>
              )}
              {sermon.media.type === 'youtube' && sermon.media.youtubeUrl && (
                <div className="aspect-video">
                  <iframe
                    src={sermon.media.youtubeUrl.replace('watch?v=', 'embed/')}
                    className="w-full h-full rounded-lg"
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
                  className="text-primary-600 hover:text-gold-500 text-sm font-medium"
                >
                  Sikiliza kwenye tovuti nyingine →
                </a>
              )}
            </div>
          )}

          {/* Summary – Only if content exists */}
          {hasSummary && (
            <div className="bg-white rounded-xl shadow-soft p-4">
              <p className="text-sm text-gray-700 leading-relaxed">{sermon.summary}</p>
            </div>
          )}

          {/* Transcript */}
          {hasTranscript && (
            <div className="bg-white rounded-xl shadow-soft p-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Nakala
              </h3>
              <div className="prose prose-sm max-w-none text-gray-700">
                <PortableText value={sermon.transcript} />
              </div>
            </div>
          )}

          {/* Scripture References – Compact Chips */}
          {hasScriptures && (
            <div className="bg-white rounded-xl shadow-soft p-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Rejea za Biblia
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {sermon.scriptureReferences.map((ref: any, index: number) => (
                  <span
                    key={index}
                    className="text-xs bg-primary-50 text-primary-700 px-2.5 py-0.5 rounded-full font-medium"
                  >
                    {ref.displayText ||
                      `${ref.book} ${ref.chapter}:${ref.verseStart}${ref.verseEnd ? `-${ref.verseEnd}` : ''}`}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}