/**
 * Bewaakt de twee regels die je met het blote oog makkelijk mist:
 * 1. nl en en hebben exact dezelfde vorm (sleutels én aantal items), zodat
 *    /en/ nooit een lege plek of een vergeten vraag heeft.
 * 2. Geen gedachtestreepjes of pijltjes in zichtbare tekst. De lettertypes
 *    hebben geen pijltjes, en streepjes horen niet bij de huisstijl.
 */
import { describe, expect, it } from 'vitest';
import { nl } from './nl';
import { en } from './en';
import { nlLegal } from './nl-legal';
import { enLegal } from './en-legal';
import { branchesNl, branchesEn } from './branches';

type Pad = string;

function vorm(waarde: unknown, pad = ''): Pad[] {
  if (Array.isArray(waarde)) {
    return [`${pad}[${waarde.length}]`, ...waarde.flatMap((item, i) => vorm(item, `${pad}[${i}]`))];
  }
  if (waarde && typeof waarde === 'object') {
    return Object.keys(waarde)
      .sort()
      .flatMap((sleutel) => vorm((waarde as Record<string, unknown>)[sleutel], `${pad}.${sleutel}`));
  }
  return [`${pad}:${typeof waarde}`];
}

function teksten(waarde: unknown, pad = ''): [Pad, string][] {
  if (typeof waarde === 'string') return [[pad, waarde]];
  if (Array.isArray(waarde)) return waarde.flatMap((item, i) => teksten(item, `${pad}[${i}]`));
  if (waarde && typeof waarde === 'object') {
    return Object.entries(waarde).flatMap(([k, v]) => teksten(v, `${pad}.${k}`));
  }
  return [];
}

const VERBODEN = /[–—←→]/;

describe('taalbundels', () => {
  it('nl en en hebben dezelfde vorm', () => {
    expect(vorm(en)).toEqual(vorm(nl));
  });

  it('juridische teksten hebben dezelfde vorm', () => {
    expect(vorm(enLegal)).toEqual(vorm(nlLegal));
  });

  it('branchepagina’s hebben dezelfde vorm', () => {
    expect(vorm(branchesEn)).toEqual(vorm(branchesNl));
  });

  const alles = { nl, en, nlLegal, enLegal, branchesNl, branchesEn };
  for (const [naam, bundel] of Object.entries(alles)) {
    it(`${naam}: geen gedachtestreepjes of pijltjes`, () => {
      const fout = teksten(bundel).filter(([, tekst]) => VERBODEN.test(tekst));
      expect(fout).toEqual([]);
    });
  }

  it('elke vraag heeft een antwoord en geen dubbele vragen', () => {
    for (const bundel of [nl, en]) {
      const vragen = bundel.faq.items.map((item) => item.q);
      expect(new Set(vragen).size).toBe(vragen.length);
      for (const item of bundel.faq.items) expect(item.a.length).toBeGreaterThan(20);
    }
  });
});
