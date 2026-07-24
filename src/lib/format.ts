/** Geldnotatie in Nederlandse stijl: € 1.195 (hele euro's, geen centen). */
const fmt = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export function eur(amount: number): string {
  return fmt.format(amount);
}

/** "€ 29/mnd" — of "—" wanneer er geen maandbedrag is. */
export function eurPerMonth(amount: number): string {
  return amount > 0 ? `${eur(amount)}/mnd` : '—';
}

/** Compacte prijsregel voor kaarten: "€ 250 + € 15/mnd" of "€ 95 eenmalig". */
export function priceLine(upfront: number, monthly: number): string {
  return monthly > 0 ? `${eur(upfront)} + ${eur(monthly)}/mnd` : `${eur(upfront)} eenmalig`;
}
