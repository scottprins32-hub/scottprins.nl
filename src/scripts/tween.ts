/**
 * Mini-tween voor tellers en totalen (rAF, ~0,3 kB).
 * Bewust geen GSAP-import: zo blijft de configurator-bundle klein en
 * werkt de teller ook als de motion-bundle nog niet geladen is.
 */

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const activeTweens = new WeakMap<Element, number>();

/**
 * Telt de tekst van `el` soepel van de huidige naar de nieuwe waarde.
 * Bij reduced motion (of duration 0) wordt de waarde direct gezet.
 */
export function tweenNumber(
  el: HTMLElement,
  to: number,
  format: (n: number) => string,
  duration = 450,
): void {
  const from = Number(el.dataset.value ?? 0);
  el.dataset.value = String(to);

  const prev = activeTweens.get(el);
  if (prev) cancelAnimationFrame(prev);

  if (prefersReducedMotion() || duration <= 0 || from === to) {
    el.textContent = format(to);
    return;
  }

  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    el.textContent = format(Math.round(from + (to - from) * eased));
    if (t < 1) activeTweens.set(el, requestAnimationFrame(step));
  };
  activeTweens.set(el, requestAnimationFrame(step));
}
