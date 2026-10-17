/**
 * Het upgrade-ding: de handtekening van de site.
 *
 * Bovenop ligt een verouderde site, eronder een nieuwe versie van dezelfde
 * zaak. Met de muis kijk je erdoorheen (een vloeibare lens), en wie de site
 * ingedrukt houdt, giet de nieuwe versie eruit. Werkt ook met een duim, met
 * het toetsenbord (de knop Upgrade) en met prefers-reduced-motion (dan een
 * korte overvloeier in plaats van de lens).
 *
 * De bezoeker kiest een branche en typt de naam van de eigen zaak: dan is
 * het niet meer een voorbeeld, maar zijn of haar site. Die keuze gaat via
 * scripts/state.ts mee naar de bestelbon.
 */
import { useEffect, useRef } from 'react';
import { TRADE_IDS, SAMPLE_NAMES, DEFAULT_TRADE, MAX_NAME, toDomain } from '@/data/trade-ids';
import { url } from '@/lib/url';
import { cx } from '@/lib/cx';
import { useLocale, useT } from '@/lib/locale';
import { initUpgrade } from '@/scripts/upgrade';
import Icon from '../Icon';
import SiteBefore from './SiteBefore';
import SiteAfter from './SiteAfter';
import '@/styles/sites.css';
import './Upgrade.css';

/** `claimHref`: waar 'Claim deze site' heen gaat. */
export default function Upgrade({ trade, id = 'upgrade', className = '', claimHref = '#bestellen' }) {
  const start = trade ?? DEFAULT_TRADE;
  const locale = useLocale();
  const t = useT();
  const d = t.device;
  const exampleBase = url(locale === 'en' ? '/en/voorbeeld/' : '/voorbeeld/');
  const name = SAMPLE_NAMES[start];
  const ref = useRef(null);

  useEffect(() => {
    initUpgrade(ref.current);
  }, []);

  return (
    <div
      ref={ref}
      className={cx('device', className)}
      id={id}
      role="region"
      aria-label={d.regionLabel}
      aria-describedby={`${id}-desc`}
      data-device=""
      data-sticky-hide=""
      data-trade={start}
      data-preset={trade}
      data-state="idle"
      data-example-base={exampleBase}
      data-sr-revealed={d.srRevealed}
      data-sr-reset={d.srReset}
    >
      <p className="sr-only" id={`${id}-desc`}>
        {d.srDescription}
      </p>

      <div className="device-controls">
        <div className="device-tabs" role="tablist" aria-label={d.tablistLabel}>
          {TRADE_IDS.map((tid) => (
            <button
              key={tid}
              type="button"
              role="tab"
              className="device-tab"
              id={`${id}-tab-${tid}`}
              aria-selected={tid === start ? 'true' : 'false'}
              aria-controls={`${id}-stage`}
              tabIndex={tid === start ? 0 : -1}
              data-tab={tid}
            >
              {t.trades[tid].tab}
            </button>
          ))}
        </div>
        <label className="device-name">
          <span className="device-name-label">{d.nameLabel}</span>
          <input
            type="text"
            data-name-input=""
            maxLength={MAX_NAME}
            placeholder={d.namePlaceholder}
            autoComplete="organization"
            autoCapitalize="words"
            spellCheck={false}
            enterKeyHint="done"
          />
        </label>
      </div>

      <div className="stage-meta" aria-hidden="true">
        <span className="stage-domain" data-domain="">
          {toDomain(name)}
        </span>
        <span className="stage-tag stage-tag-before">{d.beforeTag}</span>
        <span className="stage-tag stage-tag-after">{d.afterTag}</span>
      </div>

      <div className="stage" id={`${id}-stage`} role="tabpanel" aria-labelledby={`${id}-tab-${start}`} data-stage="">
        <div className="layer layer-before" data-layer="before" aria-hidden="true" inert="">
          <div className="vp">
            {TRADE_IDS.map((tid) => (
              <div className="site" data-site={tid} hidden={tid !== start} key={tid}>
                <SiteBefore trade={tid} name={SAMPLE_NAMES[tid]} eager={tid === start} />
              </div>
            ))}
          </div>
        </div>
        <div className="layer layer-after" data-layer="after" aria-hidden="true" inert="">
          <div className="vp">
            {TRADE_IDS.map((tid) => (
              <div className="site" data-site={tid} hidden={tid !== start} key={tid}>
                <SiteAfter trade={tid} name={SAMPLE_NAMES[tid]} eager={tid === start} />
              </div>
            ))}
          </div>
        </div>
        <p className="stage-chip" aria-hidden="true" data-chip="">
          <span className="chip-ring" />
          <span className="hint-fine">{d.hintFine}</span>
          <span className="hint-coarse">{d.hintCoarse}</span>
          <span className="hint-longer">{d.hintLonger}</span>
        </p>
      </div>

      <div className="device-bar">
        <p className="device-result">
          {d.revealedBefore} <strong data-naam="">{name}</strong>. {d.revealedAfter}
        </p>
        <div className="device-actions">
          <button type="button" className="btn btn-signal device-upgrade" data-upgrade="" data-magnetic="">
            <span className="device-upgrade-fill" aria-hidden="true" />
            <span className="device-upgrade-label">{d.upgrade}</span>
          </button>
          <a className="btn btn-signal device-claim" href={claimHref} data-claim="" data-magnetic="">
            {d.claim}
            <Icon name="arrow-right" />
          </a>
          <a className="btn btn-ghost device-open" href={`${exampleBase}${start}/`} data-open="">
            {d.openFull}
            <Icon name="arrow-up-right" />
          </a>
          <button type="button" className="device-reset" data-reset="">
            <Icon name="arrow-counter-clockwise" />
            {d.reset}
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite" data-live="" />
    </div>
  );
}
