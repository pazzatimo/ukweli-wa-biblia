import { defineType, defineField } from 'sanity'

export const shuhuda = defineType({
  name: 'shuhuda',
  title: 'Shuhuda',
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
      name: 'person',
      title: 'Jina la Mtu / Mhusika',
      type: 'string',
      description: 'Jina la mtu aliyepata ushuda au anayeshuhudia',
    }),
    defineField({
      name: 'date',
      title: 'Tarehe',
      type: 'date',
      options: { dateFormat: 'DD-MM-YYYY' },
    }),
    defineField({
      name: 'description',
      title: 'Maelezo ya Ushuda',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Maelezo kamili ya ushuda (rich text)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Picha',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Picha zinazoonyesha ushuda',
    }),
    defineField({
      name: 'audio',
      title: 'Faili la Sauti (hiari)',
      type: 'file',
      options: { accept: 'audio/*' },
      description: 'Sauti ya ushuda (MP3, n.k.)',
    }),
    defineField({
      name: 'video',
      title: 'Video (hiari)',
      type: 'object',
      fields: [
        defineField({
          name: 'file',
          type: 'file',
          title: 'Faili la Video',
          options: { accept: 'video/*' },
        }),
        defineField({
          name: 'url',
          type: 'url',
          title: 'URL ya Video (YouTube, Vimeo)',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Onesha kwenye Ukurasa wa Mbele',
      type: 'boolean',
      initialValue: false,
      description: 'Ikiwa ndiyo, ushuda huu utaonekana kwenye nyumbani',
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
      subtitle: 'person',
      media: 'images.0',
    },
  },
})