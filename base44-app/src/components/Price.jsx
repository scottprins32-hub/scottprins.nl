/**
 * De prijs. Eén bedrag, groot, op papier: het is het enige lichte vlak
 * naast de bestelbon, zodat het oog er vanzelf heen gaat. Het bedrag staat
 * er altijd; de animatie laat alleen de cijfers omhoog komen.
 *
 * Wat erin zit staat hier ook, als één lijst met uitleg per punt, direct
 * naast het bedrag.
 */
import { useEffect } from 'react';
import { offer } from '@/data/offer';
import { eur } from '@/lib/format';
import { cx } from '@/lib/cx';
import { useLocale, useT } from '@/lib/locale';
import { initPrice } from '@/scripts/price';
import Icon from './Icon';
import './Price.css';

export default function Price() {
  const locale = useLocale();
  const t = useT();
  const p = t.price;
  const digits = String(offer.price).split('');
  useEffect(() => {
    initPrice();
  }, []);
  return (
    <section className="price" id="prijs" aria-labelledby="price-title">
      <div className="wrap price-grid">
        <div className="price-head">
          <p className="label price-label">{p.label}</p>
          <h2 id="price-title" className="price-question">
            {p.question}
          </h2>
          <p className="price-amount" data-price-amount="">
            <span className="sr-only">
              {eur(offer.price, locale)} {t.order.slip.exVat}
            </span>
            <span className="price-visual" aria-hidden="true">
              <span className="price-cur">€</span>
              {digits.map((digit, i) => (
                <span className="price-digit" key={i}>
                  <span>{digit}</span>
                </span>
              ))}
            </span>
            <span className="price-vat" aria-hidden="true">
              {t.order.slip.exVat}
            </span>
          </p>
          <p className="price-once">{p.once}</p>
          <a className="btn btn-ink price-cta" href="#bestellen" data-magnetic="">
            {p.cta}
            <Icon name="arrow-right" />
          </a>
          <p className="price-terms">{p.terms}</p>
        </div>

        <div className="price-body">
          <div className="price-block">
            <h3 className="price-subtitle">{p.includedTitle}</h3>
            <ul className="price-included" data-checklist="">
              {p.included.map((item) => (
                <li key={item.term}>
                  <span className="price-check">
                    <Icon name="check" />
                  </span>
                  <span className="price-term">{item.term}</span>
                  <span className="price-text">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="price-block">
            <h3 className="label price-sub">{p.compareLabel}</h3>
            <ul className="price-compare">
              {p.compare.map((row) => (
                <li className={cx('price-row', { 'is-mine': row.mine })} data-reveal="up" key={row.who}>
                  <span className="price-who">{row.who}</span>
                  <span className="price-what">{row.what}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="price-block price-why" id="waarom">
            <h3 className="price-subtitle">{p.whyTitle}</h3>
            {p.why.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="price-care">{p.care}</p>
        </div>
      </div>
    </section>
  );
}
