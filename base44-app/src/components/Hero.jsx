/**
 * De hero: de zin waar de hele site om draait, en eronder het ding dat hem
 * waarmaakt. Het woord 'betere' komt binnen als een ouderwetse blauwe link
 * en wordt dan zelf geüpgraded: de handtekening in het klein.
 */
import { useT } from '@/lib/locale';
import { tail } from '@/lib/text';
import Icon from './Icon';
import Rise from './Rise';
import Upgrade from './upgrade/Upgrade';
import './Hero.css';

export default function Hero() {
  const { hero } = useT();
  const startWords = hero.titleStart.split(/\s+/).filter(Boolean).length;
  const end = tail(hero.titleEnd);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <h1 id="hero-title" className="hero-title display" data-hero-title="">
          <Rise text={hero.titleStart} />{' '}
          <span className="rise-w">
            <span className="hero-accent" style={{ '--i': startWords }} data-word={hero.titleAccent}>
              <em className="hero-accent-new serif-accent">{hero.titleAccent}</em>
              {!end.startsWith(' ') && end}
            </span>
          </span>
          {end.startsWith(' ') && (
            <>
              {' '}
              <Rise text={end.trim()} from={startWords + 1} />
            </>
          )}
        </h1>
        <div className="hero-side">
          <p className="lead hero-lead intro-up" style={{ '--d': '0.55s' }}>
            {hero.lead}
          </p>
          <div className="hero-ctas intro-up" style={{ '--d': '0.65s' }} data-sticky-after="">
            <a className="btn btn-signal" href="#bestellen" data-magnetic="">
              {hero.cta}
              <Icon name="arrow-right" />
            </a>
            <a className="hero-why text-link" href="#waarom">
              {hero.ctaWhy}
            </a>
          </div>
        </div>
        <div className="hero-device intro-up" style={{ '--d': '0.8s' }}>
          <Upgrade id="upgrade" />
        </div>
      </div>
    </section>
  );
}
