/**
 * De bestelbon: een bon op papier, met de naam van jouw zaak erop zodra je
 * die in het upgrade-ding typt. Versturen gaat via de Base44-functie
 * sendLead (zie scripts/order.ts); lukt dat niet, dan staat dezelfde bon
 * klaar voor WhatsApp of mail.
 */
import { useEffect, useRef } from 'react';
import { site } from '@/data/site';
import { offer } from '@/data/offer';
import { altPath } from '@/data/content';
import { TRADE_IDS, DEFAULT_TRADE, MAX_NAME } from '@/data/trade-ids';
import { eur } from '@/lib/format';
import { url } from '@/lib/url';
import { waHref } from '@/lib/whatsapp';
import { useLocale, useT } from '@/lib/locale';
import { initOrder } from '@/scripts/order';
import Icon from './Icon';
import './Order.css';

export default function Order({ trade = DEFAULT_TRADE }) {
  const locale = useLocale();
  const t = useT();
  const o = t.order;
  const slip = o.slip;
  const labels = {
    name: o.fields.name,
    email: o.fields.email,
    phone: o.fields.phone,
    company: o.fields.company,
    trade: o.fields.trade,
    message: o.fields.message,
    trades: {
      ...Object.fromEntries(TRADE_IDS.map((id) => [id, t.trades[id].tab])),
      anders: o.tradeOther,
    },
  };
  const privacyHref = url(altPath('/privacy', locale));
  const ref = useRef(null);
  useEffect(() => {
    initOrder(ref.current);
  }, []);

  return (
    <section className="order section-pad" id="bestellen" aria-labelledby="order-title" data-sticky-hide="">
      <div className="wrap order-grid">
        <div className="order-head">
          <p className="label order-label">{o.label}</p>
          <h2 id="order-title" className="display order-title" data-reveal="title">
            {o.titleStart} <em className="serif-accent order-accent">{o.titleAccent}</em>
          </h2>
          <p className="lead order-lead" data-reveal="up">
            {o.lead}
          </p>
          <ul className="order-points" data-reveal="up">
            {o.points.map((point) => (
              <li key={point}>
                <Icon name="check" />
                {point}
              </li>
            ))}
          </ul>
          <p className="order-direct" data-reveal="up">
            <a href={waHref(t.whatsapp.generic)} data-wa={t.whatsapp.named} target="_blank" rel="noopener">
              <Icon name="whatsapp" />
              {site.whatsappDisplay}
            </a>
            <a href={`mailto:${site.email}`}>
              <Icon name="envelope" />
              {site.email}
            </a>
          </p>
        </div>

        <div className="slip-wrap" data-order="" ref={ref}>
          <form
            className="slip"
            noValidate
            data-order-form=""
            data-locale={locale}
            data-labels={JSON.stringify(labels)}
            data-err-name={o.errors.name}
            data-err-email={o.errors.email}
            data-sending={o.sending}
            data-msg-intro={o.messageIntro}
            data-mail-subject={o.mailSubject}
            data-whatsapp={site.whatsapp}
            data-email={site.email}
          >
            <div className="slip-paper">
              <header className="slip-head">
                <span className="slip-heading">{slip.heading}</span>
                <span className="slip-date">
                  {slip.dateLabel} <time data-today="" />
                </span>
              </header>

              <div className="slip-lines" aria-hidden="true">
                <div className="slip-line">
                  <span className="slip-qty">1 ×</span>
                  <span className="slip-desc">
                    {slip.qtyLine} {slip.forLabel}{' '}
                    <strong data-slip-name="" data-fallback={slip.yourBusiness}>
                      {slip.yourBusiness}
                    </strong>
                    <small>{slip.detail}</small>
                  </span>
                  <span className="slip-amt">{eur(offer.price, locale)}</span>
                </div>
                <div className="slip-line">
                  <span className="slip-qty">{offer.revisionRounds} ×</span>
                  <span className="slip-desc">{slip.roundsLine}</span>
                  <span className="slip-amt">{slip.included}</span>
                </div>
                <div className="slip-line">
                  <span className="slip-qty">1 ×</span>
                  <span className="slip-desc">{slip.sampleLine}</span>
                  <span className="slip-amt">{slip.free}</span>
                </div>
              </div>
              <p className="sr-only">
                {slip.qtyLine}: {eur(offer.price, locale)} {slip.exVat}. {slip.totalLabel}: {eur(0, locale)}. {slip.totalNote}
              </p>

              <div className="slip-total" aria-hidden="true">
                <span>{slip.totalLabel}</span>
                <span className="slip-total-amt">{eur(0, locale)}</span>
              </div>
              <p className="slip-note">
                {slip.totalNote}
                <span>{slip.exVat}</span>
              </p>

              <div className="slip-fields">
                <div className="field">
                  <label htmlFor="f-name">{o.fields.name}</label>
                  <input id="f-name" name="name" type="text" autoComplete="name" required maxLength={100} aria-describedby="f-name-err" />
                  <p className="field-err" id="f-name-err" data-err-for="name" />
                </div>
                <div className="field">
                  <label htmlFor="f-email">{o.fields.email}</label>
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    maxLength={200}
                    aria-describedby="f-email-err"
                  />
                  <p className="field-err" id="f-email-err" data-err-for="email" />
                </div>
                <div className="field">
                  <label htmlFor="f-company">{o.fields.company}</label>
                  <input id="f-company" name="company" type="text" autoComplete="organization" maxLength={MAX_NAME} data-company="" />
                </div>
                <div className="field">
                  <label htmlFor="f-phone">
                    {o.fields.phone} <span className="field-opt">({o.fields.optional})</span>
                  </label>
                  <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={30} />
                </div>
                <div className="field field-wide">
                  <label htmlFor="f-trade">{o.fields.trade}</label>
                  <select id="f-trade" name="trade" data-trade-select="" defaultValue={trade}>
                    {TRADE_IDS.map((id) => (
                      <option value={id} key={id}>
                        {t.trades[id].tab}
                      </option>
                    ))}
                    <option value="anders">{o.tradeOther}</option>
                  </select>
                </div>
                <div className="field field-wide">
                  <label htmlFor="f-message">
                    {o.fields.message} <span className="field-opt">({o.fields.optional})</span>
                  </label>
                  <textarea id="f-message" name="message" rows={3} maxLength={2000} />
                </div>
                <div className="field-hp" aria-hidden="true">
                  <label htmlFor="f-website">Website</label>
                  <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
              </div>

              <button type="submit" className="btn btn-signal slip-submit" data-submit="">
                <span data-submit-label="">{o.submit}</span>
                <Icon name="arrow-right" />
              </button>
              <p className="slip-privacy">
                {o.privacy}{' '}
                <a className="text-link" href={privacyHref}>
                  {o.privacyLink}
                </a>
              </p>

              <div className="slip-fallback" data-fallback="" hidden>
                <p data-fallback-text="">{import.meta.env.PREVIEW ? o.previewNote : o.errors.generic}</p>
                <div className="slip-fallback-actions">
                  <a className="btn btn-ink" data-fallback-wa="" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">
                    <Icon name="whatsapp" />
                    {o.whatsapp}
                  </a>
                  <a className="btn btn-ghost-ink" data-fallback-mail="" href={`mailto:${site.email}`}>
                    <Icon name="envelope" />
                    {o.mail}
                  </a>
                </div>
              </div>
            </div>
          </form>

          <div className="slip slip-success" data-success="" hidden tabIndex={-1}>
            <div className="slip-paper">
              <span className="slip-stamp" aria-hidden="true">
                OK
              </span>
              <h3 className="slip-success-title">{o.success.title}</h3>
              <p>{o.success.text}</p>
              <a className="btn btn-ink" href={waHref(t.whatsapp.generic)} data-wa={t.whatsapp.named} target="_blank" rel="noopener">
                <Icon name="whatsapp" />
                {site.whatsappDisplay}
              </a>
            </div>
          </div>
          <p className="sr-only" role="status" aria-live="polite" data-status="" />
        </div>
      </div>
    </section>
  );
}
