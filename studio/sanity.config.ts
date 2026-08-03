import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Instituto Hub',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'btt36vts',
  dataset: 'production',

  plugins: [structureTool({structure})],

  schema: {
    types: schemaTypes,
  },
})
