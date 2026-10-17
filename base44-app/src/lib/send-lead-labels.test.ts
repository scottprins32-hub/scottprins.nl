/**
 * De Base44-functie sendLead heeft een eigen kopie van de labels (hij draait
 * los van de site). Deze test faalt zodra die kopie en de site uit elkaar
 * lopen: dan zou de mail andere woorden gebruiken dan het formulier.
 */
import { describe, expect, it } from 'vitest';
import { nl } from '../data/content/nl';
import { en } from '../data/content/en';
import { site } from '../data/site';
import { TRADE_IDS } from '../data/trade-ids';
import { LABELS, SITE, TRADES } from '../../base44/functions/sendLead/labels';

const fromSite = (b: typeof nl | typeof en) => ({
  fields: {
    name: b.order.fields.name,
    email: b.order.fields.email,
    phone: b.order.fields.phone,
    company: b.order.fields.company,
    trade: b.order.fields.trade,
    message: b.order.fields.message,
  },
  trades: { ...Object.fromEntries(TRADE_IDS.map((id) => [id, b.trades[id].tab])), anders: b.order.tradeOther },
  success: b.order.success.text,
});

describe('sendLead-labels', () => {
  it('volgen de Nederlandse site', () => expect(LABELS.nl).toEqual(fromSite(nl)));
  it('volgen de Engelse site', () => expect(LABELS.en).toEqual(fromSite(en)));
  it('kennen dezelfde branches', () => expect([...TRADES]).toEqual([...TRADE_IDS]));
  it('mailen naar Scott', () => {
    expect(SITE.email).toBe(site.email);
    expect(SITE.whatsappDisplay).toBe(site.whatsappDisplay);
  });
});
