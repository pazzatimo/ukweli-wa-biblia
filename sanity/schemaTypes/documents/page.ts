import { defineType, defineField } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
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
      name: 'pageBuilder',
      title: 'Page Content',
      type: 'array',
      of: [
        { type: 'object', name: 'heroBlock', title: 'Hero Block', fields: [
          defineField({ name: 'heading', type: 'string', title: 'Heading' }),
          defineField({ name: 'subheading', type: 'text', title: 'Subheading' }),
          defineField({ name: 'image', type: 'image', title: 'Background Image', options: { hotspot: true } }),
          defineField({ name: 'cta', type: 'cta', title: 'Call to Action' }),
        ]},
        { type: 'object', name: 'richTextBlock', title: 'Rich Text Block', fields: [
          defineField({ name: 'content', type: 'array', of: [{ type: 'block' }], title: 'Content' }),
        ]},
        { type: 'object', name: 'contentGridBlock', title: 'Content Grid', fields: [
          defineField({ name: 'title', type: 'string', title: 'Section Title' }),
          defineField({ name: 'items', type: 'array', of: [
            { type: 'reference', to: [{ type: 'article' }, { type: 'sermon' }] }
          ], title: 'Items' }),
        ]},
        { type: 'object', name: 'staffGridBlock', title: 'Staff Grid', fields: [
          defineField({ name: 'title', type: 'string', title: 'Section Title' }),
          defineField({ name: 'staff', type: 'array', of: [
            { type: 'reference', to: [{ type: 'person' }] }
          ], title: 'Staff Members' }),
        ]},
        { type: 'object', name: 'contactFormBlock', title: 'Contact Form Block', fields: [
          defineField({ name: 'heading', type: 'string', title: 'Heading' }),
          defineField({ name: 'introText', type: 'text', title: 'Intro Text' }),
        ]},
        { type: 'object', name: 'faqBlock', title: 'FAQ Block', fields: [
          defineField({ name: 'title', type: 'string', title: 'Section Title' }),
          defineField({ name: 'faqs', type: 'array', of: [
            { type: 'object', name: 'qa', fields: [
              defineField({ name: 'question', type: 'string', title: 'Question' }),
              defineField({ name: 'answer', type: 'text', title: 'Answer' }),
            ]}
          ], title: 'FAQ Items' }),
        ]},
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
      subtitle: 'slug.current',
    },
  },
})