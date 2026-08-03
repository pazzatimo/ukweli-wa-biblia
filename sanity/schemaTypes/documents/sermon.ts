import { defineType, defineField } from 'sanity'

export const sermon = defineType({
  name: 'sermon',
  title: 'Sermon',
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
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{ type: 'person' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'dateDelivered',
      title: 'Date Delivered',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'media',
      title: 'Media (Audio / Video)',
      type: 'mediaLink',
    }),
    defineField({
      name: 'summary',
      title: 'Summary / Description',
      type: 'text',
      description: 'Short description for listing cards',
      rows: 3,
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript (optional)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full sermon text, if available',
    }),
    defineField({
      name: 'scriptureReferences',
      title: 'Scripture References',
      type: 'array',
      of: [{ type: 'scriptureRef' }],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'speaker.name',
      media: 'media.file',
    },
  },
})