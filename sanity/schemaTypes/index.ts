import type { SchemaTypeDefinition } from 'sanity'
import { seo } from './objects/seo'
import { scriptureRef } from './objects/scriptureRef'
import { mediaLink } from './objects/mediaLink'
import { cta } from './objects/cta'
import { person } from './documents/person'
import { category } from './documents/category'
import { article } from './documents/article'
import { sermon } from './documents/sermon'
import { song } from './documents/song'
import { event } from './documents/event'
import { page } from './documents/page'
import { siteSettings } from './documents/siteSettings'
import { about } from './documents/about'
import { media } from './documents/media'
import { shuhuda } from './documents/shuhuda'
import { heroSlide } from './documents/heroSlide'   // <-- NEW

export const schemaTypes: SchemaTypeDefinition[] = [
  seo,
  scriptureRef,
  mediaLink,
  cta,
  person,
  category,
  article,
  sermon,
  song,
  event,
  page,
  siteSettings,
  about,
  media,
  shuhuda,
  heroSlide,  // <-- REGISTERED
]