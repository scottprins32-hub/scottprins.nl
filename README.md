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

Alle prijzen staan in **`src/data/pricing.ts`**: de drie basispakketten, alle add-ons (met per pakket gratis inbegrepen extra’s via `includedAddons`) en de onderhoudsplannen. Pas daar een getal aan en de menukaart, de configurator, de offertemail én de tests rekenen automatisch mee.

Alle zichtbare tekst staat per taal in **`src/data/content/nl.ts`** en **`src/data/content/en.ts`** (inclusief de FAQ, reviews en de privacyverklaring). Vóór livegang: vervang de laatste placeholder — grep op `{BTW}` — in beide bestanden.

## Twee talen — Nederlands is de standaard

De site draait tweetalig: Nederlands op `/`, Engels op `/en/`. Er wordt niets automatisch omgeschakeld op basis van de browser; de bezoeker kiest zelf via de NL|EN-schakelaar rechtsboven in de hero en in de navigatiebalk. Beide zijn echte links, dus ze werken zonder JavaScript en zijn deelbaar.

* `src/data/content/index.ts` — `content(locale)` geeft het juiste taalpakket. Zonder argument (in browser-scripts) leest hij `<html lang>`, dus dezelfde code werkt op beide routes.
* `altPath(pad, taal)` rekent een pad om naar de andere taal; `Base.astro` maakt daar de canonical en de `hreflang`-links mee.
* Getallen en valuta volgen de taal: `€ 1.195` / `€ 29 p/m` in het Nederlands, `€1,195` / `€29/mo` in het Engels (zie `src/lib/format.ts`).
* Een nieuwe tekst toevoegen = een sleutel in **beide** bestanden zetten; `npx astro check` valt erover als er één ontbreekt.
* De mail naar Scotts eigen inbox blijft altijd Nederlands, met een regel die vermeldt in welke taal de aanvrager de site gebruikte.

## Accentkleur wisselen — één CSS-variabele

In **`src/styles/global.css`** staat bovenaan:

```css
:root {
  --accent: #4f46e5;
}
```

Verander alléén deze waarde. Alle knoppen, badges, de intro-animatie en zelfs de confetti rekenen erop mee.

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
  data/site.ts           ← taalonafhankelijke bedrijfsgegevens
  data/content/nl.ts     ← alle Nederlandse tekst
  data/content/en.ts     ← alle Engelse tekst
  data/content/index.ts  ← content(locale) + altPath()
  lib/calc.ts            ← pure rekenfunctie (client + server!) — getest
  lib/lead.ts            ← gedeelde formuliervalidatie (client + server)
  lib/quote.ts           ← samenstelling → tekst (e-mail, mailto, WhatsApp)
  scripts/store.ts       ← selectie-store (localStorage + CustomEvent)
  scripts/motion.ts      ← GSAP/ScrollTrigger-setup + reduced-motion-guard
  scripts/scene-timeline.ts ← bouw-timeline van de intro (gedeeld met demo 11)
  pages/index.astro      ← de one-pager (NL)   ┐ allebei dun: de inhoud
  pages/en/index.astro   ← de one-pager (EN)   ┘ staat in HomePage.astro
  pages/privacy.astro    ← AVG-privacyverklaring (NL)
  pages/en/privacy.astro ← privacy policy (EN)
  pages/api/lead.ts      ← de enige serverless route
  components/            ← secties; components/demos/ ← de 12 live demo's
```

Ontwerpbeslissingen die het weten waard zijn:

- **De totalen worden server-side herrekend.** `/api/lead` vertrouwt nooit bedragen van de client; dezelfde `calcTotals` draait aan beide kanten.
- **De intro is code, geen video.** `HeroScene.astro` is een mini-scottprins.nl uit échte site-onderdelen (prijskaart, chatbot, review, cart-pill — met live prijzen uit `pricing.ts`); `scene-timeline.ts` bouwt hem op. ScrollTrigger scrubt de opbouw in de hero (na een logo-splash bij het laden), en demo-sectie "Optie 11" speelt exact dezelfde timeline tijd-gestuurd af. Kosten: een paar kB HTML/CSS in plaats van een videobestand — en de "screenshots" lopen nooit achter op de echte site.
- **`prefers-reduced-motion` wordt overal gerespecteerd.** GSAP-animaties bestaan alleen binnen `gsap.matchMedia()`; CSS-animaties (marquee, flip, confetti) hebben eigen `@media`-fallbacks. De hero is zonder JavaScript of met reduced motion een statische versie met alle tekst zichtbaar.
- **Google Maps laadt lui.** De kaart-demo gebruikt de keyless iframe-embed en wordt pas geïnjecteerd als de sectie bijna in beeld is. Wil je ooit échte custom pins: dat vraagt de Maps JavaScript API (met key + billing); de wisselknoppen zijn daarop voorbereid.
- **Geen view transitions (`<ClientRouter />`).** Voeg je die later toe, dan moeten alle ScrollTriggers worden opgeruimd bij `astro:before-swap` — nu niet nodig omdat elke navigatie een echte page load is.

## Tests

```bash
npm test
```

Dekt de volledige rekenlogica van de configurator (`src/lib/calc.test.ts`): alle pakketten, care-plans, dubbele/onbekende add-on-ids (verouderde localStorage), volgorde-onafhankelijkheid en een "kitchen sink"-integriteitscheck die meebreekt als iemand per ongeluk een prijs in `pricing.ts` wijzigt zonder de tests bij te werken.
