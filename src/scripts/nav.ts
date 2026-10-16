/**
 * Navigatie: achtergrond na de eerste pixels, wegschuiven bij naar beneden
 * scrollen, terugkomen bij omhoog. En het telefoonmenu als <dialog>.
 */
import { gsap, reducedMotion, getLenis } from './motion/core';

export function initNav(): void {
  const nav = document.querySelector<HTMLElement>('[data-site-nav]');
  if (!nav) return;

  let last = window.scrollY;
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 24);
    /* Pas wegschuiven als je echt aan het lezen bent, niet in de hero. */
    const down = y > last + 4;
    const up = y < last - 4;
    if (down && y > window.innerHeight * 0.6) nav.classList.add('is-hidden');
    else if (up || y < 80) nav.classList.remove('is-hidden');
    last = y;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
  currentSection(nav);

  const menu = document.querySelector<HTMLDialogElement>('[data-menu]');
  const openBtn = nav.querySelector<HTMLButtonElement>('[data-menu-open]');
  if (!menu || !openBtn) return;

  openBtn.addEventListener('click', () => {
    menu.showModal();
    openBtn.setAttribute('aria-expanded', 'true');
    getLenis()?.stop();
    if (!reducedMotion()) {
      gsap.from(menu.querySelectorAll('.menu-links li, .menu-bottom > *'), {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: 'expo.out',
        clearProps: 'all',
      });
    }
  });
  menu.addEventListener('close', () => {
    openBtn.setAttribute('aria-expanded', 'false');
    getLenis()?.start();
  });
  menu.querySelector('[data-menu-close]')?.addEventListener('click', () => menu.close());
  /* Een link in het menu: eerst dicht, dan pas scrollen (anders scrolt
     Lenis een pagina die nog achter het menu ligt). */
  for (const link of menu.querySelectorAll<HTMLAnchorElement>('[data-menu-link]')) {
    link.addEventListener('click', () => {
      getLenis()?.start();
      menu.close();
    });
  }
}

/**
 * Op de homepage: de link van de sectie die midden in beeld staat, krijgt
 * aria-current. Staat er een sectie zonder link in beeld (de 50 ms-test, de
 * bestelbon), dan staat er niets aan.
 */
function currentSection(nav: HTMLElement): void {
  const pairs = Array.from(nav.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]'))
    .map((link) => [link, document.getElementById(link.hash.slice(1))] as const)
    .filter((pair): pair is readonly [HTMLAnchorElement, HTMLElement] => pair[1] !== null);
  if (!pairs.length) return;
  const inView = new Set<Element>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      for (const [link, section] of pairs) {
        if (inView.has(section)) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      }
    },
    /* Een smalle band net boven het midden van het scherm. */
    { rootMargin: '-40% 0px -55% 0px' },
  );
  for (const [, section] of pairs) io.observe(section);
}
