import { defineType, defineField } from 'sanity'

export const scriptureRef = defineType({
  name: 'scriptureRef',
  title: 'Scripture Reference',
  type: 'object',
  fields: [
    defineField({
      name: 'book',
      title: 'Book',
      type: 'string',
      placeholder: 'e.g., Yohana, Warumi, Zaburi',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'chapter',
      title: 'Chapter',
      type: 'number',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'verseStart',
      title: 'Verse Start',
      type: 'number',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'verseEnd',
      title: 'Verse End (optional)',
      type: 'number',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'displayText',
      title: 'Display Text Override (optional)',
      type: 'string',
      description: 'Leave blank to auto-generate "Yohana 3:16" from the fields above',
    }),
  ],
  preview: {
    select: {
      book: 'book',
      chapter: 'chapter',
      start: 'verseStart',
      end: 'verseEnd',
    },
    prepare: ({ book, chapter, start, end }) => ({
      title: end ? `${book} ${chapter}:${start}-${end}` : `${book} ${chapter}:${start}`,
    }),
  },
})