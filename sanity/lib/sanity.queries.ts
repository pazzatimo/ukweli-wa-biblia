import { groq } from 'next-sanity'

// ============================================================
// Site Settings
// ============================================================
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    logo,
    navigation,
    footerText,
    socialLinks,
    contactEmail,
    contactPhone,
    address
  }
`

// ============================================================
// Articles
// ============================================================
export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage,
    author->{ name, role, photo },
    categories[]->{ title, slug },
    scriptureReferences
  }
`

export const articleQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    coverImage,
    author->{ name, role, photo, bio },
    categories[]->{ title, slug },
    scriptureReferences,
    seo
  }
`

// ============================================================
// Sermons
// ============================================================
export const sermonsQuery = groq`
  *[_type == "sermon"] | order(dateDelivered desc) {
    _id,
    title,
    slug,
    summary,
    dateDelivered,
    speaker->{ name, role, photo },
    media {
      type,
      duration,
      "fileUrl": file.asset->url,
      "youtubeUrl": youtubeUrl,
      "externalUrl": externalUrl
    },
    scriptureReferences,
    categories[]->{ title, slug }
  }
`

export const sermonQuery = groq`
  *[_type == "sermon" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    summary,
    transcript,
    dateDelivered,
    speaker->{ name, role, photo, bio },
    media {
      type,
      duration,
      "fileUrl": file.asset->url,
      "youtubeUrl": youtubeUrl,
      "externalUrl": externalUrl
    },
    scriptureReferences,
    categories[]->{ title, slug },
    seo
  }
`

// ============================================================
// Songs
// ============================================================
export const songsQuery = groq`
  *[_type == "song"] | order(title asc) {
    _id,
    title,
    slug,
    lyrics,
    scriptureBasis,
    composedBy->{ name },
    dateWritten
  }
`

export const songQuery = groq`
  *[_type == "song" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    lyrics,
    scriptureBasis,
    composedBy->{ name, role },
    dateWritten
  }
`

// ============================================================
// Events
// ============================================================
export const eventsQuery = groq`
  *[_type == "event"] | order(startDateTime asc) {
    _id,
    title,
    slug,
    startDateTime,
    endDateTime,
    location,
    description,
    coverImage,
    recurring
  }
`

export const eventQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    startDateTime,
    endDateTime,
    location,
    description,
    coverImage,
    recurring,
    seo
  }
`

// ============================================================
// Pages (static / pageBuilder)
// ============================================================
export const pagesQuery = groq`
  *[_type == "page"] { _id, title, slug, pageBuilder }
`

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    pageBuilder,
    seo
  }
`

// ============================================================
// Categories
// ============================================================
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) { _id, title, slug }
`

// ============================================================
// People / Staff
// ============================================================
export const peopleQuery = groq`
  *[_type == "person"] | order(order asc) {
    _id,
    name,
    role,
    photo,
    bio,
    order
  }
`

// ============================================================
// Home Page – Featured content
// ============================================================
export const homeQuery = groq`
  {
    "latestArticles": *[_type == "article"] | order(publishedAt desc)[0...5] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      coverImage,
      author->{ name }
    },
    "latestSermons": *[_type == "sermon"] | order(dateDelivered desc)[0...5] {
      _id,
      title,
      slug,
      summary,
      dateDelivered,
      speaker->{ name },
      media {
        type,
        "fileUrl": file.asset->url
      }
    },
    "upcomingEvents": *[_type == "event"] | order(startDateTime asc)[0...3] {
      _id,
      title,
      slug,
      startDateTime,
      location,
      coverImage
    },
    "featuredShuhudas": *[_type == "shuhuda" && featured == true] | order(date desc, _createdAt desc)[0...4] {
      _id,
      title,
      slug,
      person,
      date,
      description,
      images,
      audio,
      video
    }
  }
`

// ============================================================
// Shuhuda (Testimonies)
// ============================================================
export const shuhudasQuery = groq`
  *[_type == "shuhuda"] | order(date desc, _createdAt desc) {
    _id,
    title,
    slug,
    person,
    date,
    description,
    images,
    audio,
    video,
    featured
  }
`

export const shuhudaQuery = groq`
  *[_type == "shuhuda" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    person,
    date,
    description,
    images,
    audio,
    video,
    featured,
    seo
  }
`

export const featuredShuhudasQuery = groq`
  *[_type == "shuhuda" && featured == true] | order(date desc, _createdAt desc)[0...6] {
    _id,
    title,
    slug,
    person,
    date,
    description,
    images,
    audio,
    video
  }
`

// ============================================================
// All Slugs for Sitemap
// ============================================================
export const allSlugsQuery = groq`
  {
    "articles": *[_type == "article" && defined(slug.current)] { slug },
    "sermons": *[_type == "sermon" && defined(slug.current)] { slug },
    "songs": *[_type == "song" && defined(slug.current)] { slug },
    "events": *[_type == "event" && defined(slug.current)] { slug },
    "pages": *[_type == "page" && defined(slug.current)] { slug },
    "shuhudas": *[_type == "shuhuda" && defined(slug.current)] { slug }
  }
`