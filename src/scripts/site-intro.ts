/**
 * De intro van een nieuwe voorbeeldsite: woorden van de kop komen omhoog,
 * de foto zakt van iets te dichtbij op zijn plek, de rest volgt. Gebruikt
 * in het upgrade-ding (na de onthulling) en op /voorbeeld/.
 */
import { gsap } from './motion/core';

export function siteIntro(site: HTMLElement): gsap.core.Timeline {
  const q = gsap.utils.selector(site);
  return gsap
    .timeline({ defaults: { ease: 'expo.out' } })
    .from(q('.new-title .w'), { yPercent: 60, opacity: 0, duration: 1.05, stagger: 0.045 }, 0.05)
    .from(q('[data-a="eyebrow"], [data-a="sub"], [data-a="ctas"]'), { y: 26, opacity: 0, duration: 0.9, stagger: 0.07 }, 0.18)
    .from(q('[data-a="media"] img'), { scale: 1.2, duration: 1.7 }, 0)
    .from(q('[data-a="facts"] li'), { y: 18, opacity: 0, duration: 0.8, stagger: 0.07 }, 0.4);
}
