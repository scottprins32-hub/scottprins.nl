/**
 * Vijftig milliseconden: zo snel oordeelt een bezoeker. Hier doe je de test
 * zelf: de oude en de nieuwe site uit het upgrade-ding (met je eigen naam)
 * flitsen elk drie beeldjes lang in beeld, in willekeurige volgorde. Daarna
 * kies je welke zaak je zou bellen, en zie je ze rustig naast elkaar.
 *
 * Alleen als je zelf op de knop drukt, en nooit bij prefers-reduced-motion:
 * dan staan ze meteen naast elkaar, zonder flits.
 */
import { useEffect, useRef } from 'react';
import { useT } from '@/lib/locale';
import { initFlash } from '@/scripts/flash';
import Icon from './Icon';
import './Vijftig.css';

export default function Vijftig() {
  const t = useT();
  const v = t.vijftig;
  const labels = {
    hud: v.hud,
    old: v.old,
    new: v.new,
    pickedNew: v.pickedNew,
    pickedOld: v.pickedOld,
    reducedVerdict: v.reducedVerdict,
    compare: v.compare,
  };
  const ref = useRef(null);
  useEffect(() => {
    initFlash(ref.current);
  }, []);

  return (
    <section className="vijftig section-pad" id="vijftig" aria-labelledby="vijftig-title">
      <div className="wrap vijftig-grid">
        <div className="vijftig-head">
          <p className="label vijftig-label">{v.label}</p>
          <h2 id="vijftig-title" className="display vijftig-title" data-reveal="title">
            {v.title}
          </h2>
        </div>

        <div
          className="vijftig-test"
          ref={ref}
          data-flash=""
          data-sticky-hide=""
          data-phase="idle"
          data-labels={JSON.stringify(labels)}
        >
          <div className="flash-screen" data-flash-screen="">
            <span className="flash-ghost" aria-hidden="true">
              50
            </span>
            <p className="flash-hud" aria-hidden="true" data-flash-hud="">
              {v.hud}
            </p>
            <span className="flash-center" aria-hidden="true" data-flash-center="">
              +
            </span>

            <div className="flash-intro">
              <span className="flash-fix" aria-hidden="true">
                +
              </span>
              <p className="flash-intro-text">{v.intro}</p>
              <button type="button" className="btn btn-ghost flash-play" data-flash-play="">
                <Icon name="eye" />
                <span data-flash-label="">{v.play}</span>
              </button>
              <p className="flash-reduced">{v.flashReduced}</p>
            </div>

            <div className="flash-ask" role="group" aria-labelledby="flash-question">
              <p className="flash-question" id="flash-question">
                {v.ask}
              </p>
              <div className="flash-choices">
                {['A', 'B'].map((letter, i) => (
                  <button key={letter} type="button" className="flash-choice" data-pick={i} aria-label={`${v.site} ${letter}`}>
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <div className="flash-result" aria-hidden="true">
              {['A', 'B'].map((letter, i) => (
                <figure key={letter} className="flash-thumb" data-thumb={i}>
                  <div className="flash-frame" data-frame="" />
                  <figcaption>
                    <span className="flash-letter">{letter}</span>
                    <span data-kind="" />
                    <span className="flash-picked">{v.picked}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="flash-stack" aria-hidden="true" data-flash-stack="" />
          </div>

          <div className="flash-after">
            <p className="flash-verdict" data-flash-verdict="" aria-live="polite" />
            <div className="flash-actions">
              <a className="btn btn-signal" href="#bestellen" data-magnetic="">
                {v.claim}
                <Icon name="arrow-right" />
              </a>
              <button type="button" className="btn btn-ghost" data-flash-replay="">
                <Icon name="arrow-counter-clockwise" />
                {v.replay}
              </button>
            </div>
          </div>
        </div>

        <div className="vijftig-body">
          {v.body.map((paragraph) => (
            <p className="lead" data-reveal="up" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <p className="vijftig-punch" data-reveal="up">
            {v.punch}
          </p>
          <p className="vijftig-source">
            <a className="text-link" href={v.sourceHref} target="_blank" rel="noopener">
              {v.source}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
