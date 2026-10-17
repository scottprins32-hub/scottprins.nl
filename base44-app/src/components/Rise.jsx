/**
 * Tekst die woord voor woord uit een masker omhoog komt, puur CSS (zie
 * .rise-w in global.css). Bij prefers-reduced-motion staat hij er meteen.
 *
 * `from` is het volgnummer van het eerste woord, zodat meerdere stukken
 * (bijvoorbeeld voor en na een accent) één doorlopende reeks vormen.
 */
import { Fragment } from 'react';

export default function Rise({ text, from = 0 }) {
  const words = text.split(/\s+/).filter(Boolean);
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className="rise-w">
        <span style={{ '--i': from + i }}>{word}</span>
      </span>
      {i < words.length - 1 && ' '}
    </Fragment>
  ));
}
