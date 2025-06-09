import { CollectionConfig } from 'payload'

export const Request: CollectionConfig = {
  slug: 'requests',
//   access: {
//     read: () => true,
//     create: ({ req: { user } }) => user?.role === 'customer',
//   }

 fields: [
{name: 'requestNumber', type: 'text', required: true,},
{name:'photo', type:"text",required:true},
{name:'description',type:'richText'},
{name:'status',type:'select',options:[{label:'Pending',value:'pending'},{label:'In Progress',value:'in-progress'},{label:'Completed',value:'completed'},{label:'Cancelled',value:'cancelled'}],defaultValue:'pending'},
  ],
}