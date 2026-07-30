/**
 * Taalonafhankelijke gegevens over het bedrijf. De teksten staan per taal in
 * src/data/content/nl.ts en en.ts; die kies je via content(locale).
 */

export const site = {
  name: 'Scott Prins',
  legalName: 'Scott Prins Webdesign',
  url: 'https://scottprins.nl',
  email: 'scottprins32@gmail.com',
  /** Internationaal formaat zonder '+', voor wa.me-links. */
  whatsapp: '31619900444',
  whatsappDisplay: '+31 6 19 90 04 44',
} as const;
