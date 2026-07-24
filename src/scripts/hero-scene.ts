/**
 * De "scroll-video" van de hero: een website die zichzelf opbouwt uit
 * wireframe-blokken en eindigt als gloeiende, afgemaakte site.
 *
 * Volledig programmatisch getekend — geen videobestand, geen frames op
 * disk (~4 kB code i.p.v. 300 kB video). `drawScene` is puur: geef 'm
 * een context, afmetingen en een progress (0–1) en hij tekent dat frame.
 * Daardoor werkt hij zowel scroll-gestuurd (hero) als tijd-gestuurd
 * (demo-sectie "Optie 11").
 */

export interface SceneColors {
  accent: string;
  cream: string;
  ink: string;
}

/** Leest de kleuren uit de CSS-variabelen zodat een accent-swap doorwerkt. */
export function getSceneColors(): SceneColors {
  const styles = getComputedStyle(document.documentElement);
  return {
    accent: styles.getPropertyValue('--accent').trim() || '#4F46E5',
    cream: '#FAF8F4',
    ink: '#0B0E11',
  };
}

/* Eén blok van de wireframe-site. Posities relatief aan het content-vlak
   (0–1); scatter = startpositie/rotatie waarvandaan het blok invliegt.  */
interface Block {
  x: number; y: number; w: number; h: number;
  scatter: [dx: number, dy: number, rot: number];
  t0: number; t1: number;          // venster binnen de assemble-fase
  kind: 'bar' | 'card' | 'cta' | 'logo' | 'image';
}

const BLOCKS: Block[] = [
  { x: 0.04, y: 0.05, w: 0.1,  h: 0.07, scatter: [-0.5, -0.4, -0.6], t0: 0.00, t1: 0.16, kind: 'logo' },
  { x: 0.62, y: 0.06, w: 0.15, h: 0.045, scatter: [0.5, -0.35, 0.4], t0: 0.05, t1: 0.21, kind: 'bar' },
  { x: 0.8,  y: 0.06, w: 0.15, h: 0.045, scatter: [0.65, -0.25, 0.7], t0: 0.09, t1: 0.25, kind: 'bar' },
  { x: 0.04, y: 0.24, w: 0.52, h: 0.085, scatter: [-0.7, 0.15, -0.3], t0: 0.14, t1: 0.34, kind: 'bar' },
  { x: 0.04, y: 0.37, w: 0.38, h: 0.05,  scatter: [-0.55, 0.35, 0.5], t0: 0.2, t1: 0.4, kind: 'bar' },
  { x: 0.64, y: 0.2,  w: 0.32, h: 0.36,  scatter: [0.7, 0.3, 0.35],   t0: 0.24, t1: 0.46, kind: 'image' },
  { x: 0.04, y: 0.47, w: 0.2,  h: 0.085, scatter: [-0.4, 0.55, -0.8], t0: 0.3, t1: 0.5, kind: 'cta' },
  { x: 0.04, y: 0.68, w: 0.28, h: 0.27,  scatter: [-0.45, 0.6, 0.3],  t0: 0.42, t1: 0.66, kind: 'card' },
  { x: 0.36, y: 0.68, w: 0.28, h: 0.27,  scatter: [0.0, 0.75, -0.25], t0: 0.5, t1: 0.74, kind: 'card' },
  { x: 0.68, y: 0.68, w: 0.28, h: 0.27,  scatter: [0.5, 0.62, 0.45],  t0: 0.58, t1: 0.82, kind: 'card' },
];

/* Sterretjes die in de slotfase oplichten (posities relatief aan frame). */
const SPARKS: Array<[number, number, number]> = [
  [-0.09, 0.12, 0.86], [1.07, 0.2, 0.9], [1.1, 0.75, 0.94], [-0.07, 0.8, 0.9], [0.5, -0.12, 0.88],
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
): void {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, Math.min(r, w / 2, h / 2));
}

/** Tekent één frame van de scène op progress p (0 = los zand, 1 = af). */
export function drawScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: number,
  colors: SceneColors,
): void {
  ctx.clearRect(0, 0, w, h);

  // Framemaat: past altijd binnen het canvas, met ademruimte.
  const fw = Math.min(w * 0.88, (h * 0.72) / 0.7, 640);
  const fh = fw * 0.7;
  const fx = (w - fw) / 2;
  const fy = (h - fh) / 2;
  const chrome = fh * 0.09;
  const unit = fw / 100; // basiseenheid voor lijndiktes/radii

  const framePhase = seg(p, 0, 0.14);
  const assemble = seg(p, 0.1, 0.78);
  const fill = seg(p, 0.7, 0.9);
  const glow = seg(p, 0.86, 1);

  // ---- Gloed achter het frame (slotfase) --------------------------------
  if (glow > 0) {
    const grad = ctx.createRadialGradient(
      w / 2, h / 2, fw * 0.1,
      w / 2, h / 2, fw * 0.85,
    );
    grad.addColorStop(0, `rgba(79, 70, 229, ${0.22 * glow})`);
    grad.addColorStop(1, 'rgba(79, 70, 229, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  // ---- Browserframe ------------------------------------------------------
  if (framePhase > 0) {
    const scale = 0.94 + 0.06 * easeOutCubic(framePhase);
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.scale(scale, scale);
    ctx.translate(-w / 2, -h / 2);
    ctx.globalAlpha = framePhase;

    // Gloedrand: 2 extra strokes i.p.v. shadowBlur (GPU-vriendelijk).
    if (glow > 0) {
      for (let i = 2; i >= 1; i--) {
        ctx.strokeStyle = colors.accent;
        ctx.globalAlpha = 0.16 * glow / i;
        ctx.lineWidth = unit * (1 + i * 2.2);
        roundRect(ctx, fx, fy, fw, fh, unit * 3.5);
        ctx.stroke();
      }
      ctx.globalAlpha = framePhase;
    }

    ctx.strokeStyle = glow > 0 ? colors.accent : `rgba(250, 248, 244, 0.75)`;
    ctx.lineWidth = unit * 0.7;
    roundRect(ctx, fx, fy, fw, fh, unit * 3.5);
    ctx.stroke();

    // Chromebalk + verkeerslichtjes
    ctx.strokeStyle = 'rgba(250, 248, 244, 0.35)';
    ctx.beginPath();
    ctx.moveTo(fx, fy + chrome);
    ctx.lineTo(fx + fw, fy + chrome);
    ctx.stroke();
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i === 0 && glow > 0.5 ? colors.accent : 'rgba(250, 248, 244, 0.5)';
      ctx.beginPath();
      ctx.arc(fx + unit * 4 + i * unit * 4, fy + chrome / 2, unit * 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // ---- Content-blokken ---------------------------------------------------
  const cx = fx + fw * 0.03;
  const cy = fy + chrome + fh * 0.03;
  const cw = fw * 0.94;
  const ch = fh - chrome - fh * 0.06;

  for (const block of BLOCKS) {
    const t = easeOutCubic(seg(assemble, block.t0, block.t1));
    if (t <= 0) continue;

    const bx = cx + block.x * cw;
    const by = cy + block.y * ch;
    const bw = block.w * cw;
    const bh = block.h * ch;

    // Van scatter-positie naar eindpositie
    const dx = block.scatter[0] * fw * (1 - t);
    const dy = block.scatter[1] * fh * (1 - t);
    const rot = block.scatter[2] * (1 - t);

    ctx.save();
    ctx.translate(bx + bw / 2 + dx, by + bh / 2 + dy);
    ctx.rotate(rot);
    ctx.globalAlpha = t;

    const r = unit * 1.6;
    const isAccent = block.kind === 'cta' || block.kind === 'logo';

    // Wireframe-fase: alleen contouren. Fill-fase: blokken "worden echt".
    if (fill > 0) {
      ctx.fillStyle = isAccent
        ? colors.accent
        : block.kind === 'image'
          ? `rgba(79, 70, 229, ${0.16 * fill})`
          : `rgba(250, 248, 244, ${(block.kind === 'bar' ? 0.75 : 0.08) * fill})`;
      roundRect(ctx, -bw / 2, -bh / 2, bw, bh, r);
      if (isAccent) ctx.globalAlpha = t * (0.25 + 0.75 * fill);
      ctx.fill();
      ctx.globalAlpha = t;
    }
    ctx.strokeStyle = isAccent
      ? colors.accent
      : `rgba(250, 248, 244, ${0.55 - 0.3 * fill})`;
    ctx.lineWidth = unit * 0.55;
    roundRect(ctx, -bw / 2, -bh / 2, bw, bh, r);
    ctx.stroke();

    // Detail-lijntjes in kaarten en het imageblok
    if (block.kind === 'card') {
      ctx.strokeStyle = `rgba(250, 248, 244, ${0.35 + 0.25 * fill})`;
      ctx.lineWidth = unit * 0.45;
      const lineW = bw * 0.62;
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.moveTo(-bw / 2 + bw * 0.12, bh * 0.05 + i * bh * 0.18);
        ctx.lineTo(-bw / 2 + bw * 0.12 + lineW * (i === 0 ? 1 : 0.7), bh * 0.05 + i * bh * 0.18);
        ctx.stroke();
      }
      // "afbeelding" bovenin de kaart
      ctx.fillStyle = `rgba(250, 248, 244, ${0.08 + 0.1 * fill})`;
      roundRect(ctx, -bw / 2 + bw * 0.12, -bh / 2 + bh * 0.12, bw * 0.76, bh * 0.34, r * 0.6);
      ctx.fill();
    } else if (block.kind === 'image') {
      ctx.strokeStyle = `rgba(250, 248, 244, ${0.4})`;
      ctx.lineWidth = unit * 0.45;
      ctx.beginPath();
      ctx.moveTo(-bw * 0.3, bh * 0.22);
      ctx.lineTo(-bw * 0.08, -bh * 0.05);
      ctx.lineTo(bw * 0.1, bh * 0.12);
      ctx.lineTo(bw * 0.32, -bh * 0.18);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-bw * 0.22, -bh * 0.24, unit * 1.4, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  // ---- Sterretjes in de slotfase ----------------------------------------
  if (glow > 0.15) {
    ctx.save();
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = unit * 0.6;
    for (const [sx, sy, st] of SPARKS) {
      const s = seg(glow, st - 0.5, st + 0.1);
      if (s <= 0) continue;
      const size = unit * 2.4 * s;
      const px = fx + sx * fw;
      const py = fy + sy * fh;
      ctx.globalAlpha = s * (1 - 0.3 * s);
      ctx.beginPath();
      ctx.moveTo(px - size, py);
      ctx.lineTo(px + size, py);
      ctx.moveTo(px, py - size);
      ctx.lineTo(px, py + size);
      ctx.stroke();
    }
    ctx.restore();
  }
}

/**
 * Maakt een canvas scherp (devicePixelRatio, met plafond) en geeft de
 * tekenfunctie terug. Hertekent NIET zelf — de aanroeper bepaalt wanneer
 * (ScrollTrigger-onUpdate of een tijd-tween), zodat er nooit een
 * rAF-loop staat te stoken als er niets gebeurt.
 */
export function createSceneRenderer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  let width = 0;
  let height = 0;
  let colors = getSceneColors();
  let lastProgress = 0;

  function resize(): void {
    const rect = canvas.getBoundingClientRect();
    // dpr-plafond 2 + max ~2,3 MP bitmap: scherp genoeg, ook op 4K zuinig.
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (rect.width * rect.height * dpr * dpr > 2_300_000) {
      dpr = Math.sqrt(2_300_000 / (rect.width * rect.height));
    }
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    colors = getSceneColors();
    draw(lastProgress);
  }

  function draw(progress: number): void {
    lastProgress = progress;
    drawScene(ctx, width, height, progress, colors);
  }

  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  return { draw, resize };
}
