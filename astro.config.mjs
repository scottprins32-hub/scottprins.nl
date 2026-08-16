// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static site + één serverless endpoint (/api/lead, zie `prerender = false` daar).
// De Vercel-adapter zorgt dat alleen die route een function wordt.
export default defineConfig({
  /* Nederlands is de standaardtaal en staat op /, Engels op /en/.
     prefixDefaultLocale: false houdt de bestaande NL-urls dus intact. */
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  site: 'https://scottprins.nl',
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({ i18n: { defaultLocale: 'nl', locales: { nl: 'nl-NL', en: 'en-NL' } } }),
    /* De twee grote chunks worden pas na twee hops ontdekt (html → component-
       script → chunk). Een modulepreload haalt ze meteen op. De namen zijn
       gehasht, dus we lezen ze na de build uit de map. */
    {
      name: 'modulepreload-hoisted',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const fs = await import('node:fs/promises');
          /* `dir` wijst al naar dist/client/, niet naar dist/. */
          const map = new URL('_astro/', dir);
          const files = await fs.readdir(map);
          const groot = files.filter((f) => /^(scene-timeline|index)\.[^.]+\.js$/.test(f));
          if (groot.length !== 2) {
            console.warn('modulepreload-hoisted: chunknamen gewijzigd, niets geinjecteerd');
            return;
          }
          const tags = groot.map((f) => `<link rel="modulepreload" href="/_astro/${f}">`).join('');
          for (const pagina of ['index.html', 'en/index.html']) {
            const url = new URL(pagina, dir);
            try {
              const html = await fs.readFile(url, 'utf8');
              await fs.writeFile(url, html.replace('</head>', `${tags}</head>`));
            } catch {
              /* pagina bestaat niet in deze build */
            }
          }
        },
      },
    },
  ],
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
