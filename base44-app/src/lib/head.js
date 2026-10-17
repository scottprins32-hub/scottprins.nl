/**
 * De <head> per pagina, zoals Base.astro dat deed: titel, beschrijving,
 * canonical, hreflang, social-tags en structured data. index.html bevat de
 * waarden van de Nederlandse homepage (voor wie geen JavaScript draait);
 * usePageHead zet ze na het laden goed voor de pagina die echt open staat.
 */
import { useEffect } from 'react';
import { site } from '@/data/site';
import { offer } from '@/data/offer';
import { altPath, content } from '@/data/content';

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (value == null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setLink(rel, href, hreflang) {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function jsonLd(locale, canonical, faq) {
  const t = content(locale);
  const ogImage = new URL('/og.png', site.url).href;
  /* '1171 MG Badhoevedorp' → plaats. In de structured data alleen de plaats:
     Scott werkt alleen online en het adres is een woonadres, geen
     bezoekadres. Het volledige adres staat (wettelijk verplicht) in de footer. */
  const [, , plaats] = site.addressCity.match(/^(\d{4}\s?[A-Z]{2})\s+(.+)$/) ?? [];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${site.url}/#scott`,
        name: site.name,
        jobTitle: locale === 'en' ? 'Web designer' : 'Webdesigner',
        email: site.email,
        url: site.url,
      },
      {
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': `${site.url}/#service`,
        name: site.legalName,
        founder: { '@id': `${site.url}/#scott` },
        url: site.url,
        email: site.email,
        telephone: `+${site.whatsapp}`,
        image: ogImage,
        identifier: { '@type': 'PropertyValue', name: 'KVK', value: '89874994' },
        sameAs: ['https://modernpitching.nl'],
        description: t.meta.description,
        areaServed: [
          { '@type': 'City', name: 'Badhoevedorp' },
          { '@type': 'City', name: 'Hoofddorp' },
          { '@type': 'City', name: 'Amstelveen' },
          { '@type': 'City', name: 'Amsterdam' },
          { '@type': 'Country', name: 'Nederland' },
        ],
        priceRange: `€${offer.price}`,
        knowsLanguage: ['nl', 'en'],
        /* Het aanbod komt uit offer.ts, dus het loopt nooit uit de pas met de pagina. */
        makesOffer: {
          '@type': 'Offer',
          '@id': `${site.url}/#offer`,
          name: locale === 'en' ? 'Custom website' : 'Website op maat',
          description: t.order.slip.detail,
          category: 'Webdesign',
          price: offer.price,
          priceCurrency: offer.currency,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: offer.price,
            priceCurrency: offer.currency,
            valueAddedTaxIncluded: false,
          },
          seller: { '@id': `${site.url}/#service` },
        },
        ...(plaats ? { address: { '@type': 'PostalAddress', addressLocality: plaats, addressCountry: 'NL' } } : {}),
      },
      ...(faq
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${canonical}#faq`,
              mainEntity: t.faq.items.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ]
        : []),
    ],
  };
}

export function applyHead({ locale, title, description, path = '/', faq = false, noindex = false }) {
  const t = content(locale);
  const pageTitle = title ?? t.meta.title;
  const desc = description ?? t.meta.description;
  /* canonical en hreflang komen uit hetzelfde taalloze pad. Altijd het productiedomein. */
  const canonical = new URL(altPath(path, locale), site.url).href;

  document.documentElement.lang = locale;
  document.title = pageTitle;
  setMeta('name', 'description', desc);
  /* De preview op GitHub Pages hoort nooit in Google te komen. */
  setMeta('name', 'robots', noindex || import.meta.env.PREVIEW ? 'noindex, nofollow' : null);
  setLink('canonical', canonical);
  setLink('alternate', new URL(altPath(path, 'nl'), site.url).href, 'nl');
  setLink('alternate', new URL(altPath(path, 'en'), site.url).href, 'en');
  setLink('alternate', new URL(altPath(path, 'nl'), site.url).href, 'x-default');
  setMeta('property', 'og:title', pageTitle);
  setMeta('property', 'og:description', desc);
  setMeta('property', 'og:url', canonical);
  setMeta('property', 'og:locale', locale === 'en' ? 'en_GB' : 'nl_NL');
  setMeta('property', 'og:image:alt', t.meta.ogAlt);

  let ld = document.head.querySelector('script[data-jsonld]');
  if (!ld) {
    ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.setAttribute('data-jsonld', '');
    document.head.appendChild(ld);
  }
  ld.textContent = JSON.stringify(jsonLd(locale, canonical, faq));
}

/** Zet de head voor deze pagina, één keer na het tekenen. */
export function usePageHead(head) {
  useEffect(() => {
    applyHead(head);
    // Elke pagina laadt opnieuw; de head verandert niet terwijl hij open staat.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
