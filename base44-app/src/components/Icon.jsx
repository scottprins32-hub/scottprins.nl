/**
 * Iconen uit één set: Phosphor (regular), als inline SVG. Alleen de iconen
 * die de site echt gebruikt worden geïmporteerd; ze kleuren mee met de
 * tekst (currentColor).
 */
import arrowRight from '@phosphor-icons/core/regular/arrow-right.svg?raw';
import arrowLeft from '@phosphor-icons/core/regular/arrow-left.svg?raw';
import arrowUpRight from '@phosphor-icons/core/regular/arrow-up-right.svg?raw';
import arrowDown from '@phosphor-icons/core/regular/arrow-down.svg?raw';
import arrowCounterClockwise from '@phosphor-icons/core/regular/arrow-counter-clockwise.svg?raw';
import arrowClockwise from '@phosphor-icons/core/regular/arrow-clockwise.svg?raw';
import check from '@phosphor-icons/core/regular/check.svg?raw';
import x from '@phosphor-icons/core/regular/x.svg?raw';
import list from '@phosphor-icons/core/regular/list.svg?raw';
import plus from '@phosphor-icons/core/regular/plus.svg?raw';
import whatsapp from '@phosphor-icons/core/regular/whatsapp-logo.svg?raw';
import phone from '@phosphor-icons/core/regular/phone.svg?raw';
import envelope from '@phosphor-icons/core/regular/envelope-simple.svg?raw';
import globe from '@phosphor-icons/core/regular/globe-simple.svg?raw';
import eye from '@phosphor-icons/core/regular/eye.svg?raw';
import mapPin from '@phosphor-icons/core/regular/map-pin.svg?raw';

const raw = {
  'arrow-right': arrowRight,
  'arrow-left': arrowLeft,
  'arrow-up-right': arrowUpRight,
  'arrow-down': arrowDown,
  'arrow-counter-clockwise': arrowCounterClockwise,
  'arrow-clockwise': arrowClockwise,
  check,
  x,
  list,
  plus,
  whatsapp,
  phone,
  envelope,
  globe,
  eye,
  'map-pin': mapPin,
};

/* Het <svg>-element zelf tekent React; de paden erin komen uit het bestand. */
const parsed = Object.fromEntries(
  Object.entries(raw).map(([name, svg]) => {
    const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 256 256';
    const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
    return [name, { viewBox, inner }];
  }),
);

export default function Icon({ name, className = 'icon', label }) {
  const icon = parsed[name];
  if (!icon) throw new Error(`Onbekend icoon: ${name}`);
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewBox}
      fill="currentColor"
      className={className}
      focusable="false"
      {...a11y}
      dangerouslySetInnerHTML={{ __html: icon.inner }}
    />
  );
}
