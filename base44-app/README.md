# scottprins.nl op Base44

Dezelfde site als de Astro-versie in de map erboven, nu als Base44-app: Vite + React, zoals modernpitching.nl. Base44 bouwt hem met `npm run build` (zie `base44/config.jsonc`) en serveert `dist/` als single-page app. Publiceren gaat met de knop **Publish** in Base44.

## Hoe het in elkaar zit

- **Elke pagina laadt opnieuw.** Links zijn gewone `<a href>`, geen client-side navigatie. React Router kiest alleen welke pagina er komt (`src/App.jsx`). Zo starten de animaties altijd op een verse pagina, net als op de statische site.
- **Teksten** staan in `src/data/content/` (nl.ts is leidend, en.ts volgt; `content.test.ts` bewaakt de pariteit). Prijs en termijnen in `src/data/offer.ts`, bedrijfsgegevens in `src/data/site.ts`.
- **Interactie** (upgrade-ding, 50 ms-test, bestelbon, navigatie) zit in `src/scripts/`, gewone browsercode die elk onderdeel na het tekenen start (`useEffect`). React tekent die stukken één keer en laat ze daarna met rust, zodat de scripts de DOM zelf mogen bijwerken.
- **Stijl:** `src/styles/global.css` (tokens, Tailwind v4) en `src/styles/sites.css` (de voorbeeldsites); elk onderdeel heeft een eigen `.css` naast de `.jsx`.
- **Head per pagina:** `src/lib/head.js` zet titel, beschrijving, canonical, hreflang en structured data. `index.html` bevat die van de Nederlandse homepage, voor wie geen JavaScript draait.
- **Beelden:** `npm run images` maakt de WebP-versies in `src/assets/gen/` (nodig als er een foto bijkomt of wijzigt). `<Img name="scott" sizes="…">` zet srcset en afmetingen.

## De bestelbon

Het formulier roept de Base44-functie `sendLead` aan (`base44/functions/sendLead/`). Die controleert de bon opnieuw, slaat hem op als **Lead** (`base44/entities/Lead.jsonc`) en mailt hem via Base44 naar Scott; de bezoeker krijgt een kopie. Bezoekers schrijven zelf geen Leads, alleen de functie (service-rol). Lukt versturen niet, dan staat dezelfde bon klaar voor WhatsApp of mail.

De labels in de mail staan in `base44/functions/sendLead/labels.ts`; `src/lib/send-lead-labels.test.ts` faalt als ze uit de pas lopen met de site.

## Commando's

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # teksten (nl/en), bestelbon-regels, mail-labels
npm run build      # wat Base44 ook draait
npm run images     # WebP-versies opnieuw maken
bash scripts/preview.sh   # preview op GitHub Pages (zonder Base44)
```

## Privacy

De privacyverklaring noemt Base44 (onderdeel van Wix) als enige verwerker: hosting, de opgeslagen bestelbon en de bevestigingsmail. De paginateller van de Base44-plugin staat uit (`analyticsTracker: false` in `vite.config.js`), want de verklaring belooft geen analytics.
