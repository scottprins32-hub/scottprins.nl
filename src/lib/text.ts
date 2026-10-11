/**
 * Plakt het slot van een kop achter het accent. Begint het slot met een
 * letter of cijfer ('voordat je binnen bent.'), dan hoort er een spatie
 * tussen; is het leesteken ('.'), dan niet.
 */
export function tail(end: string): string {
  return /^[\p{L}\p{N}]/u.test(end) ? ` ${end}` : end;
}
