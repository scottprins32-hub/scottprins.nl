/**
 * De verouderde voorbeeldsite: bewust zoals veel sites van kleine zaken er
 * nog uitzien. Vaste breedte, verloop in de kop, blauwe links. Alles is een
 * verzonnen zaak. Staat altijd binnen een aria-hidden laag.
 */
import { Fragment } from 'react';
import { useT } from '@/lib/locale';
import { tradePhoto } from '@/data/trades';
import Img from '../Img';
import Naam from './Naam';

export default function SiteBefore({ trade, name, eager = false }) {
  const t = useT();
  const b = t.trades[trade].before;
  const o = t.oldSite;
  const navItems = [o.nav[0], o.nav[1], b.nav, o.nav[2]];
  return (
    <div className="old" data-old={trade}>
      <div className="old-page">
        <div className="old-head">
          <div className="old-logo">
            <span data-naam="">{name}</span>
          </div>
          <div className="old-tagline">{b.tagline}</div>
        </div>
        <div className="old-nav">
          {navItems.map((item, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="old-sep">|</span>}
              <span className="old-link">{item}</span>
            </Fragment>
          ))}
        </div>
        <div className="old-body">
          <div className="old-side">
            <div className="old-box">
              <div className="old-box-title">{o.hours}</div>
              <table>
                <tbody>
                  {o.hoursRows.map(([dag, tijd]) => (
                    <tr key={dag}>
                      <td>{dag}</td>
                      <td>{tijd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="old-counter">
              {o.visitors} <span className="old-digits">004217</span>
            </div>
          </div>
          <div className="old-main">
            <div className="old-h1">
              <Naam text={o.welcome} name={name} />
            </div>
            <div className="old-news">{b.news}</div>
            <div className="old-fig">
              <Img name={tradePhoto(trade, 'before')} alt="" sizes="260px" loading={eager ? 'eager' : 'lazy'} />
              <div className="old-cap">{b.caption}</div>
            </div>
            <p>
              <Naam text={b.p1} name={name} />
            </p>
            <p>{b.p2}</p>
            <p>
              <span className="old-link">{o.link}</span>
            </p>
          </div>
        </div>
        <div className="old-foot">
          <Naam text={o.footer} name={name} />
        </div>
      </div>
    </div>
  );
}
