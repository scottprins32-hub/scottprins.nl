/**
 * De 50-milliseconden-test. Pakt de oude en de nieuwe site die nu in het
 * upgrade-ding staan (met de naam die de bezoeker typte), en laat ze elk
 * drie beeldjes zien (bij 60 Hz is dat 50 ms), in willekeurige volgorde.
 * Daarna kiest de bezoeker welke zaak hij zou bellen, en staan ze naast
 * elkaar.
 *
 * Bij prefers-reduced-motion geen flitsen: dan staan ze meteen naast elkaar.
 * Twee flitsen met ruim een halve seconde ertussen blijft ruim onder de
 * WCAG-grens van drie flitsen per seconde.
 */
import { reducedMotion } from './motion/core';
import { getState } from './state';

type Kind = 'old' | 'new';
interface Labels {
  hud: string;
  old: string;
  new: string;
  pickedNew: string;
  pickedOld: string;
  reducedVerdict: string;
  compare: string;
}

const nextFrame = () => new Promise<number>((resolve) => requestAnimationFrame(resolve));
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export function initFlash(root: HTMLElement): void {
  const screen = root.querySelector<HTMLElement>('[data-flash-screen]');
  const stack = root.querySelector<HTMLElement>('[data-flash-stack]');
  const hud = root.querySelector<HTMLElement>('[data-flash-hud]');
  const center = root.querySelector<HTMLElement>('[data-flash-center]');
  const play = root.querySelector<HTMLButtonElement>('[data-flash-play]');
  const playLabel = root.querySelector<HTMLElement>('[data-flash-label]');
  const replay = root.querySelector<HTMLButtonElement>('[data-flash-replay]');
  const verdict = root.querySelector<HTMLElement>('[data-flash-verdict]');
  const picks = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-pick]'));
  const thumbs = Array.from(root.querySelectorAll<HTMLElement>('[data-thumb]'));
  if (!screen || !stack || !play || !verdict || picks.length !== 2 || thumbs.length !== 2) return;

  const labels = JSON.parse(root.dataset.labels ?? '{}') as Labels;
  const reduce = reducedMotion();
  if (reduce && playLabel) playLabel.textContent = labels.compare;

  let order: Kind[] = ['old', 'new'];
  let views: HTMLElement[] = [];
  let busy = false;

  function setPhase(phase: 'idle' | 'count' | 'ask' | 'result'): void {
    root.dataset.phase = phase;
  }

  /** De site uit het upgrade-ding als losse kopie, op schaal voor `width`. */
  function copyOf(kind: Kind): HTMLElement | null {
    const layer = kind === 'old' ? 'before' : 'after';
    const source = document.querySelector<HTMLElement>(
      `[data-device] [data-layer="${layer}"] .site[data-site="${getState().trade}"]`,
    );
    if (!source) return null;
    const vp = document.createElement('div');
    vp.className = 'vp';
    const copy = source.cloneNode(true) as HTMLElement;
    copy.hidden = false;
    /* Animaties van de intro niet meekopiëren. */
    copy.removeAttribute('style');
    for (const el of copy.querySelectorAll<HTMLElement>('[style]')) el.removeAttribute('style');
    for (const img of copy.querySelectorAll('img')) img.loading = 'eager';
    vp.append(copy);
    return vp;
  }

  function fit(vp: HTMLElement, box: HTMLElement): void {
    const width = box.clientWidth;
    const narrow = screen!.clientWidth < 640;
    vp.style.setProperty('--s-js', String(width / (narrow ? 390 : 1280)));
  }

  function build(): boolean {
    order = Math.random() < 0.5 ? ['old', 'new'] : ['new', 'old'];
    const made = order.map(copyOf);
    if (made.some((vp) => !vp)) return false;
    views = made as HTMLElement[];
    for (const vp of views) fit(vp, screen!);
    stack!.replaceChildren(...views);
    return true;
  }

  /** Eén site, 50 ms: aan in beeldje 0, uit vóór het beeldje dat op 50 ms
   *  valt. Bij 60 Hz zijn dat er precies drie (42 vangt wat haperen op). */
  async function flash(vp: HTMLElement): Promise<void> {
    const start = await nextFrame();
    vp.classList.add('is-on');
    let now = start;
    while (now - start < 42) now = await nextFrame();
    vp.classList.remove('is-on');
  }

  /** Zet de twee sites als plaatjes naast elkaar, met wat ze waren. */
  function showResult(picked: number | null): void {
    thumbs.forEach((thumb, i) => {
      const frame = thumb.querySelector<HTMLElement>('[data-frame]');
      const kind = thumb.querySelector<HTMLElement>('[data-kind]');
      const vp = views[i];
      if (frame && vp) {
        frame.replaceChildren(vp);
        fit(vp, frame);
      }
      if (kind) kind.textContent = order[i] === 'old' ? labels.old : labels.new;
      thumb.classList.toggle('is-picked', picked === i);
    });
    if (picked === null) verdict!.textContent = labels.reducedVerdict;
    else verdict!.textContent = order[picked] === 'new' ? labels.pickedNew : labels.pickedOld;
    setPhase('result');
  }

  async function run(): Promise<void> {
    if (busy || !build()) return;
    busy = true;
    verdict!.textContent = '';
    for (const thumb of thumbs) thumb.classList.remove('is-picked');

    if (reduce) {
      /* Plaatjes laden voordat ze naast elkaar komen. */
      await Promise.all(Array.from(stack!.querySelectorAll('img'), (img) => img.decode().catch(() => undefined)));
      showResult(null);
      replay?.focus({ preventScroll: true });
      busy = false;
      return;
    }

    /* De knop verdwijnt; de focus gaat naar het scherm, niet naar niets. */
    screen!.tabIndex = -1;
    screen!.focus({ preventScroll: true });
    setPhase('count');
    const decoded = Promise.all(
      Array.from(stack!.querySelectorAll('img'), (img) => img.decode().catch(() => undefined)),
    );
    for (const n of ['3', '2', '1']) {
      if (center) center.textContent = n;
      await wait(450);
    }
    /* Het kruisje, en linksboven welke er nu komt. */
    if (center) center.textContent = '+';
    if (hud) hud.textContent = 'A';
    await Promise.all([decoded, wait(500)]);
    await flash(views[0]);
    if (hud) hud.textContent = 'B';
    await wait(800);
    await flash(views[1]);
    await wait(250);
    if (hud) hud.textContent = labels.hud;
    setPhase('ask');
    screen!.removeAttribute('tabindex');
    picks[0].focus({ preventScroll: true });
    busy = false;
  }

  play.addEventListener('click', run);
  replay?.addEventListener('click', run);
  picks.forEach((button, i) => {
    button.addEventListener('click', () => {
      if (root.dataset.phase !== 'ask') return;
      showResult(i);
      replay?.focus({ preventScroll: true });
    });
  });

  /* Venster versmald of verbreed: de plaatjes in de uitslag schalen mee. */
  new ResizeObserver(() => {
    if (root.dataset.phase !== 'result') return;
    thumbs.forEach((thumb, i) => {
      const frame = thumb.querySelector<HTMLElement>('[data-frame]');
      if (frame && views[i]) fit(views[i], frame);
    });
  }).observe(screen);
}
