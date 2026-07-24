import { describe, expect, it } from 'vitest';
import { addons } from '../data/pricing';
import { calcTotals, sanitizeSelection, type Selection } from './calc';

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
    expect(calcTotals(sel({ addons: ['agenda'] }))).toEqual({ upfront: 995, monthly: 44 });
  });

  it('add-on zonder maandbedrag verhoogt alleen het eenmalige totaal', () => {
    expect(calcTotals(sel({ addons: ['kaart'] }))).toEqual({ upfront: 840, monthly: 29 });
  });

  it('rekent de drie populaire add-ons samen correct', () => {
    expect(calcTotals(sel({ addons: ['agenda', 'chatbot', 'reviews'] }))).toEqual({
      upfront: 1365,
      monthly: 74,
    });
  });

  it('kitchen sink: interactief + alle 16 add-ons + premium', () => {
    // Handmatig narekenen: add-ons 3285 eenmalig / 178 per maand.
    // Dit is tegelijk een integriteitscheck op pricing.ts zelf: wijzigt
    // daar een prijs, dan hoort deze verwachting bewust mee te veranderen.
    const all = addons.map((a) => a.id);
    expect(calcTotals(sel({ base: 'interactief', addons: all, care: 'premium' }))).toEqual({
      upfront: 1195 + 3285,
      monthly: 49 + 178 + 70,
    });
  });

  it('telt dubbele add-on-ids maar één keer', () => {
    expect(calcTotals(sel({ addons: ['agenda', 'agenda'] }))).toEqual(
      calcTotals(sel({ addons: ['agenda'] })),
    );
  });

  it('negeert onbekende add-on-ids (verouderde localStorage)', () => {
    const withBogus = ['agenda', 'bestaat-niet'] as unknown as Selection['addons'];
    expect(calcTotals(sel({ addons: withBogus }))).toEqual(calcTotals(sel({ addons: ['agenda'] })));
  });

  it('is onafhankelijk van de volgorde van add-ons', () => {
    expect(calcTotals(sel({ addons: ['reviews', 'agenda', 'chatbot'] }))).toEqual(
      calcTotals(sel({ addons: ['chatbot', 'reviews', 'agenda'] })),
    );
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
