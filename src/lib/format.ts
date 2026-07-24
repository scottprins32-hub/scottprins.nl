/** Geldnotatie in Nederlandse stijl: € 1.195 (hele euro's, geen centen). */
const fmt = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export function eur(amount: number): string {
  return fmt.format(amount);
}

/** Maandnotatie uit het design system: "€ 29 p/m". */
export const PER_MONTH = 'p/m';

/** "€ 29 p/m" — of "—" wanneer er geen maandbedrag is. */
export function eurPerMonth(amount: number): string {
  return amount > 0 ? `${eur(amount)} ${PER_MONTH}` : '—';
}

/** Compacte prijsregel voor kaarten: "€ 250 + € 15 p/m" of "€ 95 eenmalig". */
export function priceLine(upfront: number, monthly: number): string {
  return monthly > 0 ? `${eur(upfront)} + ${eur(monthly)} ${PER_MONTH}` : `${eur(upfront)} eenmalig`;
}
