import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {noteField} from 'sanity-plugin-note-field'
import {media} from 'sanity-plugin-media'

import {schemaTypes} from './schemas/schema'
import {structure} from './deskStructure'
import {newDocumentStructure} from './docStructure'
import {Logo} from './branding/logo'
import {LoadingScreen} from './branding/loader'
import customTheme from './branding/skin'
import {resolveDocumentActions} from './parts/resolve-actions'
import {resolveDocumentBadges} from './parts/resolve-badges'
import {resolveInput} from './parts/resolve-input'

export default defineConfig({
  name: 'HULL',
  projectId: '1j95c3s0',
  dataset: 'production',
  plugins: [
    structureTool({
      structure,
    }),
    colorInput(),
    vercelDeployTool(),
    noteField(),
    media(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: newDocumentStructure,
    actions: resolveDocumentActions,
    badges: resolveDocumentBadges,
  },
  form: {
    input: resolveInput,
  },
  studio: {
    components: {
      logo: Logo,
      loadingScreen: LoadingScreen,
    },
  },
  theme: customTheme,
  basePath: '/studio',
})