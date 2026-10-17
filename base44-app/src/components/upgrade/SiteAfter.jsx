/**
 * De nieuwe voorbeeldsite, één ontwerp per branche (data-look).
 *
 * mode 'device': binnen het upgrade-ding. De laag is inert, dus de kop is
 *                geen heading.
 * mode 'page'  : op /voorbeeld/, als echte pagina met een h1.
 *
 * Knoppen zijn in beide gevallen spans: het is een voorbeeldzaak, er valt
 * niets te bestellen, en een link die nergens heen gaat is erger dan geen.
 */
import { Fragment } from 'react';
import { useT } from '@/lib/locale';
import { tradePhoto } from '@/data/trades';
import { tail } from '@/lib/text';
import { cx } from '@/lib/cx';
import Img from '../Img';

/* Per woord, zodat de kop natuurlijk afbreekt en per woord kan binnenkomen. */
const words = (text) => text.split(/\s+/).filter(Boolean);

function Words({ text, trailing = false }) {
  const all = words(text);
  return all.map((w, i) => (
    <Fragment key={i}>
      <span className="w">{w}</span>
      {(trailing || i < all.length - 1) && ' '}
    </Fragment>
  ));
}

export default function SiteAfter({ trade, name, mode = 'device', eager = false }) {
  const t = useT();
  const a = t.trades[trade].after;
  const page = mode === 'page';
  const Title = page ? 'h1' : 'p';
  /* 'voordat je binnen bent.' krijgt een spatie, een los '.' niet. */
  const endSpace = tail(a.titleEnd).startsWith(' ');
  return (
    <div className={cx('new', { 'is-page': page })} data-look={trade}>
      <div className="new-head">
        <span className="new-logo" data-naam="">
          {name}
        </span>
        <div className="new-nav">
          {a.nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <span className="new-navcta">{a.navCta}</span>
        <span className="new-burger" aria-hidden="true" />
      </div>
      <div className="new-hero">
        <div className="new-copy">
          <p className="new-eyebrow" data-a="eyebrow">
            <span data-naam="">{name}</span> · {a.eyebrow}
          </p>
          <Title className="new-title" data-a="title">
            <Words text={a.titleStart} trailing />
            <em>
              <Words text={a.titleAccent} />
            </em>
            {endSpace && ' '}
            <Words text={a.titleEnd} />
          </Title>
          <p className="new-sub" data-a="sub">
            {a.sub}
          </p>
          <div className="new-ctas" data-a="ctas">
            <span className="new-btn">{a.cta}</span>
            <span className="new-btn2">{a.cta2}</span>
          </div>
        </div>
        <figure className="new-media" data-a="media">
          <Img
            name={tradePhoto(trade, 'after')}
            alt={page ? a.alt : ''}
            sizes={page ? '(min-width: 700px) 50vw, 100vw' : '(min-width: 1024px) 560px, 92vw'}
            loading={eager ? 'eager' : 'lazy'}
            fetchpriority={eager && page ? 'high' : undefined}
          />
        </figure>
      </div>
      <ul className="new-facts" data-a="facts">
        {a.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
      {page && (
        <>
          <div className="new-more">
            <h2>{t.oldSite.hours}</h2>
            <table className="new-hours">
              <tbody>
                {t.oldSite.hoursRows.map(([dag, tijd]) => (
                  <tr key={dag}>
                    <td>{dag}</td>
                    <td>{tijd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="new-foot">
            © {new Date().getFullYear()} <span data-naam="">{name}</span>
          </div>
        </>
      )}
    </div>
  );
}
