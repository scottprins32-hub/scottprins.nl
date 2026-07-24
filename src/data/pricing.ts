/**
 * ALLE prijzen van de site staan in dit bestand.
 * Prijs aanpassen = hier één getal wijzigen; de menukaart, de
 * configurator, de e-mail én de tests rekenen automatisch mee.
 *
 * Bedragen zijn in hele euro's: `upfront` = eenmalig, `monthly` = per maand.
 * Dit bestand heeft bewust géén imports: het wordt gebruikt door de
 * server (/api/lead), door Astro-frontmatter én door client-bundles.
 */

export type BasePackageId = 'visitekaartje' | 'compleet' | 'interactief';

export type AddonId =
  | 'agenda'
  | 'chatbot'
  | 'ai-telefonist'
  | 'bestellen'
  | 'kaart'
  | 'scrollvideo'
  | 'intake'
  | 'calculator'
  | 'beforeafter'
  | 'reviews'
  | 'meertalig'
  | 'portaal'
  | 'cadeaubonnen'
  | 'stempelkaart'
  | 'sms'
  | 'nieuwsbrief';

export type CarePlanId = 'basis' | 'plus' | 'premium';

export interface BasePackage {
  id: BasePackageId;
  name: string;
  description: string;
  upfront: number;
  monthly: number;
  includes: string[];
}

export interface Addon {
  id: AddonId;
  name: string;
  shortPitch: string;
  upfront: number;
  monthly: number;
  /** Sectie-id van de live demo op de menukaart; null = geen demo-sectie. */
  demoSectionId: string | null;
  popular?: boolean;
}

export interface CarePlan {
  id: CarePlanId;
  name: string;
  description: string;
  /** Altijd 0 — care-plans kosten niets eenmalig, veld bestaat voor de volledigheid. */
  upfrontDelta: number;
  /** Opslag bovenop het maandbedrag van het gekozen basispakket. */
  monthlyDelta: number;
}

export const basePackages: BasePackage[] = [
  {
    id: 'visitekaartje',
    name: 'Visitekaartje',
    description: 'Eén krachtige pagina die je zaak professioneel neerzet.',
    upfront: 395,
    monthly: 19,
    includes: [
      'Eén pagina, perfect op mobiel',
      'Contactformulier + WhatsApp-knop',
      'Google Maps & routebeschrijving',
      'Razendsnel en vindbaar (basis-SEO)',
      'Hosting, domein & SSL geregeld',
    ],
  },
  {
    id: 'compleet',
    name: 'Compleet',
    description: 'Meerdere pagina’s met alles wat een groeiend bedrijf nodig heeft.',
    upfront: 745,
    monthly: 29,
    includes: [
      'Tot 5 pagina’s',
      'Alles uit Visitekaartje',
      'Blog of nieuwsberichten',
      'Uitgebreide SEO per pagina',
      'Koppeling met je Google Bedrijfsprofiel',
    ],
  },
  {
    id: 'interactief',
    name: 'Interactief',
    description: 'Een website die werk uit handen neemt: boekingen, aanvragen, meer.',
    upfront: 1195,
    monthly: 49,
    includes: [
      'Tot 10 pagina’s',
      'Alles uit Compleet',
      'Eén interactieve module naar keuze inbegrepen',
      'Maatwerk-animaties',
      'Voorrang bij wijzigingen',
    ],
  },
];

export const addons: Addon[] = [
  {
    id: 'agenda',
    name: 'Online agenda',
    shortPitch: 'Klanten boeken zelf een afspraak — jij houdt je agenda over.',
    upfront: 250,
    monthly: 15,
    demoSectionId: 'menu-agenda',
    popular: true,
  },
  {
    id: 'chatbot',
    name: 'AI-chatbot',
    shortPitch: 'Beantwoordt vragen 24/7, getraind op jouw zaak.',
    upfront: 295,
    monthly: 25,
    demoSectionId: 'menu-chatbot',
    popular: true,
  },
  {
    id: 'ai-telefonist',
    name: 'AI-telefonist',
    shortPitch: 'Neemt op als jij niet kunt, spreekt Nederlands en maakt notities.',
    upfront: 395,
    monthly: 49,
    demoSectionId: null,
  },
  {
    id: 'bestellen',
    name: 'Eigen online bestellen',
    shortPitch: 'Bestellingen via je eigen site — zonder platform-commissie.',
    upfront: 395,
    monthly: 29,
    demoSectionId: 'menu-bestellen',
  },
  {
    id: 'kaart',
    name: 'Interactieve kaart',
    shortPitch: 'Al je locaties op een stijlvolle kaart met routeknop.',
    upfront: 95,
    monthly: 0,
    demoSectionId: 'menu-kaart',
  },
  {
    id: 'scrollvideo',
    name: 'Scroll-video / animaties',
    shortPitch: 'De opening van deze site — maar dan voor jouw merk.',
    upfront: 245,
    monthly: 0,
    demoSectionId: 'menu-scrollvideo',
  },
  {
    id: 'intake',
    name: 'Digitale intake',
    shortPitch: 'Nieuwe klanten vullen alles vooraf in — jij begint voorbereid.',
    upfront: 145,
    monthly: 0,
    demoSectionId: 'menu-intake',
  },
  {
    id: 'calculator',
    name: 'Prijscalculator',
    shortPitch: 'Bezoekers rekenen zelf hun prijs uit — jij krijgt warme leads.',
    upfront: 195,
    monthly: 0,
    demoSectionId: 'menu-calculator',
  },
  {
    id: 'beforeafter',
    name: 'Before/after-slider',
    shortPitch: 'Laat je resultaat zien met één veegbeweging.',
    upfront: 75,
    monthly: 0,
    demoSectionId: 'menu-beforeafter',
  },
  {
    id: 'reviews',
    name: 'Reviews-wall',
    shortPitch: 'Je Google-reviews automatisch en stijlvol in beeld.',
    upfront: 75,
    monthly: 5,
    demoSectionId: 'menu-reviews',
    popular: true,
  },
  {
    id: 'meertalig',
    name: 'Meertalig',
    shortPitch: 'Je site in meerdere talen, netjes en vindbaar geregeld.',
    upfront: 145,
    monthly: 0,
    demoSectionId: 'menu-meertalig',
  },
  {
    id: 'portaal',
    name: 'Klantenportaal',
    shortPitch: 'Documenten, afspraken en facturen achter een eigen login.',
    upfront: 345,
    monthly: 15,
    demoSectionId: 'menu-portaal',
  },
  {
    id: 'cadeaubonnen',
    name: 'Cadeaubonnen',
    shortPitch: 'Verkoop digitale bonnen rechtstreeks vanaf je site.',
    upfront: 195,
    monthly: 10,
    demoSectionId: 'menu-cadeau',
  },
  {
    id: 'stempelkaart',
    name: 'Digitale stempelkaart',
    shortPitch: 'Vaste klanten belonen — zonder papieren kaartjes.',
    upfront: 195,
    monthly: 10,
    demoSectionId: 'menu-cadeau',
  },
  {
    id: 'sms',
    name: 'SMS-herinneringen',
    shortPitch: 'Minder no-shows door automatische afspraak-reminders.',
    upfront: 95,
    monthly: 10,
    demoSectionId: null,
  },
  {
    id: 'nieuwsbrief',
    name: 'Nieuwsbrief-koppeling',
    shortPitch: 'Inschrijvingen rechtstreeks in je maillijst.',
    upfront: 145,
    monthly: 10,
    demoSectionId: null,
  },
];

export const carePlans: CarePlan[] = [
  {
    id: 'basis',
    name: 'Basis',
    description: 'Hosting, updates & support — zit al bij je pakket in.',
    upfrontDelta: 0,
    monthlyDelta: 0,
  },
  {
    id: 'plus',
    name: 'Plus',
    description: 'Elke maand kleine wijzigingen + voorrang bij vragen.',
    upfrontDelta: 0,
    monthlyDelta: 30,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Doorlopend verbeteren, rapportage & onbeperkt kleine wijzigingen.',
    upfrontDelta: 0,
    monthlyDelta: 70,
  },
];
