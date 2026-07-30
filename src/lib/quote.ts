/**
 * Zet een selectie om in leesbare Nederlandse tekst.
 * Eén bron voor drie kanalen: de e-mail via Resend, de mailto:-fallback
 * en het voorgevulde WhatsApp-bericht.
 */
import { addons, basePackages, carePlans } from '../data/pricing';
import { addonCost, calcTotals, isIncluded, sanitizeSelection, type Selection } from './calc';
import { eur, PER_MONTH } from './format';

export function summarizeSelection(selection: Selection): string {
  const sel = sanitizeSelection(selection);
  const base = basePackages.find((p) => p.id === sel.base)!;
  const care = carePlans.find((c) => c.id === sel.care)!;
  const chosen = addons.filter((a) => sel.addons.includes(a.id));
  const totals = calcTotals(sel);

  const lines: string[] = [
    'My build via scottprins.nl:',
    '',
    `Base package: ${base.name} (${eur(base.upfront)} + ${eur(base.monthly)}${PER_MONTH})`,
  ];

  // Add-ons die bij het pakket horen tellen als "inbegrepen" — ook als de
  // bezoeker ze niet zelf aanvinkte staan ze in het overzicht.
  const includedNames = addons
    .filter((a) => isIncluded(sel.base, a.id))
    .map((a) => a.name);
  if (includedNames.length > 0) {
    lines.push(`Included with ${base.name}: ${includedNames.join(', ')}`);
  }

  const paid = chosen.filter((a) => !isIncluded(sel.base, a.id));
  if (paid.length > 0) {
    lines.push('Extras:');
    for (const a of paid) {
      const cost = addonCost(sel.base, a);
      const monthly = cost.monthly > 0 ? ` + ${eur(cost.monthly)}${PER_MONTH}` : '';
      lines.push(`- ${a.name} (${eur(cost.upfront)}${monthly})`);
    }
  } else {
    lines.push('Extras: none');
  }

  lines.push(
    `Care plan: ${care.name}${care.monthlyDelta > 0 ? ` (+ ${eur(care.monthlyDelta)}${PER_MONTH})` : ' (included)'}`,
    '',
    `Total one-off: ${eur(totals.upfront)}`,
    `Total per month: ${eur(totals.monthly)}`,
  );

  return lines.join('\n');
}
