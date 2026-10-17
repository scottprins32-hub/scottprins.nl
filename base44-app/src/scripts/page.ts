/**
 * Wat elke pagina met de huisstijl nodig heeft: soepel scrollen, ankerlinks
 * met focus, binnenkomende koppen, magnetische knoppen en WhatsApp-links met
 * de naam van je zaak erin.
 */
import { smoothScroll, hashLinks, getLenis } from './motion/core';
import { reveals } from './motion/reveal';
import { magnetic } from './motion/magnetic';
import { currentName, getState, subscribe } from './state';

let started = false;

export function initPage(): void {
  if (started) return;
  started = true;
  smoothScroll();
  hashLinks();
  jumpToHash();
  reveals(document);
  magnetic(document);
  personalWhatsApp();
}

/**
 * Elke WhatsApp-link heeft al een eerste bericht. Typte de bezoeker de naam
 * van zijn zaak in het upgrade-ding, dan staat die erin (data-wa is het
 * sjabloon met {name}). Zonder naam blijft het algemene bericht staan.
 */
function personalWhatsApp(): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[data-wa]'));
  if (!links.length) return;
  const generic = links.map((link) => link.href);
  const apply = () => {
    const name = getState().typed.trim() ? currentName() : '';
    links.forEach((link, i) => {
      const text = link.dataset.wa?.replace('{name}', name);
      link.href = name && text ? `${generic[i].split('?')[0]}?text=${encodeURIComponent(text)}` : generic[i];
    });
  };
  apply();
  subscribe((_, changed) => {
    if ('typed' in changed) apply();
  });
}

/**
 * Binnenkomen op /#bestellen (vanaf een andere pagina, of een gedeelde
 * link): in een single-page app bestaat de sectie pas als React hem heeft
 * getekend, dus de browser kan er zelf niet naartoe springen. Dat doen we
 * hier, zodra de lettertypes er zijn (anders klopt de hoogte nog niet).
 */
function jumpToHash(): void {
  const hash = window.location.hash.slice(1);
  if (!hash) return;
  let el: HTMLElement | null = null;
  try {
    el = document.getElementById(decodeURIComponent(hash));
  } catch {
    return;
  }
  if (!el) return;
  const target = el;
  const go = () => {
    const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const y = Math.max(0, target.getBoundingClientRect().top + window.scrollY - margin);
    window.scrollTo(0, y);
    getLenis()?.scrollTo(y, { immediate: true, force: true });
  };
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
  if (fonts) fonts.ready.then(() => requestAnimationFrame(go));
  else requestAnimationFrame(go);
}
