import { client } from '@/sanity/lib/sanity.client'
import { groq } from 'next-sanity'
import { MediaTabs } from '@/app/components/MediaTabs'

const mediaQuery = groq`
  *[_type == "media"][0] {
    title,
    slug,
    music[] {
      title,
      slug,
      lyrics,
      "audioUrl": audio.asset->url
    },
    videos[] {
      title,
      "fileUrl": file.asset->url,
      url,
      description,
      thumbnail
    }[@.fileUrl != null || @.url != null],
    documents[] {
      title,
      "fileUrl": file.asset->url,
      description
    }[@.fileUrl != null],
    seo
  }
`

async function getMedia() {
  try {
    return await client.fetch(mediaQuery)
  } catch (error) {
    console.error('Failed to fetch media:', error)
    return null
  }
}

export default async function MediaPage() {
  const media = await getMedia()

  if (!media) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header – Bold & Modern (fallback) */}
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-16 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
          </div>
          <div className="container text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Media</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">Gundua nyimbo, video, na nyaraka zetu.</p>
            <div className="w-24 h-1 bg-gold-400 mx-auto mt-4 rounded-full" />
          </div>
        </section>
        <section className="container py-16">
          <div className="bg-white rounded-2xl shadow-soft p-8 text-center max-w-2xl mx-auto">
            <p className="text-gray-600">Hakuna maelezo ya media bado.</p>
          </div>
        </section>
      </div>
    )
  }

  const music = media.music ?? []
  const videos = media.videos ?? []
  const documents = media.documents ?? []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header – Bold & Modern */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl" />
        </div>
        <div className="container text-center relative z-10">
          <div className="flex justify-center gap-6 mb-4 text-gold-400">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v12H4z"/><path d="M8 4h2v4H8zM14 4h2v4h-2z"/></svg>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {media.title}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Gundua nyimbo, video, na nyaraka zetu
          </p>
          <div className="w-24 h-1 bg-gold-400 mx-auto mt-4 rounded-full" />
        </div>
      </section>

      <section className="container py-12">
        <MediaTabs music={music} videos={videos} documents={documents} />
      </section>
    </div>
  )
}