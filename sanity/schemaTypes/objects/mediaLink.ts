import { defineType, defineField } from 'sanity'

export const mediaLink = defineType({
  name: 'mediaLink',
  title: 'Media Link',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Audio (upload to Sanity)', value: 'audio' },
          { title: 'Video (upload to Sanity)', value: 'video' },
          { title: 'YouTube (external link)', value: 'youtube' },
          { title: 'External URL (SoundCloud, etc.)', value: 'external' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Audio / Video File',
      type: 'file',
      description: 'Upload audio (MP3) or video (MP4) directly to Sanity',
      options: {
        accept: 'audio/*, video/*',
      },
      hidden: ({ parent }) => parent?.type === 'youtube' || parent?.type === 'external',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'e.g., https://www.youtube.com/watch?v=...',
      hidden: ({ parent }) => parent?.type !== 'youtube',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'e.g., SoundCloud, Vimeo, or any other embed link',
      hidden: ({ parent }) => parent?.type !== 'external',
    }),
    defineField({
      name: 'duration',
      title: 'Duration (optional)',
      type: 'string',
      placeholder: 'e.g., 45:20',
    }),
  ],
  preview: {
    select: {
      type: 'type',
      file: 'file.asset.originalFilename',
      url: 'youtubeUrl',
    },
    prepare: ({ type, file, url }) => ({
      title: type ? `${type.toUpperCase()}: ${file || url || 'Media'}` : 'Media',
    }),
  },
})