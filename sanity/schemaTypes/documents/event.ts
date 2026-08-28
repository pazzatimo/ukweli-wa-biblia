import { defineType, defineField } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Tukio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Kichwa',
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
      name: 'startDateTime',
      title: 'Tarehe na Muda wa Kuanza',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'endDateTime',
      title: 'Tarehe na Muda wa Kumaliza (hiari)',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Mahali',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Maelezo',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Picha ya Jalada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'recurring',
      title: 'Tukio linalojirudia',
      type: 'object',
      fields: [
        defineField({
          name: 'isRecurring',
          title: 'Linarudia?',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'rule',
          title: 'Kanuni ya Kurudia (e.g., "Kila Jumatano", "Kila Jumapili")',
          type: 'string',
          description: 'Andika maelezo ya muda wa kurudia, e.g., "Kila Jumatano saa 6:00 PM"',
          hidden: ({ parent }) => !parent?.isRecurring,
        }),
      ],
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
      subtitle: 'location',
      media: 'coverImage',
    },
  },
})