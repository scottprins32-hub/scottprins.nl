/**
 * Zet een selectie om in leesbare Nederlandse tekst.
 * Eén bron voor drie kanalen: de e-mail via Resend, de mailto:-fallback
 * en het voorgevulde WhatsApp-bericht.
 */
import { addons, basePackages, carePlans } from '../data/pricing';
import { calcTotals, sanitizeSelection, type Selection } from './calc';
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
    `Basispakket: ${base.name} (${eur(base.upfront)} + ${eur(base.monthly)}/mnd)`,
  ];

  if (chosen.length > 0) {
    lines.push('Extra’s:');
    for (const a of chosen) {
      const monthly = a.monthly > 0 ? ` + ${eur(a.monthly)}/mnd` : '';
      lines.push(`- ${a.name} (${eur(a.upfront)}${monthly})`);
    }
  } else {
    lines.push('Extra’s: geen');
  }

  lines.push(
    `Onderhoud: ${care.name}${care.monthlyDelta > 0 ? ` (+${eur(care.monthlyDelta)}/mnd)` : ' (inbegrepen)'}`,
    '',
    `Totaal eenmalig: ${eur(totals.upfront)}`,
    `Totaal per maand: ${eur(totals.monthly)}`,
  );

  return lines.join('\n');
}
