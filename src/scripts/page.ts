/**
 * Wat elke pagina met de huisstijl nodig heeft: soepel scrollen, ankerlinks
 * met focus, binnenkomende koppen en magnetische knoppen.
 */
import { smoothScroll, hashLinks } from './motion/core';
import { reveals } from './motion/reveal';
import { magnetic } from './motion/magnetic';

let started = false;

export function initPage(): void {
  if (started) return;
  started = true;
  smoothScroll();
  hashLinks();
  reveals(document);
  magnetic(document);
}
