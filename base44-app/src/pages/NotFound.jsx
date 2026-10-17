/**
 * Een link die nergens heen gaat. Base44 serveert voor elk pad dezelfde
 * app; wat de router niet kent, landt hier. Altijd Nederlands, met een
 * knop naar de Engelse homepage.
 */
import { useEffect } from 'react';
import { site } from '@/data/site';
import { content } from '@/data/content';
import { url } from '@/lib/url';
import { usePageHead } from '@/lib/head';
import { initPage } from '@/scripts/page';
import SkipLink from '@/components/SkipLink';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Icon from '@/components/Icon';
import './NotFound.css';

export default function NotFound() {
  const { notFound } = content('nl');
  usePageHead({ locale: 'nl', title: `${notFound.title} | ${site.legalName}`, description: notFound.text, noindex: true });
  useEffect(() => {
    initPage();
  }, []);
  return (
    <>
      <SkipLink />
      <SiteNav home={false} />
      <main id="main" tabIndex={-1} className="lost">
        <div className="wrap">
          <p className="label lost-code">404</p>
          <h1 className="display lost-title">{notFound.title}</h1>
          <p className="lead lost-text">{notFound.text}</p>
          <div className="lost-actions">
            <a className="btn btn-signal" href={url('/')} data-magnetic="">
              {notFound.home}
              <Icon name="arrow-right" />
            </a>
            <a className="btn btn-ghost" href={url('/en/')} lang="en">
              {notFound.other}
            </a>
          </div>
        </div>
      </main>
      <SiteFooter home={false} />
    </>
  );
}
