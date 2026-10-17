/**
 * De foto's per branche staan als WebP-versies in src/assets/gen (zie
 * scripts/make-images.py) en heten '<branche>-voor' en '<branche>-na'.
 * Ids, namen en hulpfuncties staan in trade-ids.ts; de teksten per taal in
 * content/nl.ts en en.ts onder `trades`.
 *
 * Alle foto's zijn CC0 (StockSnap); fotografen staan in
 * src/assets/trades/CREDITS.json.
 */
import type { TradeId } from './trade-ids';

export * from './trade-ids';

export const tradePhoto = (trade: TradeId, which: 'before' | 'after'): string =>
  `${trade}-${which === 'before' ? 'voor' : 'na'}`;
