import { CollectionConfig } from 'payload'

export const Product: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'brand',
      type: 'text',
      required: false,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'inStock',
      type: 'number',
      required: true,
      min: 0,
      label: 'Stock Quantity',
    },
    {
      name: 'sku',
      type: 'text',
      required: false,
      label: 'SKU',
    },
    {
      name: 'prescriptionRequired',
      type: 'checkbox',
      label: 'Prescription Required',
      required: true,
      defaultValue: false,
    },
    {
      name: 'expiryDate',
      type: 'date',
      required: false,
      label: 'Expiry Date',
    },
    {
      name: 'dosageForm',
      type: 'text',
      required: false,
      label: 'Dosage Form',
    },
    {
      name: 'strength',
      type: 'text',
      required: false,
      label: 'Strength',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'category',
      type: 'text',
      required: false,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Product',
      defaultValue: false,
    },
  ],
}