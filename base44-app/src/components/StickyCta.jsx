/**
 * Op de telefoon: de prijs en de knop altijd één tik weg, zodra de knoppen
 * bovenin uit beeld zijn. Maakt plaats voor alles met data-sticky-hide.
 */
import { useEffect, useRef } from 'react';
import { useT } from '@/lib/locale';
import './StickyCta.css';

function watch(bar) {
  /* Zodra de knoppen bovenin uit beeld zijn, neemt deze balk het over. */
  const hero = document.querySelector('[data-sticky-after]');
  if (!bar || !hero) return undefined;
  let pastHero = false;
  /* Waar de pagina zelf knoppen heeft (het upgrade-ding, de 50 ms-test, de
     bestelbon, de footer), gaat de balk opzij in plaats van ze af te dekken. */
  const busy = new Set();
  const update = () => {
    const show = pastHero && busy.size === 0;
    bar.classList.toggle('is-visible', show);
    bar.inert = !show;
  };
  const heroIo = new IntersectionObserver(([entry]) => {
    pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    update();
  });
  heroIo.observe(hero);
  const zones = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) busy.add(entry.target);
      else busy.delete(entry.target);
    }
    update();
  });
  for (const zone of document.querySelectorAll('[data-sticky-hide]')) zones.observe(zone);
  return () => {
    heroIo.disconnect();
    zones.disconnect();
  };
}

export default function StickyCta() {
  const t = useT();
  const ref = useRef(null);
  useEffect(() => watch(ref.current), []);
  return (
    <a className="sticky" href="#bestellen" data-sticky="" inert="" ref={ref}>
      <span className="sticky-price">
        {t.sticky.price}
        <small>{t.order.slip.exVat}</small>
      </span>
      <span className="btn btn-signal sticky-btn">{t.sticky.cta}</span>
    </a>
  );
}
