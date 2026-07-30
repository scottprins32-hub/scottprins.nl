/** Geldnotatie in Engelse stijl: €1,195 (hele euro's, geen centen).
    De site is Engelstalig; de valuta blijft euro. */
const fmt = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export function eur(amount: number): string {
  return fmt.format(amount);
}

/** Maandnotatie uit het design system: "€29/mo". */
export const PER_MONTH = '/mo';

/** "€29/mo" — of "—" wanneer er geen maandbedrag is. */
export function eurPerMonth(amount: number): string {
  return amount > 0 ? `${eur(amount)}${PER_MONTH}` : '—';
}

/** Compacte prijsregel voor kaarten: "€250 + €15/mo" of "€95 one-off". */
export function priceLine(upfront: number, monthly: number): string {
  return monthly > 0 ? `${eur(upfront)} + ${eur(monthly)}${PER_MONTH}` : `${eur(upfront)} one-off`;
}
