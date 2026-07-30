/**
 * Zet een selectie om in leesbare tekst, in de taal van de bezoeker.
 * Eén bron voor drie kanalen: de e-mail via Resend, de mailto:-fallback
 * en het voorgevulde WhatsApp-bericht.
 */
import { addons, basePackages, carePlans } from '../data/pricing';
import { addonCost, calcTotals, isIncluded, sanitizeSelection, type Selection } from './calc';
import { eur, perMaand, type Taal } from './format';
import { content, toLocale, type Locale } from '../data/content';

export function summarizeSelection(selection: Selection, locale?: Locale | string): string {
  const taal: Taal = toLocale(locale ?? (typeof document !== 'undefined' ? document.documentElement.lang : undefined));
  const t = content(taal).quote;
  const namen = content(taal).pricing;
  const PER_MONTH = perMaand(taal);
  const sel = sanitizeSelection(selection);
  const base = basePackages.find((p) => p.id === sel.base)!;
  const care = carePlans.find((c) => c.id === sel.care)!;
  const chosen = addons.filter((a) => sel.addons.includes(a.id));
  const totals = calcTotals(sel);

  const lines: string[] = [
    t.intro,
    '',
    `${t.base}: ${namen.base[sel.base].name} (${eur(base.upfront, taal)} + ${eur(base.monthly, taal)}${PER_MONTH})`,
  ];

  // Add-ons die bij het pakket horen tellen als "inbegrepen" — ook als de
  // bezoeker ze niet zelf aanvinkte staan ze in het overzicht.
  const includedNames = addons
    .filter((a) => isIncluded(sel.base, a.id))
    .map((a) => namen.addons[a.id].name);
  if (includedNames.length > 0) {
    lines.push(`${t.includedWith} ${namen.base[sel.base].name}: ${includedNames.join(', ')}`);
  }

  const paid = chosen.filter((a) => !isIncluded(sel.base, a.id));
  if (paid.length > 0) {
    lines.push(`${t.extras}:`);
    for (const a of paid) {
      const cost = addonCost(sel.base, a);
      const monthly = cost.monthly > 0 ? ` + ${eur(cost.monthly, taal)}${PER_MONTH}` : '';
      lines.push(`- ${namen.addons[a.id].name} (${eur(cost.upfront, taal)}${monthly})`);
    }
  } else {
    lines.push(`${t.extras}: ${t.none}`);
  }

  lines.push(
    `${t.care}: ${namen.care[sel.care].name}${care.monthlyDelta > 0 ? ` (+ ${eur(care.monthlyDelta, taal)}${PER_MONTH})` : ` (${t.included})`}`,
    '',
    `${t.totalUpfront}: ${eur(totals.upfront, taal)}`,
    `${t.totalMonthly}: ${eur(totals.monthly, taal)}`,
  );

  return lines.join('\n');
}
