// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sanity from '@sanity/astro';

import netlify from '@astrojs/netlify';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://instituto-hub.netlify.app',
  output: 'server',
  adapter: netlify(),
  devToolbar: {
    enabled: false
  },
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'clean-sanity-optimize-deps',
        configResolved(config) {
          if (config.optimizeDeps?.include) {
            const toRemove = [
              'react-compiler-runtime',
              'react-is',
              'styled-components',
              'lodash/startCase.js'
            ];
            config.optimizeDeps.include = config.optimizeDeps.include.filter(
              dep => !toRemove.includes(dep)
            );
          }
        }
      }
    ]
  },
  integrations: [
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'btt36vts',
      dataset: 'production',
      useCdn: process.env.NODE_ENV === 'production',
      apiVersion: '2023-05-03',
    }),
    sitemap()
  ]
});