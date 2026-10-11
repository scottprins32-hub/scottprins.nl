// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/*
 * Twee sporen (zie Scotts preview/release-afspraak):
 *
 *   productie  →  Vercel. Statische pagina's plus één serverless functie
 *                 (/api/lead, zie `prerender = false` daar).
 *   preview    →  GitHub Pages, met PREVIEW=1. Puur statisch, onder een
 *                 submap (/scottprins.nl/). Geen adapter, dus ook geen
 *                 /api/lead: het formulier valt daar terug op WhatsApp/mail.
 *
 * Alle interne links en assets lopen via `url()` uit src/lib/url.ts of via
 * Vite-imports, zodat dezelfde code onder / én onder /scottprins.nl/ werkt.
 */
const preview = process.env.PREVIEW === '1';
const base = preview ? (process.env.PREVIEW_BASE ?? '/scottprins.nl') : '/';

export default defineConfig({
  /* Nederlands is de standaardtaal en staat op /, Engels op /en/. */
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  site: 'https://scottprins.nl',
  base,
  trailingSlash: 'ignore',
  output: 'static',
  devToolbar: { enabled: false },
  /* De oude kapsalon-demo is opgegaan in de voorbeeldsites. Alleen in
     productie: de preview heeft een andere base en geen oude links. */
  redirects: preview ? {} : { '/demo/kapsalon': '/voorbeeld/kapper/' },
  adapter: preview ? undefined : vercel(),
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'nl', locales: { nl: 'nl-NL', en: 'en-NL' } },
      /* De voorbeeldsites zijn demo's met noindex: niet in de sitemap. */
      filter: (page) => !page.includes('/voorbeeld/'),
    }),
  ],
  build: {
    /* Alle CSS samen is klein; inline scheelt een render-blokkerende request
       vóór de eerste paint. */
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.PREVIEW': JSON.stringify(preview),
    },
  },
});
