import { site } from '../data/site';

/** wa.me-link naar Scott, met een eerste bericht al ingevuld. */
export function waHref(text?: string): string {
  return `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}
