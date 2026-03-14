// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sanity({
    projectId: 'btt36vts',
    dataset: 'production',
    useCdn: false, // usa CDN só em produção pra economizar requests, falso em dev
    apiVersion: '2023-05-03',
  })]
});