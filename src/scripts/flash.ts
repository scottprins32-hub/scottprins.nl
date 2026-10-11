/**
 * De 50-milliseconden-test. Pakt de nieuwe site die nu in het upgrade-ding
 * staat (met de naam die de bezoeker typte), zet een kopie in het scherm en
 * laat hem drie beeldjes zien: bij 60 Hz is dat 50 ms.
 */
import { reducedMotion } from './motion/core';
import { getState } from './state';

const nextFrame = () => new Promise<number>((resolve) => requestAnimationFrame(resolve));

export function initFlash(root: HTMLElement): void {
  const screen = root.querySelector<HTMLElement>('[data-flash-screen]');
  const vpHost = root.querySelector<HTMLElement>('[data-flash-vp]');
  const button = root.querySelector<HTMLButtonElement>('[data-flash-play]');
  const label = root.querySelector<HTMLElement>('[data-flash-label]');
  const caption = root.querySelector<HTMLElement>('[data-flash-caption]');
  if (!screen || !vpHost || !button) return;

  if (reducedMotion()) {
    root.dataset.reduced = '';
    return;
  }

  let busy = false;

  button.addEventListener('click', async () => {
    if (busy) return;
    const source = document.querySelector<HTMLElement>(
      `[data-device] [data-layer="after"] .site[data-site="${getState().trade}"]`,
    );
    if (!source) return;
    busy = true;
    if (caption) caption.textContent = '';

    const vp = document.createElement('div');
    vp.className = 'vp';
    const copy = source.cloneNode(true) as HTMLElement;
    copy.hidden = false;
    copy.removeAttribute('style');
    for (const img of copy.querySelectorAll('img')) img.loading = 'eager';
    /* Animaties van de intro niet meekopiëren. */
    for (const el of copy.querySelectorAll<HTMLElement>('[style]')) el.removeAttribute('style');
    vp.append(copy);
    vpHost.replaceChildren(vp);

    const width = screen.clientWidth;
    vp.style.setProperty('--s-js', String(width / (width < 640 ? 390 : 1280)));
    await Promise.all(Array.from(vp.querySelectorAll('img'), (img) => img.decode().catch(() => undefined)));

    await nextFrame();
    screen.classList.add('is-on');
    const start = await nextFrame();
    let now = start;
    /* Na drie beeldjes weer weg (42 ms + het lopende frame = 50 ms bij 60 Hz). */
    while (now - start < 42) now = await nextFrame();
    screen.classList.remove('is-on');

    if (caption) caption.textContent = root.dataset.caption ?? '';
    if (label && root.dataset.replay) label.textContent = root.dataset.replay;
    busy = false;
  });
}
