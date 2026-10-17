/**
 * Taalschakelaar NL | EN. Een echte link naar dezelfde pagina in de andere
 * taal: werkt zonder JavaScript, is deelbaar en Google ziet beide versies.
 */
import { altPath, LOCALES } from '@/data/content';
import { url } from '@/lib/url';
import { cx } from '@/lib/cx';
import { currentPath, useLocale, useT } from '@/lib/locale';
import './LangSwitch.css';

export default function LangSwitch({ className = '', tone = 'ink' }) {
  const locale = useLocale();
  const { nav } = useT();
  /* Het pad zonder base en zonder taalprefix: zo blijf je op /privacy als je wisselt. */
  const kaal = currentPath().replace(/^\/en(?=\/|$)/, '') || '/';
  return (
    <div className={cx('lang', `lang-${tone}`, className)} role="group" aria-label={nav.langLabel}>
      {LOCALES.map((code) => {
        const actief = code === locale;
        return (
          <a
            key={code}
            href={url(altPath(kaal, code))}
            hrefLang={code}
            lang={code}
            aria-current={actief ? 'true' : undefined}
            className={cx('lang-link', { 'is-active': actief })}
          >
            <span aria-hidden="true">{code}</span>
            <span className="sr-only">
              {actief ? (code === 'nl' ? 'Nederlands' : 'English') : nav.langSwitchTo}
            </span>
          </a>
        );
      })}
    </div>
  );
}
