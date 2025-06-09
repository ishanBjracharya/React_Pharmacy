import { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    read: () => true, // Allow all users to read comments
    create: ({ req: { user } }) => !!user, // Allow authenticated users to create comments
  },
  admin: {
    useAsTitle: 'content',
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      label: 'Product',
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Author Name',
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Comment',
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: { readOnly: true },
      defaultValue: () => new Date().toISOString(),
    },
  ],
}