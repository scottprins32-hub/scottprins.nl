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
  popular?: boolean;
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
    description: 'Eén sterke pagina die je zaak verkoopt.',
    upfront: 395,
    monthly: 19,
    includes: [
      'One-pager, perfect op mobiel',
      'Contactformulier + WhatsApp-knop',
      'Basis-SEO',
      'Hosting, domein & SSL geregeld',
    ],
  },
  {
    id: 'compleet',
    name: 'Compleet',
    description: 'Meerdere pagina’s, klaar om te groeien.',
    upfront: 745,
    monthly: 29,
    includes: [
      'Tot 5 pagina’s',
      'Alles uit Visitekaartje',
      'Koppeling met je Google Bedrijfsprofiel',
      'Statistieken',
    ],
    popular: true,
  },
  {
    id: 'interactief',
    name: 'Interactief',
    description: 'Voor zaken die online wérken.',
    upfront: 1195,
    monthly: 49,
    includes: [
      'Tot 10 pagina’s',
      'Alles uit Compleet',
      '2 add-ons naar keuze inbegrepen',
      'Prioriteit bij wijzigingen',
    ],
  },
];

export const addons: Addon[] = [
  {
    id: 'agenda',
    name: 'Online agenda',
    shortPitch: 'Klanten boeken zelf een afspraak.',
    upfront: 250,
    monthly: 15,
    demoSectionId: 'menu-agenda',
    popular: true,
  },
  {
    id: 'chatbot',
    name: 'AI-chatbot',
    shortPitch: 'Beantwoordt vragen, dag en nacht.',
    upfront: 295,
    monthly: 25,
    demoSectionId: 'menu-chatbot',
    popular: true,
  },
  {
    id: 'ai-telefonist',
    name: 'AI-telefonist',
    shortPitch: 'Neemt op als jij je handen vol hebt.',
    upfront: 395,
    monthly: 49,
    demoSectionId: null,
  },
  {
    id: 'bestellen',
    name: 'Eigen online bestellen',
    shortPitch: 'Bestellen via je eigen site — zonder platform-commissie.',
    upfront: 395,
    monthly: 29,
    demoSectionId: 'menu-bestellen',
  },
  {
    id: 'kaart',
    name: 'Interactieve kaart',
    shortPitch: 'Al je locaties, mooi op de kaart.',
    upfront: 95,
    monthly: 0,
    demoSectionId: 'menu-kaart',
  },
  {
    id: 'scrollvideo',
    name: 'Scroll-video / animaties',
    shortPitch: 'Die opening van deze site — voor jouw merk.',
    upfront: 245,
    monthly: 0,
    demoSectionId: 'menu-scrollvideo',
  },
  {
    id: 'intake',
    name: 'Digitale intake',
    shortPitch: 'Slim formulier in stappen.',
    upfront: 145,
    monthly: 0,
    demoSectionId: 'menu-intake',
  },
  {
    id: 'calculator',
    name: 'Prijscalculator',
    shortPitch: 'Klanten rekenen zelf hun prijs uit.',
    upfront: 195,
    monthly: 0,
    demoSectionId: 'menu-calculator',
  },
  {
    id: 'beforeafter',
    name: 'Before/after-slider',
    shortPitch: 'Laat het verschil zien.',
    upfront: 75,
    monthly: 0,
    demoSectionId: 'menu-beforeafter',
  },
  {
    id: 'reviews',
    name: 'Reviews-wall',
    shortPitch: 'Je Google-reviews, live op je site.',
    upfront: 75,
    monthly: 5,
    demoSectionId: 'menu-reviews',
    popular: true,
  },
  {
    id: 'meertalig',
    name: 'Meertalig',
    shortPitch: 'NL/EN met één klik.',
    upfront: 145,
    monthly: 0,
    demoSectionId: 'menu-meertalig',
  },
  {
    id: 'portaal',
    name: 'Klantenportaal',
    shortPitch: 'Documenten en facturen achter login.',
    upfront: 345,
    monthly: 15,
    demoSectionId: 'menu-portaal',
  },
  {
    id: 'cadeaubonnen',
    name: 'Cadeaubonnen',
    shortPitch: 'Verkoop bonnen, direct betaald.',
    upfront: 195,
    monthly: 10,
    demoSectionId: 'menu-cadeau',
  },
  {
    id: 'stempelkaart',
    name: 'Digitale stempelkaart',
    shortPitch: 'Klanten komen terug.',
    upfront: 195,
    monthly: 10,
    demoSectionId: 'menu-cadeau',
  },
  {
    id: 'sms',
    name: 'SMS-herinneringen',
    shortPitch: 'Minder no-shows.',
    upfront: 95,
    monthly: 10,
    demoSectionId: null,
  },
  {
    id: 'nieuwsbrief',
    name: 'Nieuwsbrief-koppeling',
    shortPitch: 'Blijf in beeld bij je klanten.',
    upfront: 145,
    monthly: 10,
    demoSectionId: null,
  },
];

export const carePlans: CarePlan[] = [
  {
    id: 'basis',
    name: 'Basis',
    description: 'Inbegrepen in je pakket.',
    upfrontDelta: 0,
    monthlyDelta: 0,
  },
  {
    id: 'plus',
    name: 'Plus',
    description: 'Maandelijkse wijzigingen + rapportage.',
    upfrontDelta: 0,
    monthlyDelta: 30,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Onbeperkt kleine wijzigingen, prioriteit.',
    upfrontDelta: 0,
    monthlyDelta: 70,
  },
];
