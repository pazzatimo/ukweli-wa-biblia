import { defineType, defineField } from 'sanity'

export const media = defineType({
  name: 'media',
  title: 'Kurasa ya Media',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Kichwa',
      type: 'string',
      initialValue: 'Media',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    // ---------- Nyimbo (simplified) ----------
    defineField({
      name: 'music',
      title: '🎵 Nyimbo',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'songItem',
          fields: [
            defineField({ 
              name: 'title', 
              type: 'string', 
              title: 'Kichwa',
              validation: Rule => Rule.required(),
            }),
            defineField({ 
              name: 'slug', 
              type: 'slug', 
              title: 'Slug',
              options: { source: 'title', maxLength: 96 },
              validation: Rule => Rule.required(),
            }),
            defineField({ 
              name: 'lyrics', 
              type: 'text', 
              title: 'Maneno ya Wimbo (hiari)',
              rows: 4,
            }),
            defineField({ 
              name: 'audio', 
              type: 'file', 
              title: 'Faili la Sauti (MP3)',
              options: { accept: 'audio/*' },
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    // ---------- Video ----------
    defineField({
      name: 'videos',
      title: '🎬 Video',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'videoItem',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Kichwa', validation: Rule => Rule.required() }),
            defineField({
              name: 'file',
              type: 'file',
              title: 'Faili la Video (MP4, WebM)',
              options: { accept: 'video/*' },
            }),
            defineField({
              name: 'url',
              type: 'url',
              title: 'URL ya Video (YouTube, Vimeo)',
            }),
            defineField({ name: 'description', type: 'text', title: 'Maelezo' }),
            defineField({ name: 'thumbnail', type: 'image', title: 'Picha Jalada', options: { hotspot: true } }),
          ],
          validation: Rule => Rule.custom((value: any) => {
            if (!value?.file && !value?.url) {
              return 'Tafadhali jaza faili au URL ya video.'
            }
            return true
          }),
        },
      ],
    }),
    // ---------- Nyaraka ----------
    defineField({
      name: 'documents',
      title: '📁 Nyaraka / Makala',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'mediaDocument',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Kichwa', validation: Rule => Rule.required() }),
            defineField({
              name: 'file',
              type: 'file',
              title: 'Faili (PDF, DOC, n.k.)',
              options: { accept: '.pdf,.doc,.docx,.txt' },
            }),
            defineField({ name: 'description', type: 'text', title: 'Maelezo' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})