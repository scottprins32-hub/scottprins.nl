/**
 * Footer: de zin van de site nog één keer, groot, en daaronder de
 * gegevens. Plus een klokje dat telt hoeveel eerste indrukken er in jouw
 * bezoek passen. De btw-regel verschijnt pas als er een echt nummer staat.
 */
import { useEffect, useRef } from 'react';
import { site } from '@/data/site';
import { altPath } from '@/data/content';
import { url } from '@/lib/url';
import { waHref } from '@/lib/whatsapp';
import { useLocale, useT } from '@/lib/locale';
import Icon from './Icon';
import LangSwitch from './LangSwitch';
import Logo from './Logo';
import './SiteFooter.css';

/* Hoe lang ben je hier, en hoeveel keer 50 ms is dat? Telt alleen
   zolang de footer in beeld is. */
function startTimer(el, template, locale) {
  const nf = new Intl.NumberFormat(locale === 'en' ? 'en-GB' : 'nl-NL');
  let timer = 0;
  const render = () => {
    const ms = performance.now();
    const total = Math.floor(ms / 1000);
    const min = Math.floor(total / 60);
    const sec = total % 60;
    const tijd = min > 0 ? `${min} min ${sec} sec` : `${sec} sec`;
    el.textContent = template.replace('{tijd}', tijd).replace('{aantal}', nf.format(Math.floor(ms / 50)));
  };
  const io = new IntersectionObserver(([entry]) => {
    window.clearInterval(timer);
    if (entry?.isIntersecting) {
      render();
      timer = window.setInterval(render, 1000);
    }
  });
  io.observe(el);
  return () => {
    io.disconnect();
    window.clearInterval(timer);
  };
}

export default function SiteFooter({ home = true }) {
  const locale = useLocale();
  const { footer, whatsapp } = useT();
  const orderHref = home ? '#bestellen' : `${url(altPath('/', locale))}#bestellen`;
  const hasBtw = !footer.btw.startsWith('{');
  const timerRef = useRef(null);

  useEffect(() => startTimer(timerRef.current, footer.timer, locale), [footer.timer, locale]);

  return (
    <footer className="footer" data-sticky-hide="">
      <div className="wrap">
        <div className="footer-closer">
          <p className="display footer-title" data-reveal="title">
            {footer.closer}
          </p>
          <a className="btn btn-signal" href={orderHref} data-magnetic="">
            {footer.closerCta}
            <Icon name="arrow-right" />
          </a>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h2 className="label footer-label">{footer.contactLabel}</h2>
            <a className="footer-link" href={waHref(whatsapp.generic)} data-wa={whatsapp.named} target="_blank" rel="noopener">
              <Icon name="whatsapp" />
              {site.whatsappDisplay}
            </a>
            <a className="footer-link" href={`tel:+${site.whatsapp}`}>
              <Icon name="phone" />
              {footer.phoneLabel}
            </a>
            <a className="footer-link" href={`mailto:${site.email}`}>
              <Icon name="envelope" />
              {site.email}
            </a>
          </div>
          {site.addressStreet && (
            <div className="footer-col">
              <h2 className="label footer-label">{footer.addressLabel}</h2>
              <p>
                {site.addressStreet}
                <br />
                {site.addressCity}
              </p>
              <p className="footer-note">{footer.addressNote}</p>
            </div>
          )}
          <div className="footer-col">
            <h2 className="label footer-label">{footer.detailsLabel}</h2>
            <p>
              {site.legalName}
              <br />
              {footer.kvkLabel} {footer.kvk}
              {hasBtw && (
                <>
                  <br />
                  {footer.btwLabel} {footer.btw}
                </>
              )}
            </p>
            <p className="footer-legal">
              <a className="text-link" href={url(altPath('/privacy', locale))}>
                {footer.privacyLink}
              </a>
              <a className="text-link" href={url(altPath('/voorwaarden', locale))}>
                {footer.termsLink}
              </a>
            </p>
          </div>
          <div className="footer-col footer-end">
            <Logo />
            <LangSwitch />
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-timer" ref={timerRef} />
          <p>{footer.rights}</p>
          <p>{footer.credits}</p>
        </div>
      </div>
    </footer>
  );
}
