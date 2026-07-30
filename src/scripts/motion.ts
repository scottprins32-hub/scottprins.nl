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

/**
 * De `.defer-render`-secties (content-visibility: auto) staan bij het laden
 * op een geschátte hoogte en krijgen hun echte hoogte pas als je in de buurt
 * komt. Elke keer dat dat gebeurt verschuift alles eronder, en de posities
 * die ScrollTrigger bij het laden heeft uitgerekend kloppen niet meer —
 * waardoor triggers verderop nooit meer afgaan. Dus: opnieuw meten zodra er
 * een sectie echt rendert, gebundeld in één frame.
 */
let refreshQueued = false;
function queueRefresh(): void {
  if (refreshQueued) return;
  refreshQueued = true;
  requestAnimationFrame(() => {
    refreshQueued = false;
    ScrollTrigger.refresh();
  });
}

if ('oncontentvisibilityautostatechange' in document.body) {
  for (const section of document.querySelectorAll('.defer-render')) {
    section.addEventListener('contentvisibilityautostatechange', queueRefresh);
  }
}

export { gsap, ScrollTrigger };

export const REDUCED = '(prefers-reduced-motion: reduce)';
export const NO_PREFERENCE = '(prefers-reduced-motion: no-preference)';

export const prefersReducedMotion = (): boolean => window.matchMedia(REDUCED).matches;

/**
 * Vangnet onder elke reveal. `gsap.from` zet de blokken meteen op
 * autoAlpha 0; gaat de bijbehorende trigger daarna niet af, dan blijft de
 * sectie leeg. Een IntersectionObserver kijkt naar wat er écht in beeld
 * staat en kan dus niet de mist in gaan met verschoven posities: staat de
 * sectie in beeld en is er nog niets gebeurd, dan spelen we hem gewoon af.
 * Zichtbare inhoud gaat vóór een nette timing.
 */
function ensureRevealed(section: HTMLElement, tween: gsap.core.Tween): void {
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      if (tween.progress() === 0 && !tween.isActive()) tween.play();
    },
    // Pas als er een strook van betekenis in beeld staat, niet bij de eerste pixel.
    { rootMargin: '0px 0px -15% 0px' },
  );
  io.observe(section);
}

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
      const tween = gsap.from(targets, {
        y: 36,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
      });
      ensureRevealed(section, tween);
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
