/**
 * Geldnotatie — per taal, want daar verschilt hij écht:
 *   nl: € 1.195 · € 29 p/m · € 95 eenmalig
 *   en: €1,195 · €29/mo · €95 one-off
 *
 * Bewust géén import uit data/content: dit bestand zit in vrijwel elke
 * client-bundle, en die hoeft niet allebei de taalpakketten mee te slepen
 * voor drie woorden. In Astro-frontmatter geef je de taal expliciet mee;
 * in een browser-script wordt hij van <html lang> gelezen.
 */
export type Taal = 'nl' | 'en';

const formatters: Record<Taal, Intl.NumberFormat> = {
  nl: new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
  en: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
};

const woorden = {
  nl: { perMaand: ' p/m', eenmalig: ' eenmalig', inbegrepen: 'inbegrepen' },
  en: { perMaand: '/mo', eenmalig: ' one-off', inbegrepen: 'included' },
} as const;

/** De taal van de pagina waar deze code op draait. */
export function huidigeTaal(): Taal {
  return typeof document !== 'undefined' && document.documentElement.lang === 'en' ? 'en' : 'nl';
}

export function eur(amount: number, taal: Taal = huidigeTaal()): string {
  return formatters[taal].format(amount);
}

/** " p/m" of "/mo" — het achtervoegsel achter een maandbedrag. */
export function perMaand(taal: Taal = huidigeTaal()): string {
  return woorden[taal].perMaand;
}

/** "inbegrepen" of "included". */
export function inbegrepen(taal: Taal = huidigeTaal()): string {
  return woorden[taal].inbegrepen;
}

/** "€ 29 p/m" — of "—" wanneer er geen maandbedrag is. */
export function eurPerMonth(amount: number, taal: Taal = huidigeTaal()): string {
  return amount > 0 ? `${eur(amount, taal)}${perMaand(taal)}` : '—';
}

/** Compacte prijsregel voor kaarten: "€ 250 + € 15 p/m" of "€ 95 eenmalig". */
export function priceLine(upfront: number, monthly: number, taal: Taal = huidigeTaal()): string {
  return monthly > 0
    ? `${eur(upfront, taal)} + ${eur(monthly, taal)}${perMaand(taal)}`
    : `${eur(upfront, taal)}${woorden[taal].eenmalig}`;
}
