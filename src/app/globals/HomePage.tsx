import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Homepage Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
      label: 'Subtitle',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Hero Image',
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
      label: 'Main Content',
    },
  ],
}