import { CollectionConfig } from 'payload'

export const Request: CollectionConfig = {
  slug: 'requests',
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    { name: 'requestName', type: 'text', required: true },
    { name: 'photo', type: 'text', required: true },
    { name: 'description1', type: 'richText', hidden: true },
    { name: 'description', type: 'text', required: true },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
    },
  ],
}
