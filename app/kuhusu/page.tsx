import { client } from '@/sanity/lib/sanity.client'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/sanity.image'
import { ReadMore } from '@/app/components/ReadMore'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const aboutQuery = groq`
  *[_type == "about"][0] {
    title,
    slug,
    description,
    mission,
    vision,
    coreBeliefs,
    leadership[] {
      name,
      role,
      phone,
      photo
    },
    seo
  }
`

async function getAbout() {
  try {
    return await client.fetch(aboutQuery)
  } catch (error) {
    console.error('Failed to fetch about:', error)
    return null
  }
}

export default async function AboutPage() {
  const about = await getAbout()

  if (!about) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-primary-700 text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {about.title}
          </h1>
          <div className="w-24 h-1 bg-gold-400 mx-auto"></div>
        </div>
      </section>

      {about.description && (
        <section className="container py-16 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <PortableText value={about.description} />
            </div>
          </div>
        </section>
      )}

      {(about.mission || about.vision) && (
        <section className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {about.mission && (
              <div className="bg-white rounded-2xl shadow-soft p-8 md:p-10 border-t-4 border-gold-400">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-700 mb-4">
                  Dhamira Yetu
                </h2>
                <ReadMore>
                  <div className="prose prose-lg max-w-none">
                    <PortableText value={about.mission} />
                  </div>
                </ReadMore>
              </div>
            )}
            {about.vision && (
              <div className="bg-white rounded-2xl shadow-soft p-8 md:p-10 border-t-4 border-primary-400">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-700 mb-4">
                  Maono Yetu
                </h2>
                <ReadMore>
                  <div className="prose prose-lg max-w-none">
                    <PortableText value={about.vision} />
                  </div>
                </ReadMore>
              </div>
            )}
          </div>
        </section>
      )}

      {about.coreBeliefs && about.coreBeliefs.length > 0 && (
        <section className="bg-primary-50 py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
                Imani Zetu
              </h2>
              <p className="text-gray-600 text-lg">
                Tunashikilia imani hizi kama msingi wa mafundisho yetu.
              </p>
              <div className="w-16 h-1 bg-gold-400 mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {about.coreBeliefs.map((belief: any, index: number) => (
                <div
                  key={belief._key || index}
                  className="bg-white rounded-2xl shadow-soft p-6 md:p-8 border-l-4 border-gold-400"
                >
                  <h3 className="text-xl font-bold text-primary-700 mb-3">
                    {index + 1}. {belief.title}
                  </h3>
                  <ReadMore>
                    <div className="prose prose-base max-w-none text-gray-700">
                      {belief.description && <PortableText value={belief.description} />}
                    </div>
                  </ReadMore>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {about.leadership && about.leadership.length > 0 && (
        <section className="container py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Timu ya Uongozi
            </h2>
            <p className="text-gray-600 text-lg">
              Tunajivunia kuwa na viongozi waliobeba mzigo wa kuhudumia Neno la Mungu.
            </p>
            <div className="w-16 h-1 bg-gold-400 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {about.leadership.map((leader: any, index: number) => (
              <div
                key={leader._key || index}
                className="group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden text-center"
              >
                {leader.photo ? (
                  <div className="relative w-40 h-40 mx-auto mt-8 rounded-full overflow-hidden border-4 border-gold-200 group-hover:border-gold-400 transition-colors duration-300">
                    <Image
                      src={urlFor(leader.photo).width(200).height(200).url()}
                      alt={leader.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                ) : (
                  <div className="w-40 h-40 mx-auto mt-8 rounded-full bg-primary-100 flex items-center justify-center border-4 border-gold-200">
                    <span className="text-5xl text-primary-400 font-bold">
                      {leader.name?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
                <div className="p-6 pt-4">
                  <h3 className="text-xl font-bold text-primary-700 mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-gold-600 font-medium text-sm uppercase tracking-wide">
                    {leader.role}
                  </p>
                  {leader.phone && (
                    <p className="text-sm text-gray-500 mt-3">
                      <a
                        href={`tel:${leader.phone}`}
                        className="hover:text-primary-600 transition-colors"
                      >
                        {leader.phone}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}