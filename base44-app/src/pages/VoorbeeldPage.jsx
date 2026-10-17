/**
 * Een nieuwe voorbeeldsite op ware grootte (/voorbeeld/bakker/ enz.).
 * De naam komt uit de hash (#Bakkerij%20Prins), zodat Scott een prospect
 * een link met de eigen naam erin kan sturen. De hash gaat nooit naar een
 * server. Onderaan een smalle balk van Scott: dit is een voorbeeld, en zo
 * claim je hem.
 */
import { useEffect, useRef } from 'react';
import { altPath } from '@/data/content';
import { SAMPLE_NAMES, isTradeId } from '@/data/trade-ids';
import { url } from '@/lib/url';
import { usePageHead } from '@/lib/head';
import { useLocale, useT } from '@/lib/locale';
import { siteIntro } from '@/scripts/site-intro';
import { reducedMotion } from '@/scripts/motion/core';
import { currentName, setState } from '@/scripts/state';
import SkipLink from '@/components/SkipLink';
import SiteAfter from '@/components/upgrade/SiteAfter';
import Icon from '@/components/Icon';
import '@/styles/sites.css';
import './VoorbeeldPage.css';

function personalise(root, trade, suffix) {
  /* De naam uit de link (#naam) wint; anders wat je eerder in dit
     tabblad typte. */
  let fromHash = '';
  try {
    fromHash = decodeURIComponent(window.location.hash.slice(1)).trim();
  } catch {
    /* Een kapotte hash: dan gewoon zonder. */
  }
  if (isTradeId(trade)) setState({ trade });
  if (fromHash) setState({ typed: fromHash });
  const name = currentName();
  for (const el of root.querySelectorAll('[data-naam]')) el.textContent = name;
  document.title = `${name} | ${suffix}`;
  const site = root.querySelector('.new');
  if (site && !reducedMotion()) siteIntro(site);
}

export default function VoorbeeldPage({ trade }) {
  const locale = useLocale();
  const t = useT();
  const v = t.voorbeeld;
  const home = url(altPath('/', locale));
  const ref = useRef(null);
  usePageHead({
    locale,
    title: `${SAMPLE_NAMES[trade]} | ${v.titleSuffix}`,
    description: v.note,
    path: `/voorbeeld/${trade}`,
    noindex: true,
  });
  useEffect(() => personalise(ref.current, trade, v.titleSuffix), [trade, v.titleSuffix]);

  return (
    <>
      <SkipLink />
      <main id="main" className="vb" ref={ref}>
        <div className="vb-site">
          <SiteAfter trade={trade} name={SAMPLE_NAMES[trade]} mode="page" eager />
        </div>
      </main>

      <aside className="vb-bar" aria-label={v.badge}>
        <span className="vb-badge">{v.badge}</span>
        <p className="vb-note">{v.note}</p>
        <a className="vb-back" href={`${home}#upgrade`}>
          <Icon name="arrow-left" />
          <span>{v.back}</span>
        </a>
        <a className="btn btn-signal vb-claim" href={`${home}#bestellen`}>
          {v.claim}
          <Icon name="arrow-right" />
        </a>
      </aside>
    </>
  );
}
