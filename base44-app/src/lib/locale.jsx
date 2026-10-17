/**
 * De taal komt uit het pad: /en/... is Engels, de rest Nederlands. Elke
 * pagina wordt opnieuw geladen (gewone links, geen client-side navigatie),
 * dus de taal staat vast zolang de pagina open is.
 */
import { createContext, useContext } from 'react';
import { content, toLocale } from '@/data/content';
import { stripBase } from '@/lib/url';

export function localeFromPath(pathname = window.location.pathname) {
  return /^\/en(?:\/|$)/.test(stripBase(pathname)) ? 'en' : 'nl';
}

const LocaleContext = createContext('nl');
export const LocaleProvider = LocaleContext.Provider;

export function useLocale() {
  return toLocale(useContext(LocaleContext));
}

/** Alle teksten van de huidige taal. */
export function useT() {
  return content(useLocale());
}

/** Het huidige pad zonder base, voor de taalschakelaar en canonical. */
export function currentPath() {
  return stripBase(window.location.pathname);
}
