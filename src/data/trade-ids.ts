/**
 * Alles over de branches wat ook in de browser nodig is, zonder beelden.
 * (trades.ts importeert de foto's; dat hoort niet in een client-bundle.)
 */
export const TRADE_IDS = ['bakker', 'kapper', 'restaurant', 'bouw', 'praktijk', 'sport'] as const;
export type TradeId = (typeof TRADE_IDS)[number];

/** Verzonnen voorbeeldzaken; de bezoeker typt er zijn eigen naam overheen. */
export const SAMPLE_NAMES: Record<TradeId, string> = {
  bakker: 'Bakkerij Van Dam',
  kapper: 'Studio Noor',
  restaurant: 'Bistro De Kade',
  bouw: 'Bouwbedrijf Jansen',
  praktijk: 'Fysiotherapie Linde',
  sport: 'Sportschool Hartman',
};

export const DEFAULT_TRADE: TradeId = 'bakker';
export const MAX_NAME = 40;

export function isTradeId(value: unknown): value is TradeId {
  return typeof value === 'string' && (TRADE_IDS as readonly string[]).includes(value);
}

/** 'Bakkerij Van Dam' → 'bakkerijvandam.nl'. Voor de adresregel boven het voorbeeld. */
export function toDomain(name: string): string {
  const slug = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, 'en')
    .replace(/[^a-z0-9]+/g, '');
  return `${slug.slice(0, 40) || 'jouwzaak'}.nl`;
}

/** Wat de bezoeker typte, opgeschoond; leeg = de voorbeeldnaam van de branche. */
export function displayName(typed: string, trade: TradeId): string {
  const clean = typed.replace(/\s+/g, ' ').trim().slice(0, MAX_NAME);
  return clean || SAMPLE_NAMES[trade];
}
