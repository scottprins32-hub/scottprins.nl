/**
 * Na `vite build`. Base44 serveert dist/ als single-page app en vangt zelf
 * elk pad op. Voor de GitHub Pages-preview (PREVIEW=1) doen we dat hier:
 * een kopie van index.html op elk bekend pad (zodat die met status 200
 * laden) en als 404.html voor de rest.
 */
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';

/* Houd gelijk met src/App.jsx, src/data/trade-ids.ts en content/branches.ts. */
const TRADES = ['bakker', 'kapper', 'restaurant', 'bouw', 'praktijk', 'sport'];
const PAGES = ['privacy', 'voorwaarden', 'website-laten-maken-fysiotherapie', ...TRADES.map((t) => `voorbeeld/${t}`)];

if (process.env.PREVIEW === '1') {
  const paths = ['en', ...PAGES, ...PAGES.map((p) => `en/${p}`)];
  for (const p of paths) {
    mkdirSync(`dist/${p}`, { recursive: true });
    copyFileSync('dist/index.html', `dist/${p}/index.html`);
  }
  copyFileSync('dist/index.html', 'dist/404.html');
  writeFileSync('dist/.nojekyll', '');
  console.log(`preview: ${paths.length} paden, 404.html en .nojekyll gezet`);
}
