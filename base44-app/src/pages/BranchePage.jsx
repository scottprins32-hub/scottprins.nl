/**
 * Landingspagina per branche (nu: fysiotherapie). Eigen tekst, het
 * upgrade-ding met de juiste branche al gekozen, de prijs en de bestelbon.
 */
import { useEffect } from 'react';
import { offer } from '@/data/offer';
import { usePageHead } from '@/lib/head';
import { useLocale } from '@/lib/locale';
import { initPage } from '@/scripts/page';
import SkipLink from '@/components/SkipLink';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Upgrade from '@/components/upgrade/Upgrade';
import Order from '@/components/Order';
import StickyCta from '@/components/StickyCta';
import Icon from '@/components/Icon';
import Rise from '@/components/Rise';
import './BranchePage.css';

export default function BranchePage({ branche: b }) {
  const locale = useLocale();
  const digits = String(offer.price);
  usePageHead({ locale, title: b.meta.title, description: b.meta.description, path: `/${b.slug}` });
  useEffect(() => {
    initPage();
  }, []);
  return (
    <>
      <SkipLink />
      <SiteNav home={false} />
      <main id="main" tabIndex={-1}>
        <section className="hero bp-hero" aria-labelledby="bp-title">
          <div className="wrap bp-grid">
            <p className="label bp-eyebrow intro-up" style={{ '--d': '0s' }}>
              {b.eyebrow}
            </p>
            <h1 id="bp-title" className="display bp-title">
              <Rise text={b.h1} />
            </h1>
            <p className="lead bp-intro intro-up" style={{ '--d': '0.45s' }}>
              {b.intro}
            </p>
            <div className="bp-ctas intro-up" style={{ '--d': '0.55s' }} data-sticky-after="">
              <a className="btn btn-signal" href="#bestellen" data-magnetic="">
                {b.ctaButton}
                <Icon name="arrow-right" />
              </a>
            </div>
          </div>
        </section>

        <section className="bp-demo" aria-labelledby="bp-demo-title">
          <div className="wrap">
            <h2 id="bp-demo-title" className="bp-h2" data-reveal="title">
              {b.demoTitle}
            </h2>
            <p className="lead bp-demo-lead" data-reveal="up">
              {b.demoLead}
            </p>
            <div className="bp-device">
              <Upgrade id="upgrade" trade={b.trade} />
            </div>
          </div>
        </section>

        <section className="section-pad bp-pain" aria-labelledby="bp-pain-title">
          <div className="wrap bp-two">
            <h2 id="bp-pain-title" className="display bp-h2-big" data-reveal="title">
              {b.painTitle}
            </h2>
            <ul className="bp-list">
              {b.pain.map((item) => (
                <li data-reveal="up" key={item}>
                  <Icon name="x" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-pad bp-body" aria-labelledby="bp-body-title">
          <div className="wrap bp-two">
            <h2 id="bp-body-title" className="display bp-h2-big" data-reveal="title">
              {b.bodyTitle}
            </h2>
            <div className="bp-text">
              {b.body.map((paragraph) => (
                <p className="lead" data-reveal="up" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="bp-price" aria-labelledby="bp-price-title">
          <div className="wrap bp-two">
            <div>
              <h2 id="bp-price-title" className="bp-price-q">
                {b.priceTitle}
              </h2>
              <p className="bp-amount" aria-hidden="true">
                <span>€</span>
                {digits}
              </p>
            </div>
            <div className="bp-price-copy">
              <p className="lead">{b.priceLead}</p>
              <h3 className="bp-cta-title">{b.ctaTitle}</h3>
              <p>{b.ctaLead}</p>
              <a className="btn btn-ink" href="#bestellen" data-magnetic="">
                {b.ctaButton}
                <Icon name="arrow-right" />
              </a>
            </div>
          </div>
        </section>

        <Order trade={b.trade} />
        <StickyCta />
      </main>
      <SiteFooter home={false} />
    </>
  );
}
