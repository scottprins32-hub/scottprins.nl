/**
 * Eén plek voor GSAP, ScrollTrigger, SplitText en Lenis.
 *
 * - Eén rAF: de ticker van GSAP drijft Lenis aan (en alles wat er verder
 *   per frame moet gebeuren). Geen losse requestAnimationFrame-lussen.
 * - Lenis alleen bij `prefers-reduced-motion: no-preference`. Op touch
 *   scrolt Lenis standaard native; dat laten we zo.
 * - Hashlinks lopen via Lenis, met scroll-margin-top als ruimte voor de
 *   navigatie, en de focus verhuist mee naar het doel (anders blijft een
 *   toetsenbordgebruiker achter op de link).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText };

export const REDUCE = '(prefers-reduced-motion: reduce)';
export const OK = '(prefers-reduced-motion: no-preference)';
export const reducedMotion = (): boolean => window.matchMedia(REDUCE).matches;
export const finePointer = (): boolean => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let lenis: Lenis | null = null;

export function smoothScroll(): Lenis | null {
  if (lenis || reducedMotion()) return lenis;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export const getLenis = (): Lenis | null => lenis;

/** Scrolt naar een element, met of zonder Lenis. De ruimte voor de
    navigatie komt uit scroll-margin-top (global.css); Lenis leest die zelf. */
export function scrollToEl(el: HTMLElement): void {
  if (lenis) lenis.scrollTo(el, { duration: 1.25 });
  else el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

/** Interne hashlinks: soepel scrollen én focus meeverhuizen. */
export function hashLinks(): void {
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
    const link = (event.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
    if (!link || link.target === '_blank') return;
    const target = new URL(link.href, location.href);
    if (target.pathname !== location.pathname || !target.hash || target.hash === '#') return;
    const el = document.getElementById(decodeURIComponent(target.hash.slice(1)));
    if (!el) return;
    event.preventDefault();
    scrollToEl(el);
    history.pushState(null, '', target.hash);
    if (!el.matches('a, button, input, select, textarea, [tabindex]')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });
}
