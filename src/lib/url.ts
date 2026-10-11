/**
 * Base-bewuste paden. In productie staat de site op `/`, in de GitHub
 * Pages-preview op `/scottprins.nl/`. Elk intern pad loopt hierdoorheen,
 * zodat geen enkele link of asset in de preview naar de verkeerde plek wijst.
 */
const BASE = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');

/** `url('/privacy/')` → `/privacy/` of `/scottprins.nl/privacy/`. */
export function url(path = '/'): string {
  if (/^(?:[a-z]+:|#|\/\/)/i.test(path)) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${p}` || '/';
}

/** Haalt de base weer van een pad af, bijv. `Astro.url.pathname`. */
export function stripBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) return pathname.slice(BASE.length) || '/';
  return pathname || '/';
}
