/** class:list uit Astro, voor React: falsy waarden vallen weg, objecten tellen per sleutel. */
export function cx(...parts) {
  const out = [];
  for (const part of parts) {
    if (!part) continue;
    if (typeof part === 'string') out.push(part);
    else if (Array.isArray(part)) out.push(cx(...part));
    else for (const [key, on] of Object.entries(part)) if (on) out.push(key);
  }
  return out.filter(Boolean).join(' ');
}
