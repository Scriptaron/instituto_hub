// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sanity from '@sanity/astro';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sanity({
    projectId: 'btt36vts',
    dataset: 'production',
    useCdn: process.env.NODE_ENV === 'production',
    apiVersion: '2023-05-03',
  })]
});