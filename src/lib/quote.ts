/**
 * Zet een selectie om in leesbare Nederlandse tekst.
 * Eén bron voor drie kanalen: de e-mail via Resend, de mailto:-fallback
 * en het voorgevulde WhatsApp-bericht.
 */
import { addons, basePackages, carePlans } from '../data/pricing';
import { addonCost, calcTotals, isIncluded, sanitizeSelection, type Selection } from './calc';
import { eur } from './format';

export function summarizeSelection(selection: Selection): string {
  const sel = sanitizeSelection(selection);
  const base = basePackages.find((p) => p.id === sel.base)!;
  const care = carePlans.find((c) => c.id === sel.care)!;
  const chosen = addons.filter((a) => sel.addons.includes(a.id));
  const totals = calcTotals(sel);

  const lines: string[] = [
    'Mijn samenstelling via scottprins.nl:',
    '',
    `Basispakket: ${base.name} (${eur(base.upfront)} + ${eur(base.monthly)} p/m)`,
  ];

  // Add-ons die bij het pakket horen tellen als "inbegrepen" — ook als de
  // bezoeker ze niet zelf aanvinkte staan ze in het overzicht.
  const includedNames = addons
    .filter((a) => isIncluded(sel.base, a.id))
    .map((a) => a.name);
  if (includedNames.length > 0) {
    lines.push(`Inbegrepen bij ${base.name}: ${includedNames.join(', ')}`);
  }

  const paid = chosen.filter((a) => !isIncluded(sel.base, a.id));
  if (paid.length > 0) {
    lines.push('Extra’s:');
    for (const a of paid) {
      const cost = addonCost(sel.base, a);
      const monthly = cost.monthly > 0 ? ` + ${eur(cost.monthly)} p/m` : '';
      lines.push(`- ${a.name} (${eur(cost.upfront)}${monthly})`);
    }
  } else {
    lines.push('Extra’s: geen');
  }

  lines.push(
    `Onderhoud: ${care.name}${care.monthlyDelta > 0 ? ` (+ ${eur(care.monthlyDelta)} p/m)` : ' (inbegrepen)'}`,
    '',
    `Totaal eenmalig: ${eur(totals.upfront)}`,
    `Totaal per maand: ${eur(totals.monthly)}`,
  );

  return lines.join('\n');
}
