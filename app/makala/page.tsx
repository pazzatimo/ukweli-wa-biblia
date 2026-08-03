import { client } from '@/sanity/lib/sanity.client'
import { articlesQuery } from '@/sanity/lib/sanity.queries'
import { urlFor } from '@/sanity/lib/sanity.image'
import Link from 'next/link'
import Image from 'next/image'

async function getArticles() {
  try {
    return await client.fetch(articlesQuery)
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return []
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Makala Zote</h1>

      {articles.length === 0 ? (
        <p className="text-gray-600">Hakuna makala bado. Jisajili katika Studio kuongeza makala.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article: any) => (
            <Link key={article._id} href={`/makala/${article.slug.current}`}>
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {article.coverImage && (
                  <Image
                    src={urlFor(article.coverImage).width(400).height(250).url()}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-2">{article.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {article.author && (
                      <span className="text-sm text-gray-500">{article.author.name}</span>
                    )}
                    <span className="text-sm text-gray-400">
                      {new Date(article.publishedAt).toLocaleDateString('sw')}
                    </span>
                  </div>
                  {article.categories && article.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {article.categories.map((cat: any) => (
                        <span key={cat._id} className="text-xs bg-gray-200 px-2 py-1 rounded">
                          {cat.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}