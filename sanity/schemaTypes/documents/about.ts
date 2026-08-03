import { defineType, defineField } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'Kuhusu Sisi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Kichwa',
      type: 'string',
      initialValue: 'Kuhusu Sisi',
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
      name: 'description',
      title: 'Maelezo ya Kanisa',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Maelezo mafupi ya kanisa letu',
    }),
    defineField({
      name: 'mission',
      title: 'Dhamira',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Dhamira yetu kama kanisa',
    }),
    defineField({
      name: 'vision',
      title: 'Maono',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Maono yetu',
    }),
    defineField({
      name: 'coreBeliefs',
      title: 'Imani Zetu',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'belief',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Kichwa',
            }),
            defineField({
              name: 'description',
              type: 'array',
              of: [{ type: 'block' }],
              title: 'Maelezo',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'leadership',
      title: 'Kiongozi / Timu ya Uongozi',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'leader',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Jina' }),
            defineField({ name: 'role', type: 'string', title: 'Nafasi' }),
            defineField({ name: 'phone', type: 'string', title: 'Namba ya Simu' }),
            defineField({
              name: 'photo',
              type: 'image',
              title: 'Picha',
              options: { hotspot: true },
            }),
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