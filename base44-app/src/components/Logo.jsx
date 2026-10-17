/**
 * SCOTTPRINS-woordmerk met het </>-beeldmerk uit Scotts design system.
 * De kleur volgt de tekstkleur van de omgeving (currentColor); het
 * accent-bolletje kleurt mee met de accentkleur van de site.
 */
import { cx } from '@/lib/cx';
import './Logo.css';

export default function Logo({ className = '' }) {
  return (
    <span className={cx('logo', className)} role="img" aria-label="Scott Prins">
      <svg
        viewBox="0 0 44 28"
        className="logo-mark"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* < */}
        <path d="M10 5 3 14l7 9" />
        {/* / */}
        <path d="M21 4 15 24" />
        {/* nodes die samen een > vormen */}
        <path d="M27 7.5 38 14l-11 6.5" strokeWidth="1.6" opacity="0.45" />
        <circle cx="27" cy="7.5" r="2.7" fill="var(--color-signal)" stroke="none" />
        <circle cx="38" cy="14" r="2.7" fill="currentColor" stroke="none" />
        <circle cx="27" cy="20.5" r="2.7" fill="currentColor" stroke="none" />
      </svg>
      <span className="logo-word" aria-hidden="true">
        Scott<b>Prins</b>
      </span>
    </span>
  );
}
