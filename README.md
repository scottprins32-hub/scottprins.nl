# scottprins.nl

Eén aanbod: een website op maat voor **€ 500** (excl. btw), binnen 5 werkdagen live. De site zelf is het bewijs.

**Het idee in één zin:** onder je website zit een betere. Bovenaan staat een verouderde site van een (verzonnen) zaak; beweeg eroverheen en je kijkt door een vloeibare lens naar de nieuwe versie, houd hem ingedrukt en de nieuwe site komt er helemaal uit. Kies je branche, typ de naam van je eigen zaak, en het is jouw site. Die naam gaat mee naar de bestelbon onderaan.

**Stack:** [Astro 5](https://astro.build) · vanilla TypeScript · [GSAP](https://gsap.com) (ScrollTrigger, SplitText) · [Lenis](https://lenis.darkroom.engineering) · Tailwind CSS v4 · [Resend](https://resend.com) · Vitest. Statische pagina's plus één serverless functie (`/api/lead`) op Vercel.

---

## Lokaal ontwikkelen

```bash
npm install
npm run dev        # http://localhost:4321
npm test           # Vitest: bestelbon-validatie en taalpariteit
npm run check      # astro check (types, ook ontbrekende vertalingen)
npm run build      # productie-build (statisch + Vercel-functie)
```

## Publiceren

- **`main` is de hoofdtak.** Pushen naar GitHub zet niets live: automatisch deployen op Vercel staat uit (`vercel.json`, `git.deploymentEnabled: false`, oktober 2026, op verzoek van Scott). Weer aanzetten: die regel uit `vercel.json` halen. Een losse release kan ook met **Redeploy** in het Vercel-dashboard.
- **Preview (GitHub Pages):** `bash scripts/preview.sh` bouwt een puur statische versie onder `/scottprins.nl/` (via `npm run preview:build`, zonder `/api/lead`; het formulier valt daar terug op WhatsApp of mail) en zet alleen die bestanden op de tak `gh-pages`. Binnen een minuut te zien op https://scottprins32-hub.github.io/scottprins.nl/.
- **Het domein:** scottprins.nl en www.scottprins.nl staan al als domein bij het Vercel-project, maar de DNS (bij 2is) wijst nog nergens heen. Pas als daar records staan, is de site op het eigen domein te zien.

Alle interne links en assets lopen via `url()` uit `src/lib/url.ts` of via Vite-imports, zodat dezelfde code onder `/` en onder `/scottprins.nl/` werkt.

## Wat waar staat

```
src/
  data/offer.ts            ← het aanbod: prijs, dagen, rondes, onderhoud (één plek)
  data/site.ts             ← bedrijfsgegevens (taalonafhankelijk)
  data/trade-ids.ts        ← de zes branches, voorbeeldnamen (ook in de browser)
  data/trades.ts           ← foto's per branche (alleen server-side)
  data/content/nl.ts       ← alle Nederlandse tekst (de bron)
  data/content/en.ts       ← alle Engelse tekst (zelfde sleutels, TypeScript bewaakt dat)
  data/content/*-legal.ts  ← privacyverklaring en voorwaarden
  data/content/branches.ts ← branchepagina's (nu: fysiotherapie)
  components/upgrade/      ← het upgrade-ding: Upgrade, SiteBefore, SiteAfter
  styles/sites.css         ← de zes nieuwe ontwerpen en de oude site
  scripts/upgrade.ts       ← de lens, het vasthouden, branche en naam
  scripts/state.ts         ← gedeelde keuze (naam + branche), alleen in de browser
  scripts/motion/          ← GSAP/Lenis-kern, reveals, magnetische knoppen
  lib/lead.ts              ← bestelbon-validatie (browser én server), getest
  pages/api/lead.ts        ← de enige serverless route
  pages/voorbeeld/[trade]  ← de nieuwe voorbeeldsites op ware grootte (noindex)
```

## Kleuren en logo

Het logo is Scotts eigen `</>`-merk (`src/components/Logo.astro`); het accentbolletje volgt de accentkleur. Alle kleuren staan als tokens bovenaan `src/styles/global.css`. Een andere accentkleur zijn vier regels:

```css
--color-signal: #4f46e5;      /* vlak van de hoofdknop */
--color-signal-hi: #4338ca;   /* hover van dat vlak */
--color-signal-text: #8b85ff; /* accent als tekst/icoon op donker (AA-contrast) */
--color-signal-ink: #ffffff;  /* tekst op het vlak */
```

De warme variant (rood-oranje op warme inkt) die eerder is uitgeprobeerd: `#f0532c` / `#ff6b46` / `#ff6b46` / `#12110f`, met `--color-ink: #12110f`, `--color-ink-2: #1b1a17`, `--color-ink-3: #282622`, `--color-bone: #efebe4`, `--color-bone-2: #cec8bd`, `--color-mute: #938e84`, `--color-paper: #f5f1ea`, `--color-paper-ink: #1d1b18`, `--color-paper-mute: #6d685f`. Pas dan ook `theme-color` in `Base.astro` en de kleuren in `public/favicon.svg` aan.

## Prijs of termijn aanpassen

Alles staat in **`src/data/offer.ts`**. Teksten, structured data, de bon en de voorwaarden rekenen mee; nergens staat een bedrag ingetypt.

## Teksten

Nederlands is de bron (`nl.ts`), Engels volgt (`en.ts`). Een sleutel toevoegen = in beide bestanden; `npm run check` en `npm test` vallen erover als er één ontbreekt. De test bewaakt ook: geen gedachtestreepjes en geen pijltjes in zichtbare tekst. De Engelse tekst is nog niet door een native speaker nagelezen.

Vóór livegang: het btw-nummer invullen (grep op `{BTW}`); zolang daar `{BTW}` staat, toont de footer geen btw-regel.

## Motion en toegankelijkheid

- Eén rAF: de ticker van GSAP drijft Lenis en de lens aan.
- `prefers-reduced-motion`: geen Lenis, geen lens, geen flits; het upgrade-ding wordt een korte overvloeier en de 50-milliseconden-test een zin.
- Het upgrade-ding werkt met muis (lens + vasthouden), duim (vasthouden; verticaal scrollen blijft werken) en toetsenbord (de knop Upgrade). De voorbeeldlagen zijn `inert` en `aria-hidden`; een beschrijving en een live-region vertellen wat er gebeurt.
- Zonder JavaScript staat alles er gewoon, en wijst het ding naar de voorbeeldsite op ware grootte.

## `RESEND_API_KEY`

De bestelbon POST naar `/api/lead`, dat hem via Resend mailt naar Scott (en een kopie naar de bezoeker).

1. Maak een API-key aan op resend.com.
2. Lokaal: `.env.example` kopiëren naar `.env` en de key invullen.
3. Op Vercel: **Settings → Environment Variables** → `RESEND_API_KEY`.

Zonder key werkt de site gewoon: de API antwoordt `503` en de bon staat klaar voor WhatsApp en mail.

## Beelden

Alle foto's in de voorbeeldsites zijn CC0 (StockSnap); fotografen staan in `src/assets/trades/CREDITS.json`.
