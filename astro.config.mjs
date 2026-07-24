// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// Static site + één serverless endpoint (/api/lead, zie `prerender = false` daar).
// De Vercel-adapter zorgt dat alleen die route een function wordt.
export default defineConfig({
  site: 'https://scottprins.nl',
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
