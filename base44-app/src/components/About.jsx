/**
 * Over Scott. Echte foto, echte cijfers (die Scott zelf onderschrijft) en
 * twee sites waar je zelf doorheen kunt klikken. Geen verzonnen klanten.
 * Bij modernpitching.nl staan echte schermafbeeldingen van de live site
 * (laptop en telefoon, oktober 2026): bewijs dat je ziet, niet alleen leest.
 */
import { useEffect, useRef } from 'react';
import { gsap, OK } from '@/scripts/motion/core';
import { waHref } from '@/lib/whatsapp';
import { useT } from '@/lib/locale';
import Icon from './Icon';
import Img from './Img';
import './About.css';

/** Schermafbeeldingen per site uit de lijst; sites zonder blijven tekst. */
const shots = {
  'modernpitching.nl': { desktop: 'modernpitching-desktop', phone: 'modernpitching-phone' },
};

/* De foto schuift open als hij in beeld komt; zonder motion staat hij er. */
function revealPhoto(photo) {
  const mm = gsap.matchMedia();
  mm.add(OK, () => {
    gsap.fromTo(
      photo,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.4,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: photo, start: 'top 80%', once: true },
      },
    );
    gsap.fromTo(
      photo.querySelector('img'),
      { scale: 1.25 },
      { scale: 1, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: photo, start: 'top 80%', once: true } },
    );
  });
  return () => mm.revert();
}

export default function About() {
  const { about, whatsapp } = useT();
  const photoRef = useRef(null);
  useEffect(() => revealPhoto(photoRef.current), []);

  return (
    <section className="about section-pad" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <figure className="about-photo" data-photo="" ref={photoRef}>
          <Img name="scott" alt={about.photoAlt} sizes="(min-width: 1024px) 36vw, 90vw" />
        </figure>
        <div className="about-copy">
          <p className="label about-label">{about.label}</p>
          <h2 id="about-title" className="display about-title" data-reveal="title">
            {about.title}
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p className="lead about-text" data-reveal="up" key={paragraph}>
              {paragraph}
            </p>
          ))}

          <dl className="about-stats" data-reveal="up">
            {about.stats.map((stat) => (
              <div className="about-stat" key={stat.value}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="label about-proof-label">{about.proofLabel}</h3>
          <ul className="about-proof">
            {about.proof.map((item) => {
              const external = item.href.startsWith('http');
              const shot = shots[item.name];
              return (
                <li data-reveal="up" key={item.name}>
                  <a href={item.href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
                    {shot && (
                      <span className="proof-shots" aria-hidden="true">
                        <Img className="proof-desktop" name={shot.desktop} alt="" sizes="(min-width: 1024px) 36vw, 82vw" />
                        <Img className="proof-phone" name={shot.phone} alt="" sizes="(min-width: 1024px) 10vw, 24vw" />
                      </span>
                    )}
                    <span className="about-proof-name">
                      {item.name}
                      <Icon name={external ? 'arrow-up-right' : 'arrow-right'} />
                      {external && <span className="sr-only">({about.newTab})</span>}
                    </span>
                    <span className="about-proof-text">{item.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <a className="btn btn-ghost about-wa" href={waHref(whatsapp.generic)} data-wa={whatsapp.named} target="_blank" rel="noopener">
            <Icon name="whatsapp" />
            {about.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
