/**
 * De homepage. Eén idee: onder je website zit een betere. Alles op deze
 * pagina werkt daarnaartoe of komt daar vandaan.
 *
 *   hero + upgrade-ding  →  50 ms  →  prijs (met wat erin zit)  →
 *   werkwijze  →  over mij  →  vragen  →  bestelbon  →  footer
 */
import { useEffect } from 'react';
import { usePageHead } from '@/lib/head';
import { useLocale } from '@/lib/locale';
import { initPage } from '@/scripts/page';
import SkipLink from '@/components/SkipLink';
import SiteNav from '@/components/SiteNav';
import Hero from '@/components/Hero';
import Vijftig from '@/components/Vijftig';
import Price from '@/components/Price';
import Process from '@/components/Process';
import About from '@/components/About';
import Faq from '@/components/Faq';
import Order from '@/components/Order';
import StickyCta from '@/components/StickyCta';
import SiteFooter from '@/components/SiteFooter';

export default function HomePage() {
  const locale = useLocale();
  usePageHead({ locale, path: '/', faq: true });
  useEffect(() => {
    initPage();
  }, []);
  return (
    <>
      <SkipLink />
      <SiteNav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Vijftig />
        <Price />
        <Process />
        <About />
        <Faq />
        <Order />
        <StickyCta />
      </main>
      <SiteFooter />
    </>
  );
}
