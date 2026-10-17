/**
 * De lijn langs de stappen groeit mee met het scrollen (scrub), en elke
 * stap licht op als de lijn hem haalt. Bij reduced motion: alles aan.
 */
import { gsap, ScrollTrigger, OK, REDUCE } from './motion/core';

export function initProcess(): void {
  const list = document.querySelector<HTMLElement>('[data-steps]');
  const fill = list?.querySelector<HTMLElement>('[data-line]');
  if (!list || !fill) return;
  const steps = Array.from(list.querySelectorAll<HTMLElement>('[data-step]'));

  const mm = gsap.matchMedia();
  mm.add({ ok: OK, reduce: REDUCE }, (context) => {
    if (context.conditions?.reduce) {
      steps.forEach((step) => step.classList.add('is-active'));
      return;
    }
    gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: list, start: 'top 62%', end: 'bottom 62%', scrub: 0.6 },
      },
    );
    steps.forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 62%',
        onEnter: () => step.classList.add('is-active'),
        onLeaveBack: () => step.classList.remove('is-active'),
      });
      gsap.from(step.querySelectorAll('.process-when, .process-step-title, .process-text'), {
        y: 28,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.07,
        scrollTrigger: { trigger: step, start: 'top 85%', once: true },
      });
    });
  });
}
