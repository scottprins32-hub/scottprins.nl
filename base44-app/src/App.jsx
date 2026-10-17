/**
 * De routes. Elke pagina laadt opnieuw (gewone links, geen client-side
 * navigatie), net als de statische site hiervoor: zo starten de animaties
 * altijd op een verse pagina. De router kiest alleen welke pagina er komt.
 *
 *   /                         homepage        /en/                        idem, Engels
 *   /privacy, /voorwaarden    juridisch       /en/privacy, /en/voorwaarden
 *   /website-laten-maken-…    branchepagina   /en/website-laten-maken-…
 *   /voorbeeld/<branche>      voorbeeldsite   /en/voorbeeld/<branche>
 *   /demo/kapsalon            oude link → /voorbeeld/kapper/
 *   de rest                   404
 */
import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { branchesEn, branchesNl } from '@/data/content/branches';
import { isTradeId } from '@/data/trade-ids';
import { LocaleProvider } from '@/lib/locale';
import HomePage from '@/pages/HomePage';

/* Alleen de homepage zit in het eerste pakket; de rest laadt per pagina. */
const LegalPage = lazy(() => import('@/pages/LegalPage'));
const BranchePage = lazy(() => import('@/pages/BranchePage'));
const VoorbeeldPage = lazy(() => import('@/pages/VoorbeeldPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function Branche({ locale }) {
  const { slug } = useParams();
  const branche = (locale === 'en' ? branchesEn : branchesNl).find((b) => b.slug === slug);
  return branche ? <BranchePage branche={branche} /> : <NotFound />;
}

function Voorbeeld() {
  const { trade } = useParams();
  return isTradeId(trade) ? <VoorbeeldPage trade={trade} /> : <NotFound />;
}

/** Dezelfde pagina's onder / (nl) en /en/ (en). */
function pagesFor(locale) {
  const prefix = locale === 'en' ? '/en' : '';
  const wrap = (element) => <LocaleProvider value={locale}>{element}</LocaleProvider>;
  return [
    <Route key={`${locale}-home`} path={`${prefix}/`} element={wrap(<HomePage />)} />,
    <Route key={`${locale}-privacy`} path={`${prefix}/privacy`} element={wrap(<LegalPage kind="privacy" />)} />,
    <Route key={`${locale}-voorwaarden`} path={`${prefix}/voorwaarden`} element={wrap(<LegalPage kind="voorwaarden" />)} />,
    <Route key={`${locale}-voorbeeld`} path={`${prefix}/voorbeeld/:trade`} element={wrap(<Voorbeeld />)} />,
    <Route key={`${locale}-branche`} path={`${prefix}/:slug`} element={wrap(<Branche locale={locale} />)} />,
  ];
}

const basename = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '') || '/';

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Suspense fallback={null}>
        <Routes>
        {pagesFor('nl')}
        {pagesFor('en')}
        <Route path="/demo/kapsalon" element={<Navigate to="/voorbeeld/kapper/" replace />} />
          <Route path="*" element={<LocaleProvider value="nl"><NotFound /></LocaleProvider>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
