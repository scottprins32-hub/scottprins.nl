/**
 * Eén ingang voor alle zichtbare tekst.
 *
 *   .astro-frontmatter :  const { hero } = content(Astro.currentLocale);
 *   client-script      :  const { demoChatbot } = content();
 *
 * Zonder argument leest hij de taal van <html lang>, zodat een script in de
 * browser niet hoeft te weten op welke pagina het draait.
 */
import { nl } from './nl';
import { en } from './en';

export type Locale = 'nl' | 'en';
/** Nederlands is de standaard; /en/ is de vertaling. */
export const DEFAULT_LOCALE: Locale = 'nl';
export const LOCALES: Locale[] = ['nl', 'en'];

const bundels = { nl, en } as const;

/** Alles behalve 'nl' en 'en' valt terug op Nederlands. */
export function toLocale(value: string | undefined | null): Locale {
  return value === 'en' ? 'en' : 'nl';
}

export function content(locale?: string | null) {
  const gekozen =
    locale ?? (typeof document !== 'undefined' ? document.documentElement.lang : DEFAULT_LOCALE);
  return bundels[toLocale(gekozen)];
}

/** Pad naar dezelfde pagina in de andere taal. */
export function altPath(path: string, naar: Locale): string {
  const kaal = path.replace(/^\/en(?=\/|$)/, '') || '/';
  return naar === 'en' ? `/en${kaal === '/' ? '' : kaal}` || '/en' : kaal;
}
