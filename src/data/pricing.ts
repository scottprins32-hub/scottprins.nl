/**
 * ALLE prijzen van de site staan in dit bestand — alleen de getallen en de
 * structuur. De namen en omschrijvingen zijn taalgebonden en staan per taal
 * in src/data/content/nl.ts en en.ts, onder `pricing`.
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
  upfront: number;
  monthly: number;
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
  upfront: number;
  monthly: number;
  /** Sectie-id van de live demo op de menukaart; null = geen demo-sectie. */
  demoSectionId: string | null;
  popular?: boolean;
}

export interface CarePlan {
  id: CarePlanId;
  /** Altijd 0 — care-plans kosten niets eenmalig, veld bestaat voor de volledigheid. */
  upfrontDelta: number;
  /** Opslag bovenop het maandbedrag van het gekozen basispakket. */
  monthlyDelta: number;
}

export const basePackages: BasePackage[] = [
  {
    id: 'visitekaartje',
    upfront: 495,
    monthly: 9,
    // Bewuste afwijking van de design-system-kaart: "WhatsApp-knop" en de
    // hosting-regel staan hier extra, omdat de configurator (anders dan het
    // geprinte prijsoverzicht met z'n FAQ) zelf moet uitleggen wat het
    // maandbedrag dekt.
    includedAddons: [],
  },
  {
    id: 'compleet',
    upfront: 795,
    monthly: 15,
    includedAddons: ['meertalig', 'beforeafter'],
    popular: true,
  },
  {
    id: 'interactief',
    upfront: 995,
    monthly: 25,
    includedAddons: ['beforeafter', 'kaart', 'intake', 'reviews', 'agenda'],
  },
];

export const addons: Addon[] = [
  {
    id: 'agenda',
    upfront: 175,
    monthly: 9,
    demoSectionId: 'menu-booking',
    popular: true,
  },
  {
    id: 'chatbot',
    upfront: 225,
    monthly: 15,
    demoSectionId: 'menu-chatbot',
    popular: true,
  },
  {
    id: 'bestellen',
    upfront: 295,
    monthly: 0,
    demoSectionId: 'menu-ordering',
  },
  {
    id: 'kaart',
    upfront: 75,
    monthly: 0,
    demoSectionId: 'menu-map',
  },
  {
    id: 'scrollvideo',
    upfront: 175,
    monthly: 0,
    demoSectionId: 'menu-scrollvideo',
  },
  {
    id: 'intake',
    upfront: 95,
    monthly: 0,
    demoSectionId: 'menu-intake',
  },
  {
    id: 'calculator',
    upfront: 125,
    monthly: 0,
    demoSectionId: 'menu-calculator',
  },
  {
    id: 'beforeafter',
    upfront: 45,
    monthly: 0,
    demoSectionId: 'menu-beforeafter',
  },
  {
    id: 'reviews',
    upfront: 45,
    monthly: 5,
    demoSectionId: 'menu-reviews',
    popular: true,
  },
  {
    id: 'meertalig',
    upfront: 95,
    monthly: 0,
    demoSectionId: 'menu-multilingual',
  },
  {
    id: 'portaal',
    upfront: 195,
    monthly: 0,
    demoSectionId: 'menu-portal',
  },
  {
    id: 'cadeaubonnen',
    upfront: 195,
    monthly: 0,
    demoSectionId: 'menu-giftcards',
  },
  {
    id: 'ai-telefonist',
    upfront: 345,
    monthly: 49,
    demoSectionId: null,
  },
  {
    id: 'sms',
    upfront: 75,
    monthly: 0,
    demoSectionId: null,
  },
  {
    id: 'nieuwsbrief',
    upfront: 95,
    monthly: 0,
    demoSectionId: null,
  },
];

/**
 * Snelstart per vak. Eén tik zet een compleet, verdedigbaar voorstel klaar
 * in de configurator — de bezoeker hoeft niet zelf 15 opties af te wegen.
 * Pas gerust aan: hier staat alleen wélke opties, de prijzen komen
 * automatisch uit `addons` hierboven.
 */
export type PresetId = 'salon' | 'horeca' | 'klus' | 'praktijk' | 'winkel';

export interface Preset {
  id: PresetId;
  /** Hoe de bezoeker zichzelf noemt: "Ik heb een kapsalon". */
  icon: string;
  base: BasePackageId;
  addons: AddonId[];
}

export const presets: Preset[] = [
  {
    id: 'salon',
    icon: '💇',
    base: 'compleet',
    addons: ['agenda', 'reviews', 'sms', 'cadeaubonnen'],
  },
  {
    id: 'horeca',
    icon: '🍕',
    base: 'interactief',
    addons: ['bestellen', 'kaart', 'reviews', 'meertalig'],
  },
  {
    id: 'klus',
    icon: '🔧',
    base: 'compleet',
    addons: ['calculator', 'beforeafter', 'intake'],
  },
  {
    id: 'praktijk',
    icon: '🩺',
    base: 'interactief',
    addons: ['agenda', 'intake', 'portaal', 'sms'],
  },
  {
    id: 'winkel',
    icon: '🛍️',
    base: 'compleet',
    addons: ['kaart', 'reviews', 'cadeaubonnen', 'nieuwsbrief'],
  },
];

export const carePlans: CarePlan[] = [
  {
    id: 'basis',
    upfrontDelta: 0,
    monthlyDelta: 0,
  },
  {
    id: 'plus',
    upfrontDelta: 0,
    monthlyDelta: 19,
  },
  {
    id: 'premium',
    upfrontDelta: 0,
    monthlyDelta: 39,
  },
];
