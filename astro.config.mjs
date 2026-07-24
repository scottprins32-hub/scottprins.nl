// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static site + één serverless endpoint (/api/lead, zie `prerender = false` daar).
// De Vercel-adapter zorgt dat alleen die route een function wordt.
export default defineConfig({
  site: 'https://scottprins.nl',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
  build: {
    /*
     * De stylesheets zijn samen ~12 kB, maar kostten wél twee losse
     * render-blokkerende requests vóór de eerste paint (Lighthouse:
     * ~700 ms op mobiel). Inline zetten scheelt die hele round-trip;
     * bij twee pagina's weegt caching daar niet tegenop.
     */
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
