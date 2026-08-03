import { defineType, defineField } from 'sanity'

export const song = defineType({
  name: 'song',
  title: 'Song',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'lyrics',
      title: 'Lyrics',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Use line breaks to separate verses / chorus',
    }),
    defineField({
      name: 'scriptureBasis',
      title: 'Scripture Basis',
      type: 'array',
      of: [{ type: 'scriptureRef' }],
      description: 'The Biblical foundation of this song',
    }),
    defineField({
      name: 'audioDemo',
      title: 'Audio Demo (optional)',
      type: 'file',
      options: { accept: 'audio/*' },
    }),
    defineField({
      name: 'composedBy',
      title: 'Composed By',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'dateWritten',
      title: 'Date Written (optional)',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'composedBy.name',
      media: 'audioDemo',
    },
  },
})