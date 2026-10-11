/**
 * De foto's per branche. Alleen voor Astro-frontmatter: de imports hieronder
 * horen niet in een client-bundle. Ids, namen en hulpfuncties staan in
 * trade-ids.ts; de teksten per taal in content/nl.ts en en.ts onder `trades`.
 *
 * Alle foto's zijn CC0 (StockSnap); fotografen staan in
 * src/assets/trades/CREDITS.json.
 */
import type { ImageMetadata } from 'astro';
import type { TradeId } from './trade-ids';

import bakkerNa from '../assets/trades/bakker-na.jpg';
import bakkerVoor from '../assets/trades/bakker-voor.jpg';
import kapperNa from '../assets/trades/kapper-na.jpg';
import kapperVoor from '../assets/trades/kapper-voor.jpg';
import restaurantNa from '../assets/trades/restaurant-na.jpg';
import restaurantVoor from '../assets/trades/restaurant-voor.jpg';
import bouwNa from '../assets/trades/bouw-na.jpg';
import bouwVoor from '../assets/trades/bouw-voor.jpg';
import praktijkNa from '../assets/trades/praktijk-na.jpg';
import praktijkVoor from '../assets/trades/praktijk-voor.jpg';
import sportNa from '../assets/trades/sport-na.jpg';
import sportVoor from '../assets/trades/sport-voor.jpg';

export * from './trade-ids';

export const tradePhotos: Record<TradeId, { after: ImageMetadata; before: ImageMetadata }> = {
  bakker: { after: bakkerNa, before: bakkerVoor },
  kapper: { after: kapperNa, before: kapperVoor },
  restaurant: { after: restaurantNa, before: restaurantVoor },
  bouw: { after: bouwNa, before: bouwVoor },
  praktijk: { after: praktijkNa, before: praktijkVoor },
  sport: { after: sportNa, before: sportVoor },
};
