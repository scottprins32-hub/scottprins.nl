/**
 * De prijs komt binnen: de cijfers schuiven één voor één omhoog uit hun
 * eigen masker, en de vinkjes ploppen erin als de lijst in beeld komt.
 * Zonder motion staan ze er gewoon; de prijs is nooit verborgen.
 */
import { gsap, OK } from './motion/core';

export function initPrice(): void {
  const mm = gsap.matchMedia();
  mm.add(OK, () => {
    const amount = document.querySelector<HTMLElement>('[data-price-amount]');
    if (amount) {
      gsap.from(amount.querySelectorAll('.price-digit > span, .price-cur'), {
        yPercent: 105,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: amount, start: 'top 88%', once: true },
      });
    }
    const list = document.querySelector<HTMLElement>('[data-checklist]');
    if (list) {
      gsap.from(list.querySelectorAll('.price-check'), {
        scale: 0,
        rotate: -45,
        duration: 0.7,
        ease: 'back.out(2.2)',
        stagger: 0.06,
        scrollTrigger: { trigger: list, start: 'top 85%', once: true },
      });
    }
  });
}
