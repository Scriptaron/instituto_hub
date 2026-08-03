import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'admin-instituto-hub',
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'btt36vts',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
