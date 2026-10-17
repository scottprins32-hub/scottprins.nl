/**
 * Privacyverklaring en algemene voorwaarden: rustig zetwerk, geen motion
 * behalve soepel scrollen. De teksten staan in content/*-legal.ts.
 */
import { useEffect } from 'react';
import { site } from '@/data/site';
import { usePageHead } from '@/lib/head';
import { useLocale } from '@/lib/locale';
import { nlLegal } from '@/data/content/nl-legal';
import { enLegal } from '@/data/content/en-legal';
import { initPage } from '@/scripts/page';
import SkipLink from '@/components/SkipLink';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import './LegalPage.css';

/** kind: 'privacy' | 'voorwaarden' */
export default function LegalPage({ kind }) {
  const locale = useLocale();
  const doc = (locale === 'en' ? enLegal : nlLegal)[kind];
  usePageHead({ locale, title: `${doc.title} | ${site.legalName}`, description: doc.metaDescription, path: `/${kind}` });
  useEffect(() => {
    initPage();
  }, []);
  return (
    <>
      <SkipLink />
      <SiteNav home={false} />
      <main id="main" tabIndex={-1} className="legal">
        <div className="wrap legal-wrap">
          <p className="label legal-updated">{doc.updated}</p>
          <h1 className="display legal-title">{doc.title}</h1>
          <p className="lead legal-intro">{doc.intro}</p>
          {doc.sections.map((section) => (
            <section className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <SiteFooter home={false} />
    </>
  );
}
