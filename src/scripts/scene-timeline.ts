/**
 * Bouwt de GSAP-timeline die de HeroScene uit elkaar haalt en weer
 * opbouwt: schets (Dag 1) → stukken vliegen in (Dag 2–3) → accenten
 * en badges poppen (Dag 4) → cart-pill, gloed en sterretjes (Dag 5).
 *
 * De timeline is genormaliseerd op duur 1 en pauzeert standaard:
 * - de hero hangt hem aan ScrollTrigger (scrub);
 * - demo-sectie 11 speelt exact dezelfde timeline op tijd af.
 *
 * Aanroepen betekent: de scène wordt direct in de "uit elkaar"-stand
 * gezet. Niet aanroepen (no-JS / reduced motion) = afgebouwde stand.
 */
import { gsap } from './motion';

/* Waarvandaan elk stuk invliegt: [x, y] als fractie van de framebreedte/-hoogte, + rotatie (graden). */
const SCATTER: Record<string, [number, number, number]> = {
  headline: [-0.55, 0.18, -7],
  cta: [-0.4, 0.5, -12],
  chat: [0.55, -0.3, 9],
  pricecard: [-0.5, 0.55, 6],
  review: [0.05, 0.7, -5],
  stat: [0.5, 0.55, 8],
  chips: [-0.35, 0.45, 4],
};

/* Volgorde en startmoment (binnen 0–1) van de invliegende stukken. */
const ENTRANCES: Array<[piece: string, at: number]> = [
  ['headline', 0.16],
  ['cta', 0.24],
  ['chat', 0.3],
  ['pricecard', 0.4],
  ['review', 0.48],
  ['stat', 0.56],
  ['chips', 0.63],
];

export function buildSceneTimeline(root: HTMLElement): gsap.core.Timeline {
  const frame = root.querySelector<HTMLElement>('[data-piece="frame"]')!;
  const piece = (name: string) => frame.querySelector<HTMLElement>(`[data-piece="${name}"]`)!;
  const sketches = frame.querySelectorAll<HTMLElement>('[data-sketch]');
  const pops = frame.querySelectorAll<HTMLElement>('[data-pop]');
  const glow = frame.querySelector<HTMLElement>('[data-glow]')!;
  const sparks = root.querySelectorAll<HTMLElement>('[data-spark]');

  const W = frame.offsetWidth || 640;
  const H = frame.offsetHeight || 480;

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });

  // Alles in de startstand (de scène staat in HTML afgebouwd).
  for (const [name, [fx, fy, rot]] of Object.entries(SCATTER)) {
    gsap.set(piece(name), { x: fx * W, y: fy * H, rotation: rot, autoAlpha: 0 });
  }
  gsap.set([...pops], { scale: 0, transformOrigin: '50% 50%' });
  gsap.set(piece('pill'), { y: 0.12 * H, autoAlpha: 0 });
  gsap.set(glow, { opacity: 0 });

  // Dag 1 — schets: stippellijnen tekenen zichzelf (fade + kleine groei)
  tl.fromTo(
    sketches,
    { autoAlpha: 0, scale: 0.96, transformOrigin: '50% 50%' },
    { autoAlpha: 1, scale: 1, duration: 0.07, stagger: 0.035 },
    0.02,
  );

  // Dag 2–3 — de stukken van de site vliegen in
  for (const [name, at] of ENTRANCES) {
    tl.to(
      piece(name),
      { x: 0, y: 0, rotation: 0, autoAlpha: 1, duration: 0.11, ease: 'back.out(1.2)' },
      at,
    );
  }

  // Schets lost op zodra er echt gebouwd wordt
  tl.to(sketches, { autoAlpha: 0, duration: 0.08, stagger: 0.02 }, 0.34);

  // Dag 4 — content: badges, sterren en accenten poppen tevoorschijn
  tl.to(pops, { scale: 1, duration: 0.06, stagger: 0.02, ease: 'back.out(2.2)' }, 0.72);

  // Dag 5 — live: cart-pill valt binnen, gloed aan, sterretjes
  tl.to(piece('pill'), { y: 0, autoAlpha: 1, duration: 0.08, ease: 'back.out(1.6)' }, 0.85)
    .to(glow, { opacity: 1, duration: 0.1 }, 0.88)
    .fromTo(
      sparks,
      { scale: 0, rotation: -45, autoAlpha: 0, transformOrigin: '50% 50%' },
      { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.06, stagger: 0.015, ease: 'back.out(2)' },
      0.9,
    );

  return tl;
}
