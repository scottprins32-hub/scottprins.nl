/**
 * Magnetische knoppen: de knop schuift een stukje mee naar de cursor en
 * veert terug als je weggaat. Alleen met een muis, nooit bij reduced motion,
 * en zo subtiel dat de klikplek nooit wegloopt (max. ~10px).
 */
import { gsap, finePointer, reducedMotion } from './core';

export function magnetic(root: ParentNode = document): void {
  if (!finePointer() || reducedMotion()) return;
  root.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magnetic || 0.25);
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(gsap.utils.clamp(-10, 10, dx * strength));
      yTo(gsap.utils.clamp(-8, 8, dy * strength));
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)', overwrite: true });
    });
  });
}
