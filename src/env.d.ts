/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** true in de GitHub Pages-preview (PREVIEW=1), zie astro.config.mjs. */
  readonly PREVIEW: boolean;
}
