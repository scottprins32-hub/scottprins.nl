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

## Doodlopende wegen / niet nog eens proberen

*(nog leeg)*

## Aantekeningen per iteratie

### 1 — Render-blokkerende CSS inline zetten
Lighthouse gaf `render-blocking-insight` als grootste post (~700 ms geschat): twee
stylesheets van 10,3 kB en 1,9 kB die vóór de eerste paint opgehaald moesten worden.
Met `inlineStylesheets: 'always'` staan ze in de HTML en vervalt die round-trip.
Werkelijke winst kleiner dan de schatting (−111 ms LCP, −144 ms FCP) omdat de test
tegen localhost draait en de gesimuleerde latency dus milder uitpakt dan in het echt;
op een echte verbinding is de winst naar verwachting groter. Inhoud ongewijzigd.
