import { describe, expect, it } from 'vitest';
import { addons } from '../data/pricing';
import { calcTotals, isIncluded, sanitizeSelection, type Selection } from './calc';

const sel = (partial: Partial<Selection>): Selection => ({
  base: 'compleet',
  addons: [],
  care: 'basis',
  ...partial,
});

describe('calcTotals — basispakketten', () => {
  it('rekent elk basispakket zonder extra’s correct', () => {
    expect(calcTotals(sel({ base: 'visitekaartje' }))).toEqual({ upfront: 395, monthly: 19 });
    expect(calcTotals(sel({ base: 'compleet' }))).toEqual({ upfront: 745, monthly: 29 });
    expect(calcTotals(sel({ base: 'interactief' }))).toEqual({ upfront: 1195, monthly: 49 });
  });
});

describe('calcTotals — care-plans', () => {
  it('telt alleen maandelijks mee, nooit eenmalig', () => {
    expect(calcTotals(sel({ base: 'interactief', care: 'plus' }))).toEqual({
      upfront: 1195,
      monthly: 79,
    });
    expect(calcTotals(sel({ base: 'interactief', care: 'premium' }))).toEqual({
      upfront: 1195,
      monthly: 119,
    });
  });
});

describe('calcTotals — add-ons', () => {
  it('telt één add-on op bij het basispakket', () => {
    expect(calcTotals(sel({ addons: ['agenda'] }))).toEqual({ upfront: 940, monthly: 44 });
  });

  it('add-on zonder maandbedrag verhoogt alleen het eenmalige totaal', () => {
    expect(calcTotals(sel({ addons: ['kaart'] }))).toEqual({ upfront: 820, monthly: 29 });
  });

  it('rekent de drie populaire add-ons samen correct', () => {
    // agenda 195/15 + chatbot 245/25; reviews is inbegrepen? Nee — pas bij
    // Interactief. Bij Compleet: reviews 45/5 telt gewoon mee.
    expect(calcTotals(sel({ addons: ['agenda', 'chatbot', 'reviews'] }))).toEqual({
      upfront: 745 + 195 + 245 + 45,
      monthly: 29 + 15 + 25 + 5,
    });
  });

  it('telt dubbele add-on-ids maar één keer', () => {
    expect(calcTotals(sel({ addons: ['agenda', 'agenda'] }))).toEqual(
      calcTotals(sel({ addons: ['agenda'] })),
    );
  });

  it('negeert onbekende add-on-ids (verouderde localStorage, bijv. het oude "stempelkaart")', () => {
    const withStale = ['agenda', 'stempelkaart'] as unknown as Selection['addons'];
    expect(calcTotals(sel({ addons: withStale }))).toEqual(calcTotals(sel({ addons: ['agenda'] })));
  });

  it('is onafhankelijk van de volgorde van add-ons', () => {
    expect(calcTotals(sel({ addons: ['reviews', 'agenda', 'chatbot'] }))).toEqual(
      calcTotals(sel({ addons: ['chatbot', 'reviews', 'agenda'] })),
    );
  });
});

describe('calcTotals — inbegrepen add-ons per pakket', () => {
  it('meertalig is gratis bij Compleet, maar kost geld bij Visitekaartje', () => {
    expect(calcTotals(sel({ base: 'compleet', addons: ['meertalig'] }))).toEqual({
      upfront: 745,
      monthly: 29,
    });
    expect(calcTotals(sel({ base: 'visitekaartje', addons: ['meertalig'] }))).toEqual({
      upfront: 395 + 95,
      monthly: 19,
    });
  });

  it('waivet ook het maandbedrag van een inbegrepen add-on (reviews bij Interactief)', () => {
    expect(calcTotals(sel({ base: 'interactief', addons: ['reviews'] }))).toEqual({
      upfront: 1195,
      monthly: 49,
    });
  });

  it('alle vijf inbegrepen extra’s van Interactief samen kosten niets extra', () => {
    const included: Selection['addons'] = ['meertalig', 'beforeafter', 'kaart', 'intake', 'reviews'];
    expect(calcTotals(sel({ base: 'interactief', addons: included }))).toEqual({
      upfront: 1195,
      monthly: 49,
    });
    for (const id of included) expect(isIncluded('interactief', id)).toBe(true);
  });

  it('van pakket wisselen verandert de prijs van dezelfde selectie', () => {
    const chosen = sel({ base: 'compleet', addons: ['kaart'] });
    expect(calcTotals(chosen)).toEqual({ upfront: 745 + 75, monthly: 29 });
    expect(calcTotals({ ...chosen, base: 'interactief' })).toEqual({ upfront: 1195, monthly: 49 });
  });

  it('kitchen sink: interactief + alle 15 add-ons + premium', () => {
    // Handmatig narekenen als integriteitscheck op pricing.ts:
    // som add-ons 2535/168; Interactief includeert 355 eenmalig en 5 p/m.
    const all = addons.map((a) => a.id);
    expect(calcTotals(sel({ base: 'interactief', addons: all, care: 'premium' }))).toEqual({
      upfront: 1195 + 2535 - 355,
      monthly: 49 + (168 - 5) + 70,
    });
  });
});

describe('calcTotals — robuustheid', () => {
  it('valt terug op standaardwaarden bij onbekend basispakket of care-plan', () => {
    const broken = { base: 'goud', addons: [], care: 'diamant' } as unknown as Selection;
    expect(calcTotals(broken)).toEqual({ upfront: 745, monthly: 29 });
  });

  it('muteert de input-selectie niet', () => {
    const input = sel({ addons: ['agenda', 'agenda'] });
    const copy = structuredClone(input);
    calcTotals(input);
    expect(input).toEqual(copy);
  });
});

describe('sanitizeSelection', () => {
  it('herstelt volledig kapotte input naar de standaardselectie', () => {
    expect(sanitizeSelection(null)).toEqual({ base: 'compleet', addons: [], care: 'basis' });
    expect(sanitizeSelection('rommel')).toEqual({ base: 'compleet', addons: [], care: 'basis' });
  });

  it('behoudt geldige onderdelen en gooit alleen rommel weg', () => {
    expect(
      sanitizeSelection({ base: 'interactief', addons: ['agenda', 'nep'], care: 'plus' }),
    ).toEqual({ base: 'interactief', addons: ['agenda'], care: 'plus' });
  });
});
