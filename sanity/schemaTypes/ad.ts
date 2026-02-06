import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ad',
  title: 'Ad Unit',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Active Status',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'priority',
      title: 'Priority (1-10)',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.min(1).max(10),
    }),
    defineField({
      name: 'placement',
      title: 'Placement',
      type: 'string',
      options: {
        list: [
          { title: 'Sidebar', value: 'sidebar' },
          { title: 'Banner (In-Feed)', value: 'banner' },
          { title: 'Footer', value: 'footer' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Target Category',
      type: 'string',
      description: 'Which content category triggers this ad?',
      options: {
        list: [
          { title: 'Global (All)', value: 'global' },
          { title: 'Tech', value: 'tech' },
          { title: 'Lifestyle', value: 'lifestyle' },
        ],
      },
      initialValue: 'global',
    }),
    defineField({
      name: 'type',
      title: 'Ad Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Code / Script', value: 'code' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    // CONDITIONAL FIELDS
    defineField({
      name: 'image',
      title: 'Ad Creative',
      type: 'image',
      hidden: ({ document }) => document?.type !== 'image',
    }),
    defineField({
      name: 'link',
      title: 'Destination URL (Affiliate)',
      type: 'url',
      hidden: ({ document }) => document?.type !== 'image',
    }),
    defineField({
      name: 'code',
      title: 'Custom HTML/JS',
      type: 'text',
      hidden: ({ document }) => document?.type !== 'code',
    }),
  ],
})