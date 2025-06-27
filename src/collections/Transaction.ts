import { CollectionConfig } from 'payload'

export const Transaction: CollectionConfig = {
  slug: 'transactions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'total', 'status', 'deliveryDate', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'email',
      label: 'Customer Email',
      type: 'email',
      required: true,
    },
    {
      name: 'cart',
      label: 'Cart Items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'productId',
          label: 'Product ID',
          type: 'text',
          required: true,
        },
        {
          name: 'name',
          label: 'Product Name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          label: 'Price',
          type: 'number',
          required: true,
        },
        {
          name: 'quantity',
          label: 'Quantity',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'total',
      label: 'Total Amount',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      label: 'Order Status',
      type: 'select',
      required: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'deliveryDate',
      label: 'Delivery Date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
}
