/**
 * Responsive beelden zonder Astro: de WebP-versies maakt scripts/make-images.py
 * vooraf, Vite geeft ze een gehashte URL. <Img name="scott" ... /> zet daar
 * srcset, sizes, width en height van.
 */
import manifest from '@/assets/gen/manifest.json';

const files = import.meta.glob('../assets/gen/*.webp', { eager: true, query: '?url', import: 'default' });

export function imageSet(name) {
  const entry = manifest[name];
  if (!entry) throw new Error(`Onbekend beeld: ${name}`);
  const urls = entry.widths.map((w) => [w, files[`../assets/gen/${name}-${w}.webp`]]);
  return {
    src: urls[urls.length - 1][1],
    srcSet: urls.map(([w, u]) => `${u} ${w}w`).join(', '),
    width: entry.width,
    height: entry.height,
  };
}
