/**
 * De bouw-timeline van de scène: van losse stukken die in de ruimte
 * zweven naar één afgebouwde, oplichtende website.
 *
 * Vijf bedrijven, gelijk aan de vijf bouwdagen die de hero benoemt:
 *   Dag 1  schets      — het frame en de stippellijnen
 *   Dag 2  ontwerp     — kopregel, knop en chatbot komen aanvliegen
 *   Dag 3  bouwen      — prijskaart, review en stat-tegel
 *   Dag 4  content     — tijdsloten, badges, sterren
 *   Dag 5  live        — camera draait vlak, cart-pill valt, gloed aan
 *
 * De timeline is genormaliseerd op duur 1 en pauzeert standaard:
 * - de hero speelt bedrijf 1–2 zelf af bij het laden en laat ScrollTrigger
 *   de rest scrubben;
 * - demo-sectie 11 speelt exact dezelfde timeline op tijd af.
 */
import { gsap } from './motion';

/** Startpositie van elk stuk: [x, y] als fractie van het frame, rotatie, extra diepte. */
const SCATTER: Record<string, [x: number, y: number, rotY: number, z: number]> = {
  headline: [-0.42, 0.1, 26, 260],
  cta: [-0.3, 0.34, 32, 340],
  chat: [0.44, -0.22, -30, 420],
  pricecard: [-0.36, 0.4, 24, 300],
  review: [0.02, 0.5, -14, 220],
  stat: [0.38, 0.36, -26, 360],
  chips: [-0.26, 0.3, 18, 200],
  pill: [0.18, 0.42, -20, 460],
};

/** Wanneer elk stuk landt (start van de tween binnen 0–1). */
const ENTRANCES: Array<[piece: string, at: number]> = [
  ['headline', 0.1],
  ['cta', 0.17],
  ['chat', 0.22],
  ['pricecard', 0.36],
  ['review', 0.44],
  ['stat', 0.52],
  ['chips', 0.62],
];

/**
 * Tot hier speelt de intro zichzelf af, zónder scrollen. Bewust ver
 * genoeg: bij stilstand kijk je naar een hérkenbare website (frame,
 * kopregel, knop, chatbot, prijskaart) die in 3D staat te zweven —
 * geen half lege schets. Scrollen maakt het af.
 */
export const INTRO_END = 0.5;

export function buildSceneTimeline(root: HTMLElement): gsap.core.Timeline {
  const scene = root.querySelector<HTMLElement>('[data-scene]')!;
  const piece = (name: string) => scene.querySelector<HTMLElement>(`[data-piece="${name}"]`)!;
  const frame = piece('frame');
  const floor = scene.querySelector<HTMLElement>('[data-floor]')!;
  const sketches = scene.querySelectorAll<HTMLElement>('[data-sketch]');
  const pops = scene.querySelectorAll<HTMLElement>('[data-pop]');
  const glow = scene.querySelector<HTMLElement>('[data-glow]')!;
  const sparks = scene.querySelectorAll<HTMLElement>('[data-spark]');

  const W = frame.offsetWidth || 640;
  const H = frame.offsetHeight || 480;

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });

  // --- Begintoestand: alles los in de ruimte, camera gekanteld ---------
  gsap.set(scene, { rotationX: 14, rotationY: -24 });
  gsap.set([frame, floor], { autoAlpha: 0, scale: 0.92 });
  gsap.set(glow, { autoAlpha: 0 });
  for (const [name, [fx, fy, rotY, z]] of Object.entries(SCATTER)) {
    gsap.set(piece(name), {
      x: fx * W,
      y: fy * H,
      z,
      rotationY: rotY,
      rotationX: -8,
      autoAlpha: 0,
    });
  }
  gsap.set([...pops], { scale: 0, transformOrigin: '50% 50%' });

  // --- Dag 1: het frame verschijnt en de schets wordt getekend ---------
  tl.to([frame, floor], { autoAlpha: 1, scale: 1, duration: 0.09, ease: 'power3.out' }, 0)
    .fromTo(
      sketches,
      { autoAlpha: 0, scale: 0.9, transformOrigin: '50% 50%' },
      { autoAlpha: 1, scale: 1, duration: 0.05, stagger: 0.02 },
      0.03,
    );

  // --- Dag 2–4: de stukken komen uit de diepte aanvliegen --------------
  for (const [name, at] of ENTRANCES) {
    tl.to(
      piece(name),
      {
        x: 0,
        y: 0,
        z: (i, target: HTMLElement) => parseFloat(getComputedStyle(target).getPropertyValue('--z')) || 0,
        rotationY: 0,
        rotationX: 0,
        autoAlpha: 1,
        duration: 0.13,
        ease: 'power3.out',
      },
      at,
    );
  }

  // Schets lost op zodra er echt gebouwd wordt
  tl.to(sketches, { autoAlpha: 0, duration: 0.06, stagger: 0.015 }, 0.34);

  // Badges, sterren en accenten poppen tevoorschijn
  tl.to(pops, { scale: 1, duration: 0.05, stagger: 0.015, ease: 'back.out(2.4)' }, 0.66);

  // --- Dag 5: camera draait vlak, alles klikt op zijn plek ------------
  tl.to(scene, { rotationX: 0, rotationY: 0, duration: 0.16, ease: 'power2.inOut' }, 0.72);
  for (const name of Object.keys(SCATTER)) {
    if (name === 'pill') continue;
    tl.to(piece(name), { z: 0, duration: 0.16, ease: 'power2.inOut' }, 0.72);
  }

  // De cart-pill valt als laatste binnen, dan de gloed en de sterretjes
  tl.to(piece('pill'), { x: 0, y: 0, z: 0, rotationY: 0, rotationX: 0, autoAlpha: 1, duration: 0.1, ease: 'back.out(1.6)' }, 0.84)
    .to(glow, { autoAlpha: 1, duration: 0.1 }, 0.88)
    .fromTo(
      sparks,
      { scale: 0, rotation: -45, autoAlpha: 0, transformOrigin: '50% 50%' },
      { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.06, stagger: 0.015, ease: 'back.out(2)' },
      0.9,
    );

  return tl;
}

/**
 * Laat de scène ademen: de stukken zweven zachtjes op hun plek zodat het
 * beeld ook zónder scrollen leeft. Retourneert een kill-functie.
 */
export function startIdleFloat(root: HTMLElement): () => void {
  const pieces = [...root.querySelectorAll<HTMLElement>('.piece')];
  const tweens = pieces.map((el, i) =>
    gsap.to(el, {
      yPercent: i % 2 === 0 ? -1.6 : 1.4,
      duration: 3 + (i % 4) * 0.6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 0.18,
    }),
  );
  return () => tweens.forEach((t) => t.kill());
}

/**
 * Kantelt de scène subtiel mee met de muis — het duidelijkste signaal dat
 * dit géén video is. Gebruikt quickTo (één tween, geen listener-storm).
 */
export function attachPointerTilt(camera: HTMLElement): () => void {
  // rotationX/rotationY zijn de GSAP-namen; geen layout-reads per event,
  // we rekenen simpelweg vanaf het midden van het scherm.
  const rotY = gsap.quickTo(camera, 'rotationY', { duration: 0.7, ease: 'power2.out' });
  const rotX = gsap.quickTo(camera, 'rotationX', { duration: 0.7, ease: 'power2.out' });

  const onMove = (event: PointerEvent) => {
    const dx = event.clientX / window.innerWidth - 0.5;
    const dy = event.clientY / window.innerHeight - 0.5;
    rotY(gsap.utils.clamp(-10, 10, dx * 20));
    rotX(gsap.utils.clamp(-8, 8, -dy * 16));
  };
  const onLeave = () => {
    rotY(0);
    rotX(0);
  };

  // Alleen op apparaten met een echte muis: op touch is dit zinloos.
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (canHover) {
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
  }

  return () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerleave', onLeave);
  };
}
