import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  name: 'hoa-chat-hai-van',
  title: 'Hoa Chat Hai Van - Quan Tri',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      name: 'studio',
      title: 'Quan Tri Noi Dung',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
