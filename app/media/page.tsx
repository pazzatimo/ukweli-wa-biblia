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
        <section className="bg-primary-700 text-white py-16">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Media</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Gundua nyimbo, video, na nyaraka zetu.
            </p>
            <div className="w-24 h-1 bg-gold-400 mx-auto mt-4"></div>
          </div>
        </section>
        <section className="container py-16">
          <div className="bg-white rounded-2xl shadow-soft p-8 text-center max-w-2xl mx-auto">
            <p className="text-gray-600">
              Hakuna maelezo ya media bado. Tafadhali ingia kwenye Sanity Studio na uunde ukurasa wa media.
            </p>
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
      <section className="bg-primary-700 text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{media.title}</h1>
          
          <div className="w-24 h-1 bg-gold-400 mx-auto mt-4"></div>
        </div>
      </section>

      <section className="container py-12">
        <MediaTabs music={music} videos={videos} documents={documents} />
      </section>
    </div>
  )
}