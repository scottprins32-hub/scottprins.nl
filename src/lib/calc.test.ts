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
    expect(calcTotals(sel({ base: 'visitekaartje' }))).toEqual({ upfront: 495, monthly: 9 });
    expect(calcTotals(sel({ base: 'compleet' }))).toEqual({ upfront: 795, monthly: 15 });
    expect(calcTotals(sel({ base: 'interactief' }))).toEqual({ upfront: 995, monthly: 25 });
  });
});

describe('calcTotals — care-plans', () => {
  it('telt alleen maandelijks mee, nooit eenmalig', () => {
    expect(calcTotals(sel({ base: 'interactief', care: 'plus' }))).toEqual({
      upfront: 995,
      monthly: 44,
    });
    expect(calcTotals(sel({ base: 'interactief', care: 'premium' }))).toEqual({
      upfront: 995,
      monthly: 64,
    });
  });
});

describe('calcTotals — add-ons', () => {
  it('telt één add-on op bij het basispakket', () => {
    expect(calcTotals(sel({ addons: ['agenda'] }))).toEqual({ upfront: 970, monthly: 24 });
  });

  it('add-on zonder maandbedrag verhoogt alleen het eenmalige totaal', () => {
    expect(calcTotals(sel({ addons: ['kaart'] }))).toEqual({ upfront: 870, monthly: 15 });
  });

  it('rekent de drie populaire add-ons samen correct', () => {
    // agenda 175/9 + chatbot 225/15; reviews is inbegrepen? Nee — pas bij
    // Interactief. Bij Compleet: reviews 45/5 telt gewoon mee.
    expect(calcTotals(sel({ addons: ['agenda', 'chatbot', 'reviews'] }))).toEqual({
      upfront: 795 + 175 + 225 + 45,
      monthly: 15 + 9 + 15 + 5,
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
      upfront: 795,
      monthly: 15,
    });
    expect(calcTotals(sel({ base: 'visitekaartje', addons: ['meertalig'] }))).toEqual({
      upfront: 495 + 95,
      monthly: 9,
    });
  });

  it('waivet ook het maandbedrag van een inbegrepen add-on (reviews bij Interactief)', () => {
    expect(calcTotals(sel({ base: 'interactief', addons: ['reviews'] }))).toEqual({
      upfront: 995,
      monthly: 25,
    });
  });

  it('alle vijf inbegrepen extra’s van Interactief samen kosten niets extra', () => {
    const included: Selection['addons'] = ['meertalig', 'beforeafter', 'kaart', 'intake', 'reviews'];
    expect(calcTotals(sel({ base: 'interactief', addons: included }))).toEqual({
      upfront: 995,
      monthly: 25,
    });
    for (const id of included) expect(isIncluded('interactief', id)).toBe(true);
  });

  it('van pakket wisselen verandert de prijs van dezelfde selectie', () => {
    const chosen = sel({ base: 'compleet', addons: ['kaart'] });
    expect(calcTotals(chosen)).toEqual({ upfront: 795 + 75, monthly: 15 });
    expect(calcTotals({ ...chosen, base: 'interactief' })).toEqual({ upfront: 995, monthly: 25 });
  });

  it('kitchen sink: interactief + alle 15 add-ons + premium', () => {
    // Handmatig narekenen als integriteitscheck op pricing.ts:
    // som add-ons 2255/78; Interactief includeert 355 eenmalig en 5 p/m.
    const all = addons.map((a) => a.id);
    expect(calcTotals(sel({ base: 'interactief', addons: all, care: 'premium' }))).toEqual({
      upfront: 995 + 2255 - 355,
      monthly: 25 + (78 - 5) + 39,
    });
  });
});

describe('calcTotals — robuustheid', () => {
  it('valt terug op standaardwaarden bij onbekend basispakket of care-plan', () => {
    const broken = { base: 'goud', addons: [], care: 'diamant' } as unknown as Selection;
    expect(calcTotals(broken)).toEqual({ upfront: 795, monthly: 15 });
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
