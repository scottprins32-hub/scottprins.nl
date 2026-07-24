/**
 * Eén centrale plek voor GSAP + ScrollTrigger.
 * - Registreert de plugin precies één keer.
 * - Alle bewegende animaties draaien binnen gsap.matchMedia() en bestaan
 *   dus simpelweg niet voor bezoekers met prefers-reduced-motion.
 * - Bevat de "pacing-map" van de menukaart: nooit twee keer achter
 *   elkaar hetzelfde kunstje (fade → niets → parallax → fade → …).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Mobiele adresbalk laten we met rust: geen re-pin bij elke resize.
ScrollTrigger.config({ ignoreMobileResize: true });

// Font-swap verschuift layout → posities één keer herberekenen.
if (document.fonts?.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger };

export const REDUCED = '(prefers-reduced-motion: reduce)';
export const NO_PREFERENCE = '(prefers-reduced-motion: no-preference)';

export const prefersReducedMotion = (): boolean => window.matchMedia(REDUCED).matches;

/**
 * Zet de standaard-reveals en de sectie-pacing aan.
 * Wordt één keer aangeroepen vanaf index.astro.
 */
export function initSectionMotion(): void {
  const mm = gsap.matchMedia();

  mm.add(NO_PREFERENCE, () => {
    // 1) Generieke reveals: elk element met [data-reveal] in een
    //    fade-sectie of gewone sectie komt rustig omhoog.
    const fadeSections = document.querySelectorAll<HTMLElement>(
      '[data-pacing="fade"], [data-reveal-section]',
    );
    for (const section of fadeSections) {
      const targets = section.querySelectorAll('[data-reveal]');
      if (targets.length === 0) continue;
      gsap.from(targets, {
        y: 36,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
      });
    }

    // 2) Parallax-secties: alleen het decoratieve sectienummer beweegt
    //    subtiel mee (±30px, transform-only — geen layout-werk).
    const parallaxSections = document.querySelectorAll<HTMLElement>('[data-pacing="parallax"]');
    for (const section of parallaxSections) {
      const number = section.querySelector('[data-menu-number]');
      if (!number) continue;
      gsap.fromTo(
        number,
        { y: -30 },
        {
          y: 30,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    }

    // 3) Staggered kaarten in "Zo werkt het".
    const steps = document.querySelectorAll('[data-step-card]');
    if (steps.length > 0) {
      gsap.from(steps, {
        y: 48,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.16,
        scrollTrigger: { trigger: steps[0].parentElement, start: 'top 75%', once: true },
      });
    }
  });
}

/**
 * Telt [data-countup]-elementen op zodra ze in beeld komen.
 * Bij reduced motion staat de eindwaarde er direct.
 */
export function initCountups(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-countup]');
  for (const el of els) {
    const target = Number(el.dataset.countup ?? 0);
    const prefix = el.dataset.prefix ?? '';
    const suffix = el.dataset.suffix ?? '';
    const render = (n: number) => {
      el.textContent = `${prefix}${Math.round(n)}${suffix}`;
    };

    if (prefersReducedMotion()) {
      render(target);
      continue;
    }

    render(0);
    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => render(counter.value),
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  }
}
