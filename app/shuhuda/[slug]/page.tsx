import { client } from '@/sanity/lib/sanity.client'
import { shuhudaQuery } from '@/sanity/lib/sanity.queries'
import { urlFor } from '@/sanity/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getShuhuda(slug: string) {
  try {
    return await client.fetch(shuhudaQuery, { slug })
  } catch (error) {
    console.error('Failed to fetch shuhuda:', error)
    return null
  }
}

export default async function ShuhudaPage({ params }: PageProps) {
  const { slug } = await params
  const item = await getShuhuda(slug)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl py-8">
        <Link
          href="/shuhuda"
          className="inline-flex items-center gap-1 text-primary-600 hover:text-gold-500 text-sm font-medium transition-colors"
        >
          ← Shuhuda Zote
        </Link>

        <article className="mt-4 bg-white rounded-2xl shadow-soft p-6 md:p-8">
          <header className="mb-6">
            {item.images && item.images.length > 0 && (
              <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={urlFor(item.images[0]).width(1200).height(675).url()}
                  alt={item.title}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-primary-700">{item.title}</h1>
            {item.person && <p className="text-sm text-gray-500 mt-1">Na {item.person}</p>}
            {item.date && (
              <p className="text-xs text-gray-400 mt-1">
                {new Date(item.date).toLocaleDateString('sw', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}
          </header>

          {item.audio && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Sauti</h3>
              <audio controls className="w-full h-10">
                <source src={urlFor(item.audio).url()} />
              </audio>
            </div>
          )}

          {item.video && (item.video.file || item.video.url) && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Video</h3>
              {item.video.file && (
                <video controls className="w-full rounded-lg">
                  <source src={urlFor(item.video.file).url()} />
                </video>
              )}
              {item.video.url && (
                <div className="aspect-video">
                  <iframe
                    src={item.video.url.replace('watch?v=', 'embed/')}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                    title={item.title}
                  />
                </div>
              )}
            </div>
          )}

          {item.description && (
            <div className="prose prose-lg max-w-none text-gray-700">
              <PortableText value={item.description} />
            </div>
          )}

          {item.images && item.images.length > 1 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Picha Zote</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {item.images.slice(1).map((image: any, idx: number) => (
                  <div key={idx} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={urlFor(image).width(400).height(400).url()}
                      alt={`${item.title} - picha ${idx + 2}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}