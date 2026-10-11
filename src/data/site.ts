/**
 * Taalonafhankelijke gegevens over het bedrijf. De teksten staan per taal in
 * src/data/content/nl.ts en en.ts; die kies je via content(locale).
 */

export const site = {
  name: 'Scott Prins',
  legalName: 'Scott Prins Webdesign',
  url: 'https://scottprins.nl',
  email: 'scottprins32@gmail.com',
  /** Zakelijk nummer (Voys, 020), ook voor WhatsApp Business.
      Internationaal formaat zonder '+', voor wa.me- en tel-links. */
  whatsapp: '31202617143',
  whatsappDisplay: '+31 20 261 7143',
  /** Straat + huisnummer en postcode + plaats. Leeg = niet tonen.
      Het is een woonadres, geen bezoekadres: de footer zegt erbij dat Scott
      alleen online werkt, en de structured data noemt alleen de plaats.
      Wettelijk verplicht op de site (art. 3:15d BW) zolang dit het
      vestigingsadres is. */
  addressStreet: 'Orchideelaan 197',
  addressCity: '1171 MG Badhoevedorp',
} as const;
