import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'customer',
      options: [
        { label: 'Customer', value: 'customer' },
        { label: 'Pharmacist', value: 'pharmacist' },
        { label: 'Admin', value: 'admin' },
      ],
    },
    // Email added by default
    // Add more fields as needed
  ],
}
