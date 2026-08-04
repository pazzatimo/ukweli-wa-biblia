import { client } from '@/sanity/lib/sanity.client'
import { articleQuery } from '@/sanity/lib/sanity.queries'
import { urlFor } from '@/sanity/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  try {
    return await client.fetch(articleQuery, { slug })
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return null
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="mb-8">
        {article.coverImage && (
          <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={urlFor(article.coverImage).width(1200).height(675).url()}
              alt={article.title}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          {article.author && <span>{article.author.name}</span>}
          <span>{new Date(article.publishedAt).toLocaleDateString('sw')}</span>
        </div>
        {article.categories && article.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.categories.map((cat: any) => (
              <Link
                key={cat._id}
                href={`/makala?category=${cat.slug.current}`}
                className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-lg max-w-none">
        {article.body && <PortableText value={article.body} />}
      </div>

      {article.scriptureReferences && article.scriptureReferences.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Rejea za Biblia</h3>
          <ul className="list-disc list-inside">
            {article.scriptureReferences.map((ref: any, index: number) => (
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