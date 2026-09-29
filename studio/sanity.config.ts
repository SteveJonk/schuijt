import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {SINGLETON_TYPES, schemaTypes} from './schemaTypes'
import {structure} from './structure'

/**
 * Project id and dataset come from the environment so the studio and the app
 * can share one project. Copy `.env.example` to `.env` before `npm run dev`.
 * Sanity exposes only `SANITY_STUDIO_*` variables to the studio bundle.
 */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId) {
  throw new Error(
    'Missing SANITY_STUDIO_PROJECT_ID. Copy studio/.env.example to studio/.env and fill it in.',
  )
}

const SERVICE_KINDS = {dienst: 'Dienst', lokaal: 'Lokale pagina', zakelijk: 'Zakelijke pagina'}

export default defineConfig({
  name: 'default',
  title: process.env.SANITY_STUDIO_TITLE || 'Schuijt Klussenbedrijf',

  projectId,
  dataset,

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) => [
      // Singletons are opened from the menu, never created from "+".
      ...templates.filter(({schemaType}) => !SINGLETON_TYPES.includes(schemaType)),
      ...Object.entries(SERVICE_KINDS).map(([kind, title]) => ({
        id: `servicePage-${kind}`,
        title,
        schemaType: 'servicePage',
        value: {kind},
      })),
    ],
  },

  document: {
    // A singleton can be edited and published, not deleted or duplicated.
    actions: (actions, {schemaType}) =>
      SINGLETON_TYPES.includes(schemaType)
        ? actions.filter(({action}) => !['delete', 'duplicate', 'unpublish'].includes(action ?? ''))
        : actions,
  },
})
