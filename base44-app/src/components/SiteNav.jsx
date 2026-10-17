/**
 * Vaste navigatie. Schuift weg bij naar beneden scrollen en komt terug bij
 * omhoog scrollen; met toetsenbordfocus erin blijft hij altijd staan.
 * Op de telefoon opent het menu als <dialog>: focus blijft erin en Esc
 * sluit hem, zonder eigen focus-val.
 */
import { useEffect } from 'react';
import { site } from '@/data/site';
import { altPath } from '@/data/content';
import { url } from '@/lib/url';
import { waHref } from '@/lib/whatsapp';
import { useLocale, useT } from '@/lib/locale';
import { initNav } from '@/scripts/nav';
import Logo from './Logo';
import LangSwitch from './LangSwitch';
import Icon from './Icon';
import './SiteNav.css';

/** Op de homepage zijn de ankers lokaal (#prijs); elders wijzen ze naar de homepage. */
export default function SiteNav({ home = true }) {
  const locale = useLocale();
  const { nav, whatsapp } = useT();
  const homeUrl = url(altPath('/', locale));
  const href = (hash) => (home ? hash : `${homeUrl}${hash}`);

  useEffect(() => {
    initNav();
  }, []);

  return (
    <header className="nav" data-site-nav="">
      <div className="wrap nav-inner">
        <a className="nav-home" href={home ? '#main' : homeUrl} aria-label={nav.home}>
          <Logo />
        </a>
        <nav className="nav-links" aria-label={nav.label}>
          <ul>
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={href(link.href)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-end">
          <LangSwitch className="nav-lang" />
          <a className="btn btn-signal nav-cta" href={href('#bestellen')} data-magnetic="">
            {nav.cta}
          </a>
          <button type="button" className="nav-menu" aria-haspopup="dialog" aria-controls="menu" data-menu-open="">
            <Icon name="list" />
            <span>{nav.menu}</span>
          </button>
        </div>
      </div>

      <dialog id="menu" className="menu" aria-label={nav.label} data-menu="">
        <div className="menu-inner wrap">
          <div className="menu-top">
            <Logo />
            <button type="button" className="nav-menu" data-menu-close="">
              <Icon name="x" />
              <span>{nav.close}</span>
            </button>
          </div>
          <nav aria-label={nav.label}>
            <ul className="menu-links">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a href={href(link.href)} data-menu-link="">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-bottom">
            <a className="btn btn-signal" href={href('#bestellen')} data-menu-link="">
              {nav.cta}
              <Icon name="arrow-right" />
            </a>
            <a className="menu-contact" href={waHref(whatsapp.generic)} data-wa={whatsapp.named} rel="noopener" target="_blank">
              <Icon name="whatsapp" />
              {site.whatsappDisplay}
            </a>
            <LangSwitch />
          </div>
        </div>
      </dialog>
    </header>
  );
}
