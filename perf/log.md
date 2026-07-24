# Performance-log — scottprins.nl

Doel: sneller laden, **zonder** inhoud weg te halen. Uitstellen mag, weglaten niet.

Meetmethode: `perf/run.sh <label> [url]` draait Lighthouse 3× (mobiel, standaard
throttling) tegen de productie-build en neemt de **mediaan**. Eén losse meting is
waardeloos: de score zakt met tientallen punten zodra er nog iets anders CPU vraagt.
Draai daarom altijd met één enkele server actief en verder niets.

| # | Wijziging | LCP | FCP | TBT | Score | Besluit |
|---|-----------|-----|-----|-----|-------|---------|
| 0 | *baseline* | 2,533 s | 2,145 s | 213 ms | 92 | — |
| 1 | `build.inlineStylesheets: 'always'` | 2,422 s | 2,001 s | 203 ms | 93 | **behouden** (−4,4 % LCP) |
| 2 | `content-visibility` op de demo-secties | 2,262 s | 1,996 s | 222 ms | 93 | **teruggedraaid** — brak ankerlinks |
| 3 | idem + ankers vooraf laten renderen | 2,284 s | 1,997 s | 247 ms | 92 | **behouden** (−5,7 % t.o.v. 1) |

**Totaal tot nu toe: LCP 2,533 s → 2,284 s (−9,8 %).**

## Doodlopende wegen / niet nog eens proberen

- **`content-visibility` zónder anker-afhandeling.** Werkt qua snelheid
  (−6,6 %), maar de geschatte sectiehoogtes wijken ~80 px per sectie af van
  de echte. Over twaalf secties liep een klik op “Optie 11 op de menukaart”
  daardoor 2480 px naast het doel. De smoke-test zag dit níet, omdat die
  `scrollIntoView()` gebruikt in plaats van echte ankerklikken. Alleen
  bruikbaar mét het pre-render-script in `Base.astro` (iteratie 3).
- **`cache-insight` (≈145 kB besparing).** Meetartefact van de lokale
  `serve`: die stuurt geen lange cache-headers mee. Vercel doet dat wel voor
  `/_astro/*` en `/fonts/*`. Niets aan te doen in de code.
- **Ongebruikte JavaScript afsplitsen.** GSAP (46 kB gz) is nodig vóór de
  eerste animatie; later laden maakt juist het lege-frame-moment langer dat
  we in de hero net hebben weggewerkt.

## Aantekeningen per iteratie

### 1 — Render-blokkerende CSS inline zetten
Lighthouse gaf `render-blocking-insight` als grootste post (~700 ms geschat): twee
stylesheets van 10,3 kB en 1,9 kB die vóór de eerste paint opgehaald moesten worden.
Met `inlineStylesheets: 'always'` staan ze in de HTML en vervalt die round-trip.
Werkelijke winst kleiner dan de schatting (−111 ms LCP, −144 ms FCP) omdat de test
tegen localhost draait en de gesimuleerde latency dus milder uitpakt dan in het echt;
op een echte verbinding is de winst naar verwachting groter. Inhoud ongewijzigd.

### 2 — Off-screen renderwerk uitstellen (teruggedraaid)
Grootste post na iteratie 1: `mainthread-work-breakdown` met **Style & Layout
1460 ms** — de browser rekende de layout van alle twaalf demo-secties uit
(inclusief een tweede volledige 3D-scène in optie 11) terwijl je er nog geen
enkele ziet. `content-visibility: auto` bracht LCP naar 2,262 s (−6,6 %).
Maar: een klik op de hero-caption landde 2480 px naast optie 11, doordat de
geschatte hoogtes afwijken van de echte. Die caption is juist de regel die
uitlegt hoe de hele site werkt — dus teruggedraaid.

### 3 — Zelfde uitstel, maar ankers eerst echt renderen (behouden)
`Base.astro` vangt nu elke klik op een `#anker` af (capture-fase, vóór de
browser gaat scrollen), zet de secties tót en met het doel op
`content-visibility: visible` en forceert één layout. Daarna klopt de
sprong exact. Gecontroleerd: caption → optie 11, hero-CTA → menukaart,
hero-CTA → configurator en configurator → demo agenda landen alle vier op
88 px (de `scroll-margin-top` voor de navigatiebalk). LCP 2,284 s.
TBT liep licht op (203 → 247 ms) doordat het uitgestelde renderwerk deels
tijdens het scrollen terugkomt; LCP is hier het doel, dus behouden.
