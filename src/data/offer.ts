/**
 * Het aanbod in getallen. Eén bron: de prijs op de pagina, de bestelbon,
 * de structured data en de mails lezen allemaal hieruit.
 *
 * Prijzen zijn exclusief 21% btw; het aanbod is alleen voor bedrijven.
 */
export const offer = {
  /** Een complete website, eenmalig. */
  price: 500,
  currency: 'EUR',
  /** Helft bij de start, helft bij oplevering (zie de voorwaarden). */
  depositShare: 0.5,
  revisionRounds: 2,
  /** Werkdagen van compleet materiaal tot live. */
  deliveryDays: 5,
  /** Reactietijd op een aanvraag, en de termijn voor de gratis proefpagina. */
  responseHours: 48,
  /** Btw-tarief; alle prijzen op de site zijn exclusief. */
  vatRate: 0.21,
  /** Optioneel onderhoud per maand; maandelijks opzegbaar. */
  care: [
    { id: 'plus', monthly: 19 },
    { id: 'premium', monthly: 39 },
  ],
} as const;

export type CarePlanId = (typeof offer.care)[number]['id'];
