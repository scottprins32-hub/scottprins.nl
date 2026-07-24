# scottprins.nl

One-page marketingsite + interactieve prijsconfigurator. Het concept: elke optie die Scott verkoopt is **live te proberen op de site zelf** — van de scroll-video-hero (optie 11) tot de chatbot en de online agenda. De bezoeker stelt onderaan zijn eigen website samen en vraagt met één formulier een offerte aan.

**Stack:** [Astro 5](https://astro.build) · vanilla TypeScript · [GSAP ScrollTrigger](https://gsap.com/scrolltrigger/) · Tailwind CSS v4 · [Resend](https://resend.com) (e-mail) · Vitest. Statische output + één serverless functie (`/api/lead`), deploybaar op Vercel.

---

## Lokaal ontwikkelen

```bash
npm install
npm run dev        # → http://localhost:4321
npm test           # Vitest: rekentests van de configurator
npm run build      # productie-build (statisch + Vercel-functie)
```

> `astro preview` werkt niet met de Vercel-adapter. Lokaal testen doe je met `npm run dev`; een productie-achtige test doe je via een Vercel preview-deploy.

## Prijzen aanpassen — één bestand

Alle prijzen staan in **`src/data/pricing.ts`**: de drie basispakketten, alle 16 add-ons en de onderhoudsplannen. Pas daar een getal aan en de menukaart, de configurator, de offertemail én de tests rekenen automatisch mee.

Alle zichtbare tekst staat in **`src/data/site.ts`** (inclusief de FAQ, reviews en de privacyverklaring). Vóór livegang: vervang de placeholders — grep op `{KVK}`, `{BTW}`, `{Bedrijf}` en zet je echte WhatsApp-nummer in `site.whatsapp` (internationaal formaat zonder `+`, bijv. `31612345678`).

## Accentkleur wisselen — één CSS-variabele

In **`src/styles/global.css`** staat bovenaan:

```css
:root {
  --accent: #4f46e5;
}
```

Verander alléén deze waarde. Alle knoppen, badges, de canvas-animatie van de hero en zelfs de confetti rekenen erop mee.

## `RESEND_API_KEY` instellen

Het offerteformulier POST naar `/api/lead`, dat de aanvraag via [Resend](https://resend.com) mailt naar `scottprins32@gmail.com`.

1. Maak een gratis API-key aan op resend.com → **API Keys**.
2. Lokaal: kopieer `.env.example` naar `.env` en vul de key in.
3. Op Vercel: **Settings → Environment Variables** → `RESEND_API_KEY` toevoegen (werkt direct, geen rebuild nodig).

**Zonder key blijft de site gewoon werken**: de API antwoordt dan `503` en het formulier toont automatisch een `mailto:`-knop plus de WhatsApp-knop, met de volledige samenstelling voor-ingevuld.

> Resend verstuurt zonder geverifieerd domein alleen vanaf `onboarding@resend.dev` (zo staat het nu ingesteld in `src/pages/api/lead.ts`). Wil je mailen vanaf `@scottprins.nl`? Verifieer het domein in Resend (**Domains → Add domain**, DNS-records toevoegen) en pas `FROM_ADDRESS` aan.

## Deployen op Vercel (met eigen domein)

1. Push deze repo naar GitHub en kies op [vercel.com](https://vercel.com) **Add New → Project → Import**. Vercel herkent Astro automatisch; de standaardinstellingen zijn goed.
2. Voeg bij **Environment Variables** de `RESEND_API_KEY` toe.
3. Na de eerste deploy: **Settings → Domains → Add** → `scottprins.nl` (en `www.scottprins.nl`, met redirect naar de kale domeinnaam).
4. Stel bij je domeinregistrar de DNS in die Vercel toont (A-record `76.76.21.21` of de aangegeven CNAME). SSL regelt Vercel zelf.

Cloudflare Pages kan ook: vervang dan `@astrojs/vercel` door `@astrojs/cloudflare` in `astro.config.mjs` en lees de key via de Pages-omgevingsvariabelen.

## Hoe de site in elkaar zit

```
src/
  data/pricing.ts        ← alle prijzen (types + data, nul imports)
  data/site.ts           ← alle Nederlandse tekst
  lib/calc.ts            ← pure rekenfunctie (client + server!) — getest
  lib/lead.ts            ← gedeelde formuliervalidatie (client + server)
  lib/quote.ts           ← samenstelling → tekst (e-mail, mailto, WhatsApp)
  scripts/store.ts       ← selectie-store (localStorage + CustomEvent)
  scripts/motion.ts      ← GSAP/ScrollTrigger-setup + reduced-motion-guard
  scripts/hero-scene.ts  ← canvas-scène van de hero (pure drawScene)
  pages/index.astro      ← de one-pager
  pages/privacy.astro    ← AVG-privacyverklaring
  pages/api/lead.ts      ← de enige serverless route
  components/            ← secties; components/demos/ ← de 12 live demo's
```

Ontwerpbeslissingen die het weten waard zijn:

- **De totalen worden server-side herrekend.** `/api/lead` vertrouwt nooit bedragen van de client; dezelfde `calcTotals` draait aan beide kanten.
- **De hero is code, geen video.** `hero-scene.ts` tekent elk frame uit een progress-waarde (0–1); ScrollTrigger scrubt hem in de hero, en demo-sectie "Optie 11" speelt exact dezelfde scène tijd-gestuurd af. Kosten: ~4 kB in plaats van een videobestand.
- **`prefers-reduced-motion` wordt overal gerespecteerd.** GSAP-animaties bestaan alleen binnen `gsap.matchMedia()`; CSS-animaties (marquee, flip, confetti) hebben eigen `@media`-fallbacks. De hero is zonder JavaScript of met reduced motion een statische versie met alle tekst zichtbaar.
- **Google Maps laadt lui.** De kaart-demo gebruikt de keyless iframe-embed en wordt pas geïnjecteerd als de sectie bijna in beeld is. Wil je ooit échte custom pins: dat vraagt de Maps JavaScript API (met key + billing); de wisselknoppen zijn daarop voorbereid.
- **Geen view transitions (`<ClientRouter />`).** Voeg je die later toe, dan moeten alle ScrollTriggers worden opgeruimd bij `astro:before-swap` — nu niet nodig omdat elke navigatie een echte page load is.

## Tests

```bash
npm test
```

Dekt de volledige rekenlogica van de configurator (`src/lib/calc.test.ts`): alle pakketten, care-plans, dubbele/onbekende add-on-ids (verouderde localStorage), volgorde-onafhankelijkheid en een "kitchen sink"-integriteitscheck die meebreekt als iemand per ongeluk een prijs in `pricing.ts` wijzigt zonder de tests bij te werken.
