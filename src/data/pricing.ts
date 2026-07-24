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
  /**
   * Add-ons die bij dit pakket GRATIS inbegrepen zijn: ze kosten dan
   * € 0 eenmalig én € 0 per maand. calcTotals en de hele UI rekenen
   * hier automatisch mee — hier een id toevoegen is genoeg.
   */
  includedAddons: AddonId[];
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
    // Bewuste afwijking van de design-system-kaart: "WhatsApp-knop" en de
    // hosting-regel staan hier extra, omdat de configurator (anders dan het
    // geprinte prijsoverzicht met z'n FAQ) zelf moet uitleggen wat het
    // maandbedrag dekt.
    includes: [
      'One-pager, perfect op mobiel',
      'Contactformulier + WhatsApp-knop',
      'Basis-SEO',
      'Hosting, domein & SSL geregeld',
    ],
    includedAddons: [],
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
    includedAddons: ['meertalig', 'beforeafter'],
    popular: true,
  },
  {
    id: 'interactief',
    name: 'Interactief',
    description: 'Voor zaken die online wérken.',
    upfront: 1195,
    monthly: 49,
    includes: [
      'Alles uit Compleet',
      'Prioriteit bij wijzigingen',
    ],
    includedAddons: ['meertalig', 'beforeafter', 'kaart', 'intake', 'reviews'],
  },
];

export const addons: Addon[] = [
  {
    id: 'agenda',
    name: 'Online agenda',
    shortPitch: 'Klanten boeken zelf een afspraak.',
    upfront: 195,
    monthly: 15,
    demoSectionId: 'menu-agenda',
    popular: true,
  },
  {
    id: 'chatbot',
    name: 'AI-chatbot',
    shortPitch: 'Beantwoordt vragen, dag en nacht.',
    upfront: 245,
    monthly: 25,
    demoSectionId: 'menu-chatbot',
    popular: true,
  },
  {
    id: 'ai-telefonist',
    name: 'AI-telefonist',
    shortPitch: 'Neemt op als jij je handen vol hebt.',
    upfront: 345,
    monthly: 49,
    demoSectionId: null,
  },
  {
    id: 'bestellen',
    name: 'Eigen online bestellen',
    shortPitch: 'Zonder platform-commissie.',
    upfront: 345,
    monthly: 29,
    demoSectionId: 'menu-bestellen',
  },
  {
    id: 'kaart',
    name: 'Interactieve kaart',
    shortPitch: 'Al je locaties, mooi op de kaart.',
    upfront: 75,
    monthly: 0,
    demoSectionId: 'menu-kaart',
  },
  {
    id: 'scrollvideo',
    name: 'Scroll-video / animaties',
    shortPitch: 'Die opening van deze site.',
    upfront: 195,
    monthly: 0,
    demoSectionId: 'menu-scrollvideo',
  },
  {
    id: 'intake',
    name: 'Digitale intake',
    shortPitch: 'Slim formulier in stappen.',
    upfront: 95,
    monthly: 0,
    demoSectionId: 'menu-intake',
  },
  {
    id: 'calculator',
    name: 'Prijscalculator',
    shortPitch: 'Klanten rekenen zelf hun prijs uit.',
    upfront: 145,
    monthly: 0,
    demoSectionId: 'menu-calculator',
  },
  {
    id: 'beforeafter',
    name: 'Before/after-slider',
    shortPitch: 'Laat het verschil zien.',
    upfront: 45,
    monthly: 0,
    demoSectionId: 'menu-beforeafter',
  },
  {
    id: 'reviews',
    name: 'Reviews-wall',
    shortPitch: 'Je Google-reviews, live op je site.',
    upfront: 45,
    monthly: 5,
    demoSectionId: 'menu-reviews',
    popular: true,
  },
  {
    id: 'meertalig',
    name: 'Meertalig',
    shortPitch: 'NL/EN met één klik.',
    upfront: 95,
    monthly: 0,
    demoSectionId: 'menu-meertalig',
  },
  {
    id: 'portaal',
    name: 'Klantenportaal',
    shortPitch: 'Documenten en facturen achter login.',
    upfront: 295,
    monthly: 15,
    demoSectionId: 'menu-portaal',
  },
  {
    id: 'cadeaubonnen',
    name: 'Cadeaubonnen & stempelkaart',
    shortPitch: 'Verkoop bonnen én laat klanten terugkomen.',
    upfront: 245,
    monthly: 10,
    demoSectionId: 'menu-cadeau',
  },
  {
    id: 'sms',
    name: 'SMS-herinneringen',
    shortPitch: 'Minder no-shows.',
    upfront: 75,
    monthly: 10,
    demoSectionId: null,
  },
  {
    id: 'nieuwsbrief',
    name: 'Nieuwsbrief',
    shortPitch: 'Blijf in beeld bij je klanten.',
    upfront: 95,
    monthly: 10,
    demoSectionId: null,
  },
];

/**
 * Snelstart per vak. Eén tik zet een compleet, verdedigbaar voorstel klaar
 * in de configurator — de bezoeker hoeft niet zelf 15 opties af te wegen.
 * Pas gerust aan: hier staat alleen wélke opties, de prijzen komen
 * automatisch uit `addons` hierboven.
 */
export interface Preset {
  id: string;
  /** Hoe de bezoeker zichzelf noemt: "Ik heb een kapsalon". */
  label: string;
  icon: string;
  base: BasePackageId;
  addons: AddonId[];
}

export const presets: Preset[] = [
  {
    id: 'salon',
    label: 'Kapsalon of schoonheidssalon',
    icon: '💇',
    base: 'compleet',
    addons: ['agenda', 'reviews', 'sms', 'cadeaubonnen'],
  },
  {
    id: 'horeca',
    label: 'Restaurant, café of bezorging',
    icon: '🍕',
    base: 'interactief',
    addons: ['bestellen', 'kaart', 'reviews', 'meertalig'],
  },
  {
    id: 'klus',
    label: 'Klus-, bouw- of hoveniersbedrijf',
    icon: '🔧',
    base: 'compleet',
    addons: ['calculator', 'beforeafter', 'intake'],
  },
  {
    id: 'praktijk',
    label: 'Praktijk of behandelaar',
    icon: '🩺',
    base: 'interactief',
    addons: ['agenda', 'intake', 'portaal', 'sms'],
  },
  {
    id: 'winkel',
    label: 'Winkel of showroom',
    icon: '🛍️',
    base: 'compleet',
    addons: ['kaart', 'reviews', 'cadeaubonnen', 'nieuwsbrief'],
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
