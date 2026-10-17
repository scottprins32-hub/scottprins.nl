/**
 * Zet een tekst met {naam} neer, met de naam in een eigen <span data-naam>
 * zodat het script hem live kan vervangen als de bezoeker typt.
 */
import { Fragment } from 'react';

export default function Naam({ text, name }) {
  const parts = text.split('{naam}');
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <span data-naam="">{name}</span>}
      {part}
    </Fragment>
  ));
}
