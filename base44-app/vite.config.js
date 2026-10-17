import base44 from '@base44/vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

/*
 * Base44 bouwt dit met `npm run build` (zie base44/config.jsonc) en serveert
 * dist/ als single-page app. PREVIEW=1 bouwt dezelfde site voor de
 * GitHub Pages-preview onder /scottprins.nl/, zonder de Base44-plugin.
 */
const preview = process.env.PREVIEW === '1';

export default defineConfig({
  base: preview ? (process.env.PREVIEW_BASE ?? '/scottprins.nl/') : '/',
  logLevel: 'error',
  plugins: [
    ...(preview
      ? []
      : [
          base44({
            legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
            hmrNotifier: true,
            navigationNotifier: true,
            /* Uit: de privacyverklaring belooft geen analytics. */
            analyticsTracker: false,
            visualEditAgent: true,
          }),
        ]),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  define: {
    'import.meta.env.PREVIEW': JSON.stringify(preview),
  },
});
