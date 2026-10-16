/**
 * Wat elke pagina met de huisstijl nodig heeft: soepel scrollen, ankerlinks
 * met focus, binnenkomende koppen, magnetische knoppen en WhatsApp-links met
 * de naam van je zaak erin.
 */
import { smoothScroll, hashLinks } from './motion/core';
import { reveals } from './motion/reveal';
import { magnetic } from './motion/magnetic';
import { currentName, getState, subscribe } from './state';

let started = false;

export function initPage(): void {
  if (started) return;
  started = true;
  smoothScroll();
  hashLinks();
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
