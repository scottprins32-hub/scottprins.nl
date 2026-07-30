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
    name: 'One-Pager',
    description: 'One strong page that sells your business.',
    upfront: 395,
    monthly: 19,
    // Bewuste afwijking van de design-system-kaart: "WhatsApp-knop" en de
    // hosting-regel staan hier extra, omdat de configurator (anders dan het
    // geprinte prijsoverzicht met z'n FAQ) zelf moet uitleggen wat het
    // maandbedrag dekt.
    includes: [
      'One page, perfect on mobile',
      'Contact form + WhatsApp button',
      'Basic SEO',
      'Hosting, domain & SSL sorted',
    ],
    includedAddons: [],
  },
  {
    id: 'compleet',
    name: 'Complete',
    description: 'Several pages, ready to grow.',
    upfront: 745,
    monthly: 29,
    includes: [
      'Up to 5 pages',
      'Everything in One-Pager',
      'Linked to your Google Business Profile',
      'Visitor stats',
    ],
    includedAddons: ['meertalig', 'beforeafter'],
    popular: true,
  },
  {
    id: 'interactief',
    name: 'Interactive',
    description: 'For businesses that really work online.',
    upfront: 1195,
    monthly: 49,
    includes: [
      'Everything in Complete',
      'Priority on changes',
    ],
    includedAddons: ['meertalig', 'beforeafter', 'kaart', 'intake', 'reviews'],
  },
];

export const addons: Addon[] = [
  {
    id: 'agenda',
    name: 'Online booking',
    shortPitch: 'Customers book their own appointment.',
    upfront: 195,
    monthly: 15,
    demoSectionId: 'menu-agenda',
    popular: true,
  },
  {
    id: 'chatbot',
    name: 'AI chatbot',
    shortPitch: 'Answers questions, day and night.',
    upfront: 245,
    monthly: 25,
    demoSectionId: 'menu-chatbot',
    popular: true,
  },
  {
    id: 'ai-telefonist',
    name: 'AI phone assistant',
    shortPitch: 'Picks up when your hands are full.',
    upfront: 345,
    monthly: 49,
    demoSectionId: null,
  },
  {
    id: 'bestellen',
    name: 'Your own online ordering',
    shortPitch: 'No platform commission.',
    upfront: 345,
    monthly: 29,
    demoSectionId: 'menu-bestellen',
  },
  {
    id: 'kaart',
    name: 'Interactive map',
    shortPitch: 'All your locations, neatly on the map.',
    upfront: 75,
    monthly: 0,
    demoSectionId: 'menu-kaart',
  },
  {
    id: 'scrollvideo',
    name: 'Scroll video & animation',
    shortPitch: 'That opening on this site.',
    upfront: 195,
    monthly: 0,
    demoSectionId: 'menu-scrollvideo',
  },
  {
    id: 'intake',
    name: 'Digital intake form',
    shortPitch: 'Smart form, step by step.',
    upfront: 95,
    monthly: 0,
    demoSectionId: 'menu-intake',
  },
  {
    id: 'calculator',
    name: 'Price calculator',
    shortPitch: 'Customers work out their own price.',
    upfront: 145,
    monthly: 0,
    demoSectionId: 'menu-calculator',
  },
  {
    id: 'beforeafter',
    name: 'Before/after slider',
    shortPitch: 'Show the difference.',
    upfront: 45,
    monthly: 0,
    demoSectionId: 'menu-beforeafter',
  },
  {
    id: 'reviews',
    name: 'Reviews wall',
    shortPitch: 'Your Google reviews, live on your site.',
    upfront: 45,
    monthly: 5,
    demoSectionId: 'menu-reviews',
    popular: true,
  },
  {
    id: 'meertalig',
    name: 'Multilingual',
    shortPitch: 'NL/EN in one click.',
    upfront: 95,
    monthly: 0,
    demoSectionId: 'menu-meertalig',
  },
  {
    id: 'portaal',
    name: 'Customer portal',
    shortPitch: 'Documents and invoices behind a login.',
    upfront: 295,
    monthly: 15,
    demoSectionId: 'menu-portaal',
  },
  {
    id: 'cadeaubonnen',
    name: 'Gift cards & loyalty card',
    shortPitch: 'Sell gift cards and bring customers back.',
    upfront: 245,
    monthly: 10,
    demoSectionId: 'menu-cadeau',
  },
  {
    id: 'sms',
    name: 'SMS reminders',
    shortPitch: 'Fewer no-shows.',
    upfront: 75,
    monthly: 10,
    demoSectionId: null,
  },
  {
    id: 'nieuwsbrief',
    name: 'Newsletter',
    shortPitch: 'Stay on your customers’ radar.',
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
    label: 'Hair or beauty salon',
    icon: '💇',
    base: 'compleet',
    addons: ['agenda', 'reviews', 'sms', 'cadeaubonnen'],
  },
  {
    id: 'horeca',
    label: 'Restaurant, café or delivery',
    icon: '🍕',
    base: 'interactief',
    addons: ['bestellen', 'kaart', 'reviews', 'meertalig'],
  },
  {
    id: 'klus',
    label: 'Trades, building or landscaping',
    icon: '🔧',
    base: 'compleet',
    addons: ['calculator', 'beforeafter', 'intake'],
  },
  {
    id: 'praktijk',
    label: 'Practice or therapist',
    icon: '🩺',
    base: 'interactief',
    addons: ['agenda', 'intake', 'portaal', 'sms'],
  },
  {
    id: 'winkel',
    label: 'Shop or showroom',
    icon: '🛍️',
    base: 'compleet',
    addons: ['kaart', 'reviews', 'cadeaubonnen', 'nieuwsbrief'],
  },
];

export const carePlans: CarePlan[] = [
  {
    id: 'basis',
    name: 'Basic',
    description: 'Included in your package.',
    upfrontDelta: 0,
    monthlyDelta: 0,
  },
  {
    id: 'plus',
    name: 'Plus',
    description: 'Monthly changes + reporting.',
    upfrontDelta: 0,
    monthlyDelta: 30,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Unlimited small changes, priority.',
    upfrontDelta: 0,
    monthlyDelta: 70,
  },
];
