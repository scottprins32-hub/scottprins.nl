/**
 * Binnenkomende tekst en blokken, gestuurd door data-attributen:
 *
 *   data-reveal="title"  sectiekoppen: regels schuiven uit een masker
 *   data-reveal="up"     blokken: rustig omhoog en zichtbaar
 *
 * Split-text alleen voor de hero en sectiekoppen; lopende tekst splitsen
 * we bewust niet. Bij reduced motion staat alles er gewoon, meteen.
 */
import { gsap, SplitText, OK, REDUCE } from './core';

export function reveals(root: ParentNode = document): void {
  const mm = gsap.matchMedia();
  mm.add({ ok: OK, reduce: REDUCE }, (context) => {
    if (!context.conditions?.ok) return;

    root.querySelectorAll<HTMLElement>('[data-reveal="title"]').forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        /* Alleen regels: woorden blijven heel, dus een schermlezer leest de
           tekst gewoon voor. Geen aria-label (dat mag niet op elk element). */
        aria: 'none',
        autoSplit: true,
        onSplit: (split) =>
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.075,
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          }),
      });
    });

    root.querySelectorAll<HTMLElement>('[data-reveal="up"]').forEach((el) => {
      gsap.from(el, {
        y: 32,
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.out',
        delay: Number(el.dataset.revealDelay ?? 0),
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
  });
}
