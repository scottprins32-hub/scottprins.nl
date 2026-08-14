/**
 * Nederlandse teksten. Dit is de standaardtaal van de site.
 * Tekst aanpassen? Alleen hier. Prijzen (de getallen) staan in pricing.ts.
 *
 * Placeholders die je vóór livegang moet vervangen (grep op '{'):
 *   {BTW}  — in `footer`
 */
import { site } from '../site';

/* ------------------------------ Hero ------------------------------ */

const hero = {
  eyebrow: 'Webdesign uit Nederland · vaste prijzen',
  /** De H1 — staat vanaf de eerste seconde in beeld (ook de LCP van de pagina). */
  headline: 'Websites die werken. Gebouwd in dagen, niet maanden.',
  /** Vaste ondertitel onder de H1. */
  sub: 'Kies je basis, kies je extra’s — en zie precies wat je krijgt terwijl je site zichzelf bouwt. Live binnen 5 werkdagen, altijd een vaste prijs.',
  actions: {
    primary: { label: 'Stel je website samen', href: '#configurator' },
    secondary: { label: 'Bekijk de menukaart', href: '#menu' },
  },
  /**
   * De vijf bouwdagen. `label` verschijnt in de voortgangsbalk links,
   * `text` is de regel die tijdens het scrollen meeloopt met de bouw.
   */
  days: [
    { label: 'Schets', text: 'Dag 1 — we beginnen bij jouw verhaal. Geen template.' },
    { label: 'Ontwerp', text: 'Dag 2 — jouw kleuren, jouw foto’s, jouw toon.' },
    { label: 'Bouwen', text: 'Dag 3 — alles wat je hier ziet werken, kun je bestellen.' },
    { label: 'Content', text: 'Dag 4 — teksten, prijzen en openingstijden staan erin. En dan gaat het licht aan.' },
    { label: 'Live', text: 'Dag 5 — vindbaar, snel, en van jou. Klaar voor klanten.' },
  ],
  caption: '↑ Dit effect? Ook gewoon te bestellen. Optie 11 op de menukaart.',
  captionTargetId: 'menu-scrollvideo',
  scrollHint: 'Scroll — dan bouwt hij zichzelf',
  /** Meelopende prijsteller: laat zien wat er verschijnt én wat het kost. */
  ledger: {
    label: 'Jouw site tot nu toe',
    upfrontLabel: 'eenmalig',
    monthlyLabel: 'p/m',
    cta: 'Zet ’m in mijn offerte →',
  },
} as const;

/* ------------------------------ Navigatie --------------------------- */

const nav = {
  links: [
    { label: 'Menukaart', href: '#menu' },
    { label: 'Voorbeelden', href: '#examples' },
    { label: 'Prijzen', href: '#configurator' },
    { label: 'Resultaat', href: '#results' },
    { label: 'Over Scott', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: 'Offerte',
  skipToContent: 'Naar inhoud',
  menuLabel: 'Hoofdmenu',
  langLabel: 'Taal',
  langSwitchTo: 'Switch to English',
} as const;

/* --------------------------- Zo werkt het -------------------------- */

const howItWorks = {
  kicker: 'Zo werkt het',
  title: 'Drie stappen. Geen gedoe.',
  steps: [
    {
      title: 'Kies je basis',
      text: 'Visitekaartje, Compleet of Interactief — drie eerlijke pakketten met vaste prijzen.',
    },
    {
      title: 'Kies je extra’s',
      text: 'Op deze site probeer je elke functie live: voeg toe wat bij jouw zaak past.',
    },
    {
      title: 'Live binnen 5 werkdagen',
      text: 'Binnen 48 uur een offerte + gratis demo-voorstel. Akkoord? Dan bouw ik direct.',
    },
  ],
} as const;

/* ------------------------- De menukaart ---------------------------- */

const menuIntro = {
  kicker: 'De menukaart',
  title: 'Niet lezen wat het doet. Gewoon proberen.',
  lead: 'Elke optie hieronder is een échte, werkende demo. Bevalt het? Tik op “In mijn website” en hij staat in je offerte.',
} as const;

/* Demo 1 — Online agenda (fictieve massagepraktijk) */
const demoAgenda = {
  kicker: 'Optie 1',
  title: 'Online agenda',
  lead: 'Je klant boekt zelf, dag en nacht. Probeer maar — dit is ’m echt.',
  businessName: 'Praktijk Demo',
  treatments: [
    { id: 'sport', name: 'Sportmassage', duration: '30 min', price: '€ 42' },
    { id: 'ontspanning', name: 'Ontspanningsmassage', duration: '60 min', price: '€ 69' },
    { id: 'intake', name: 'Intake + behandeling', duration: '45 min', price: '€ 55' },
  ],
  therapists: [
    { id: 'emma', name: 'Emma', role: 'Sportmasseur' },
    { id: 'yusuf', name: 'Yusuf', role: 'Fysiotherapeut' },
    { id: 'lotte', name: 'Lotte', role: 'Massagetherapeut' },
  ],
  slots: ['09:00', '10:30', '11:45', '14:00', '15:30', '16:45'],
  confirmTitle: 'Afspraak bevestigd!',
  confirmText: 'Zo makkelijk is het voor jouw klanten. De bevestiging gaat automatisch; sms-herinneringen kunnen erbij als optie.',
  restart: 'Nog een keer proberen',
  stepLabels: ['Behandeling', 'Behandelaar', 'Tijdstip'],
} as const;

/* Demo 2 — AI-chatbot (fictieve kapsalon) */
const demoChatbot = {
  kicker: 'Optie 2',
  title: 'AI-chatbot',
  lead: 'Getraind op jouw zaak: openingstijden, prijzen, afspraken. Stel ’m een vraag.',
  botName: 'Salon Demo',
  status: 'reageert direct',
  sendButton: 'Stuur',
  greeting: 'Hoi! Ik ben de assistent van Salon Demo. Vraag me iets over openingstijden, prijzen of afspraken. 💇',
  placeholder: 'Typ je vraag…',
  suggestions: ['Wat zijn de openingstijden?', 'Wat kost knippen?', 'Kan ik vandaag nog terecht?'],
  /** Sleutelwoorden → antwoord. Eerste match wint (van boven naar beneden). */
  answers: [
    {
      keywords: ['open', 'hoe laat', 'wanneer', 'tijden', 'zondag', 'maandag'],
      reply: 'We zijn open van dinsdag t/m zaterdag, 09:00–17:30. Maandag en zondag zijn we gesloten.',
    },
    {
      keywords: ['knippen', 'knipbeurt'],
      reply: 'Knippen kost € 34,50 (dames en heren). Wassen en drogen zit er altijd bij.',
    },
    {
      keywords: ['kleuren', 'verven', 'highlights'],
      reply: 'Kleuren begint bij € 65, highlights bij € 79. De exacte prijs hangt af van je haarlengte.',
    },
    {
      keywords: ['prijs', 'kost', 'tarief', 'tarieven', 'duur'],
      reply: 'Knippen € 34,50 · kleuren vanaf € 65 · föhnen € 27,50. Wil je de hele prijslijst zien?',
    },
    {
      keywords: ['afspraak', 'boeken', 'reserveren', 'terecht', 'plek', 'vandaag', 'morgen'],
      reply: 'Dat kan! Via de online agenda plan je direct een afspraak — vandaag is er nog plek om 15:30. 📅',
    },
    {
      keywords: ['adres', 'waar', 'locatie', 'parkeren', 'zitten jullie'],
      reply: 'Je vindt ons aan de Demostraat 12 in Utrecht. Parkeren kan gratis om de hoek.',
    },
    {
      keywords: ['betalen', 'pin', 'ideal', 'contant', 'tikkie'],
      reply: 'Je kunt bij ons pinnen, contactloos betalen of een betaalverzoek krijgen. Contant mag ook.',
    },
    {
      keywords: ['annuleren', 'verzetten', 'afzeggen'],
      reply: 'Afspraak verzetten of annuleren kan gratis tot 24 uur van tevoren, gewoon via de link in je bevestiging.',
    },
    {
      keywords: ['cadeaubon', 'kado', 'cadeau'],
      reply: 'Leuk! We verkopen digitale cadeaubonnen vanaf € 15 — die kun je direct online bestellen. 🎁',
    },
    {
      keywords: ['kind', 'kinderen'],
      reply: 'Kinderen tot 12 jaar knippen we voor € 19,50. Neem ze gerust mee!',
    },
  ],
  fallback: 'In het echt sluit ik aan op jouw kennis en agenda 😉 Voor deze demo ken ik vooral vragen over openingstijden, prijzen en afspraken.',
} as const;

/* Demo 3 — Interactieve kaart (fictieve fietsenwinkel-keten) */
const demoKaart = {
  kicker: 'Optie 3',
  title: 'Interactieve kaart',
  lead: 'Meerdere vestigingen? Eén kaart, altijd actueel. Wissel maar van locatie.',
  locations: [
    {
      id: 'amsterdam',
      name: 'Demo Fietsen Amsterdam',
      address: 'Prinsengracht 263, Amsterdam',
      q: 'Prinsengracht 263, Amsterdam',
    },
    {
      id: 'utrecht',
      name: 'Demo Fietsen Utrecht',
      address: 'Oudegracht 158, Utrecht',
      q: 'Oudegracht 158, Utrecht',
    },
    {
      id: 'eindhoven',
      name: 'Demo Fietsen Eindhoven',
      address: 'Markt 17, Eindhoven',
      q: 'Markt 17, Eindhoven',
    },
  ],
  loadLabel: 'Kaart laden',
  privacyNote: 'De kaart laadt pas als je ’m in beeld scrolt — scheelt data en trackers.',
} as const;

/* Demo 4 — Prijscalculator (fictief klusbedrijf) */
const demoCalculator = {
  kicker: 'Optie 4',
  title: 'Prijscalculator',
  lead: 'Laat bezoekers zelf rekenen — jij krijgt aanvragen van mensen die al weten wat het kost.',
  heading: 'Wat kost jouw badkamer-renovatie?',
  sliders: [
    { id: 'oppervlak', label: 'Oppervlakte', min: 2, max: 15, value: 6, unit: 'm²' },
    { id: 'afwerking', label: 'Afwerkingsniveau', min: 1, max: 3, value: 2, unit: '', labels: ['Basis', 'Comfort', 'Luxe'] },
    { id: 'sanitair', label: 'Sanitair', min: 1, max: 3, value: 2, unit: '', labels: ['Standaard', 'Middenklasse', 'Design'] },
  ],
  /** Rekensom van de demo: basis + m² × factor(afwerking) + sanitair-staffel. */
  formula: { base: 2400, perM2: [650, 850, 1150], sanitair: [900, 1900, 3400] },
  resultLabel: 'Richtprijs incl. montage',
  disclaimer: 'Demobedragen — jouw calculator rekent met jouw eigen prijzen.',
} as const;

/* Demo 5 — Eigen online bestellen (fictieve pizzeria) */
const demoBestellen = {
  kicker: 'Optie 5',
  title: 'Eigen online bestellen',
  lead: 'Bestellen via je eigen site in plaats van een bezorgplatform. Reken zelf uit wat dat scheelt.',
  restaurantName: 'Pizzeria La Vera (demo)',
  items: [
    { id: 'margherita', name: 'Margherita', price: 11.5 },
    { id: 'quattro', name: 'Quattro Formaggi', price: 14.0 },
    { id: 'diavola', name: 'Diavola', price: 13.5 },
    { id: 'tiramisu', name: 'Tiramisu', price: 6.5 },
  ],
  checkoutTitle: 'Afrekenen',
  checkoutNote: 'Demo-checkout — er wordt niets afgeschreven.',
  payButton: 'Betalen met iDEAL',
  payNow: 'Betaal',
  banks: ['Demobank', 'ING', 'Rabobank', 'ABN AMRO'],
  emptyCart: 'Nog niets besteld',
  orderAgain: 'Opnieuw bestellen',
  paidTitle: 'Bestelling binnen! 🍕',
  paidText: 'Direct in jouw keuken, zonder commissie eroverheen.',
  /** Gemiddelde platform-commissie waarmee de besparingsteller rekent. */
  commissionRate: 0.13,
  savingsLine: 'Bij 200 bestellingen/maand bespaar je ±€ 7.000/jaar aan bezorgplatform-commissie.',
  savedLabel: 'bespaard t.o.v. bezorgplatform',
} as const;

/* Demo 6 — Reviews-wall */
const demoReviews = {
  kicker: 'Optie 6',
  ariaLabel: 'Voorbeeld-reviews van Google',
  title: 'Reviews-wall',
  lead: 'Je Google-reviews, automatisch vers en stijlvol in beeld. Deze wall scrolt vanzelf.',
  reviews: [
    { name: 'Sanne V.', stars: 5, text: 'Binnen een week een site waar ik écht trots op ben. Snelle communicatie, vaste prijs, geen verrassingen.' },
    { name: 'Mehmet K.', stars: 5, text: 'De online agenda scheelt me elke week uren aan telefoontjes. Had ik veel eerder moeten doen.' },
    { name: 'Lisa de B.', stars: 5, text: 'Eindelijk iemand die gewoon doet wat hij belooft. Site stond live op dag vier.' },
    { name: 'Peter J.', stars: 4, text: 'Strakke site, goed vindbaar in Google. Kleine wijzigingen worden razendsnel opgepakt.' },
    { name: 'Fatima A.', stars: 5, text: 'De chatbot beantwoordt ’s avonds de vragen die ik vroeger allemaal zelf terugbelde.' },
    { name: 'Joris T.', stars: 5, text: 'Van bezorgplatform naar eigen bestelsite: de commissie die ik bespaar betaalt de site dubbel terug.' },
    { name: 'Anouk R.', stars: 5, text: 'Duidelijke menukaart met prijzen, dus je weet vooraf waar je aan toe bent. Verademing.' },
    { name: 'Bas W.', stars: 5, text: 'Mijn oude site was uit 2011. Het verschil? Klanten zeggen nu: “wat zien jullie er professioneel uit”.' },
  ],
} as const;

/* Demo 7 — Before/after-slider (fictieve bakkerij) */
const demoBeforeAfter = {
  kicker: 'Optie 7',
  title: 'Before/after-slider',
  lead: 'Perfect voor kappers, klussers, hoveniers — of, zoals hier, voor het verschil dat een nieuwe website maakt. Sleep maar.',
  beforeLabel: 'Oude site (2010)',
  afterLabel: 'Nieuwe site',
  sliderLabel: 'Vergelijk oude en nieuwe website',
  bakkerij: {
    name: 'Bakkerij De Korenbloem',
    tagline: 'Elke dag vers uit eigen oven',
    items: ['Desembrood', 'Croissants', 'Appeltaart'],
    orderButton: 'Online bestellen',
    /* De 2010-site is een parodie — vandaar de hoofdletters en de uitroeptekens. */
    oud: {
      welkom: '~*~ Welkom bij',
      nav: ['Home', 'Fotoalbum', 'Gastenboek', 'Links'],
      menuTitle: 'Menu',
      menuItems: ['» Ons brood', '» Openingstijden', '» Route'],
      nieuws: 'NIEUW!! Nu ook met appeltaart!!',
      bezoekers: 'Bezoekers: 004217',
      foto: '[winkel_foto_klein.jpg]',
      bodyPre: 'Al meer dan 25 jaar uw vertrouwde adres voor',
      bodyPost: 'en nog veel meer!!! Komt u gerust eens langs in de winkel.',
      link: 'klik hier voor de openingstijden',
      footer: '© 2010 | Deze site werkt het best in Internet Explorer 8',
    },
  },
} as const;

/* Demo 8 — Digitale intake */
const demoIntake = {
  kicker: 'Optie 8',
  /** {n} en {totaal} worden vervangen door de cijfers. */
  stepCounter: 'Stap {n} van {totaal}',
  title: 'Digitale intake',
  lead: 'Nieuwe klanten vullen hun gegevens vooraf in. Jij begint elk gesprek voorbereid.',
  steps: [
    {
      title: 'Je gegevens',
      fields: [
        { id: 'naam', label: 'Naam', type: 'text', placeholder: 'Anna Voorbeeld' },
        { id: 'geboortedatum', label: 'Geboortedatum', type: 'text', placeholder: '12-04-1988' },
      ],
    },
    {
      title: 'Je hulpvraag',
      fields: [
        { id: 'klacht', label: 'Waar kan ik je mee helpen?', type: 'textarea', placeholder: 'Bijv. aanhoudende schouderklachten…' },
      ],
    },
    {
      title: 'Beschikbaarheid',
      fields: [
        { id: 'voorkeur', label: 'Wanneer kun je meestal?', type: 'choice', options: ['Ochtend', 'Middag', 'Avond'] },
      ],
    },
  ],
  doneTitle: 'Intake ontvangen ✓',
  doneText: 'In het echt staat dit nu klaar in jouw mailbox of dossier — vóór het eerste gesprek.',
  next: 'Volgende',
  back: 'Terug',
  send: 'Versturen',
  restart: 'Demo opnieuw',
} as const;

/* Demo 9 — Klantenportaal */
const demoPortaal = {
  kicker: 'Optie 9',
  title: 'Klantenportaal',
  lead: 'Documenten, afspraken en facturen achter één eigen login. Log maar in (alles mag).',
  loginTitle: 'Inloggen bij Demo & Co',
  emailLabel: 'E-mailadres',
  passwordLabel: 'Wachtwoord',
  loginButton: 'Inloggen',
  loginHint: 'Demo: elke invoer werkt.',
  welcome: 'Welkom terug, Anna 👋',
  tiles: [
    { icon: '📄', title: 'Documenten', detail: '3 bestanden' },
    { icon: '📅', title: 'Afspraken', detail: 'di 14:00 — controle' },
    { icon: '🧾', title: 'Facturen', detail: '1 openstaand' },
    { icon: '💬', title: 'Berichten', detail: '2 ongelezen' },
  ],
  logout: 'Uitloggen',
} as const;

/* Demo 10 — Meertalig: de NL- en EN-kopij van déze sectie */
const demoMeertalig = {
  kicker: 'Optie 10',
  ariaLabel: 'Kies een taal',
  nl: {
  title: 'Meertalig',
    lead: 'Deze knop hierboven doet het echt: de hele sectie wisselt van taal. Handig voor toeristen, expats en internationale klanten.',
    bullets: [
      'Automatische taalkeuze op basis van de browser',
      'Nette vertaal-structuur, goed voor Google',
      'Jij levert de tekst — of ik regel de vertaling',
    ],
  },
  en: {
  title: 'Multilingual',
    lead: 'That toggle above actually works: this whole section switches language. Perfect for tourists, expats and international clients.',
    bullets: [
      'Automatic language detection from the browser',
      'Clean translation structure, great for Google',
      'You provide the copy — or I arrange the translation',
    ],
  },
} as const;

/* Demo 11 — Scroll-video / animaties */
const demoScrollvideo = {
  kicker: 'Optie 11',
  title: 'Scroll-video / animaties',
  lead: 'Die opening die je net zag — website die zichzelf opbouwt terwijl je scrolt? Dat is deze optie. Hieronder speelt hij nog een keer af.',
  replay: 'Speel opnieuw af',
} as const;

/* Demo 12 — Cadeaubonnen & stempelkaart */
const demoCadeau = {
  kicker: 'Optie 12',
  title: 'Cadeaubonnen & stempelkaart',
  lead: 'Digitale cadeaubonnen en een stempelkaart in de telefoon — zonder gedoe met papier. Draai de bon maar om.',
  cardBrand: 'Salon Demo',
  cardValue: '€ 25',
  cardCode: 'DEMO-8F2K-2026',
  flipHint: 'Tik om te draaien',
  redeem: 'Verzilveren',
  redeemed: 'Verzilverd! Veel plezier 🎉',
  stampTitle: 'Stempelkaart',
  stampHint: 'Tik om te stempelen',
  stampReward: 'Kaart vol — 10e knipbeurt gratis!',
  stampCount: 10,
} as const;

/* --------------------------- Configurator -------------------------- */

const configurator = {
  kicker: 'Stel je website samen',
  title: 'Jouw website, jouw prijs.',
  lead: 'Kies een basis, zet je extra’s aan (wat je onderweg toevoegde staat al klaar) en zie meteen wat het kost.',
  presetTitle: 'Snel starten — wat voor zaak heb je?',
  presetLead: 'Eén tik en er staat een voorstel klaar dat past bij jouw vak. Daarna pas je alles gewoon aan.',
  baseTitle: 'Kies je basis',
  addonsTitle: 'Kies je extra’s',
  addonsNoDemoNote: 'Geen demo op deze pagina — vraag ernaar, dan laat ik ’m live zien.',
  careTitle: 'Onderhoud & support',
  quoteTitle: 'Jouw samenstelling',
  upfrontLabel: 'Eenmalig',
  monthlyLabel: 'Per maand',
  disclaimer: 'Richtprijs excl. btw — definitieve offerte na kort gesprek, altijd vaste prijs.',
  cartOne: 'optie',
  cartMany: 'opties',
  popularBadge: 'Populair',
  includedBadge: 'Inbegrepen',
  freeLabel: 'gratis',
  seeDemo: 'Bekijk de demo ↑',
  addButton: '+ In mijn website',
  addedButton: '✓ In je website',
  includedButton: '✓ Gratis bij je pakket',
  form: {
  title: 'Vraag je offerte aan',
    name: 'Naam',
    company: 'Bedrijf',
    phone: 'Telefoon / WhatsApp',
    email: 'E-mail',
    message: 'Opmerking (optioneel)',
    submit: 'Stuur mijn samenstelling',
    sending: 'Versturen…',
    success: 'Top! Je ontvangt binnen 48 uur je offerte + een gratis demo-voorstel voor jouw zaak.',
    errorValidation: 'Check even de rood gemarkeerde velden.',
    errorSend: 'Versturen lukte niet. Gebruik een van de knoppen hieronder — je samenstelling gaat automatisch mee.',
    mailtoButton: 'Mail je samenstelling',
    whatsappButton: 'Liever appen? Stuur je samenstelling direct door',
    privacyNote: 'Je gegevens gebruik ik alleen om je offerte te sturen. Zie',
    privacyLink: 'de privacyverklaring',
  },
} as const;

/* ---------------------------- Voorbeelden --------------------------- */
/**
 * Twee complete voorbeeldsites. Let op: de bedrijven zijn verzonnen — dit is
 * geen opgeleverd klantwerk. Zeg dat er ook bij; het maakt de rest
 * geloofwaardiger, niet minder. Echte casestudies horen in `proof.cases`.
 *
 * `base` + `addons` zijn met opzet exact gelijk aan een preset in pricing.ts
 * ('praktijk' en 'klus'). Daardoor klopt niet alleen de prijs die hier staat,
 * maar licht in de configurator ook de bijbehorende snelstart-knop op zodra
 * je hier op "Zet deze samenstelling klaar" tikt.
 */
const showcase = {
  kicker: 'Voorbeelden',
  title: 'Twee complete sites. Klik ze kapot.',
  lead: 'Hierboven staat elke optie los. Zo ziet het eruit als alles samenkomt in één site — inclusief wat zo\u2019n site dan kost. De bedrijven heb ik verzonnen; de sites werken echt.',
  contentsLabel: 'Wat zit erin',
  totalLabel: 'Deze site',
  totalNote: 'Vaste prijs. Live binnen 5–7 werkdagen.',
  presetCta: 'Zet deze samenstelling klaar',
  openCta: 'Open de hele site',
  liveBadge: 'Bekijk live',
  newTab: 'opent in een nieuw tabblad',
  sites: [
    {
      name: 'Fysio Vesting',
      sector: 'Fysiotherapiepraktijk · Naarden',
      domain: 'fysiovesting.nl',
      href: 'https://ad-1-kliniek.base44.app',
      /**
       * Basisnaam van de schermafbeelding in `public/`. Showcase.astro maakt
       * daar `-600.webp` en `-1200.webp` van. Ontbreekt het bestand, dan slaat
       * hij het beeld over en werkt de kaart gewoon zonder.
       */
      image: '/voorbeeld-fysio',
      summary: 'Een complete praktijksite: patiënten plannen zelf, de intake staat klaar voor ze binnenlopen.',
      base: 'interactief',
      /** Gelijk aan preset 'praktijk' in pricing.ts. */
      addons: ['agenda', 'intake', 'portaal', 'sms'] as const,
      /** Eén korte regel per optie: wat het hier doet, niet wat het is. */
      does: {
        agenda: 'patiënten boeken zelf, ook \u2019s avonds',
        intake: 'vooraf ingevuld in plaats van in de wachtkamer',
        portaal: 'oefenvideo\u2019s en afspraken achter een eigen inlog',
        sms: 'herinnering een dag van tevoren',
      },
      extra: '+ een beheerscherm waarop de praktijk de agenda openzet.',
    },
    {
      name: 'Hovenier Van Slooten',
      sector: 'Hovenier & bestrating · Deventer',
      domain: 'hovenier-vanslooten.nl',
      href: 'https://ad-2-vakman.base44.app',
      image: '/voorbeeld-vakman',
      summary: 'Een complete vakmansite: je weet in twee vragen waar je aan toe bent, en de aanvraag komt compleet binnen.',
      base: 'compleet',
      /** Gelijk aan preset 'klus' in pricing.ts. */
      addons: ['calculator', 'intake', 'beforeafter'] as const,
      does: {
        calculator: 'prijsindicatie in vier stappen',
        intake: 'maten en foto\u2019s meteen mee',
        beforeafter: 'projecten met voor- en na-beeld',
      },
      extra: '+ één overzicht waarop alle aanvragen binnenkomen.',
    },
  ],
} as const;

/* ------------------------------ Proof ------------------------------ */

const proof = {
  kicker: 'Resultaat',
  title: 'Dit draait al. Klik het zelf na.',
  lead: 'Geen muur met klantlogo’s en geen quotes die ik zelf verzonnen heb. Wel twee echte sites die ik zelf gebouwd heb én zelf bezit — open ze en klik erdoorheen.',
  visitLabel: 'Bekijk de site',
  newTab: 'opent in een nieuw tabblad',
  builtLabel: 'Wat erop draait',
  cases: [
    {
      company: 'modernpitching.nl',
      sector: 'Mijn eigen bedrijf · honkbaltraining',
      href: 'https://modernpitching.nl',
      extern: true,
      result: 'Twaalf pagina’s, twee talen en een eigen app-omgeving — de site waar mijn eigen coachingbedrijf op draait.',
      built: [
        'AI-coach die vragen van pitchers beantwoordt',
        'Boekingsformulier voor sessies',
        'Video-upload voor een gratis analyse',
        'Dashboard met voortgang en berichten',
        'Volledig Nederlands en Engels',
      ],
    },
    {
      company: 'scottprins.nl',
      sector: 'De pagina waar je nu op staat',
      href: '#menu',
      extern: false,
      result: 'Alles op de menukaart hierboven is hier live. Geen mockups: je hebt de opties net zelf zitten gebruiken.',
      built: [
        'Twaalf werkende demo’s, geen screenshots',
        'Configurator die je prijs live meerekent',
        'Offerte die als mail bij mij binnenkomt',
        'Volledig Nederlands en Engels',
      ],
    },
  ],
  stats: [
    { value: 25, suffix: '+', label: 'sites gebouwd' },
    { value: 5, suffix: ' dagen', label: 'gem. oplevertijd' },
    { value: 48, prefix: '< ', suffix: ' uur', label: 'reactietijd' },
  ],
} as const;

/* ---------------------------- Over Scott --------------------------- */

const about = {
  kicker: 'Over Scott',
  title: 'Direct contact met de maker. Geen accountmanagers.',
  paragraphs: [
    'Ik ben Scott — ik bouw websites en web-apps voor kleine ondernemers in Nederland. Alles wat je op deze pagina ziet werken, heb ik zelf gebouwd. En alles wat ik voor jou bouw, werkt net zo.',
    'Ik werk met moderne AI-tooling. Daarom kan ik leveren in dagen en rekenen in honderden, niet duizenden. Wat níet door AI gebeurt: nadenken over jouw zaak, keuzes maken en kwaliteit bewaken. Dat doe ik.',
    'Je appt of belt rechtstreeks met mij. Vandaag een wijziging nodig? Meestal staat hij er vandaag nog op.',
  ],
  whatsappButton: '💬 App me op WhatsApp',
  photoAlt: 'Foto van Scott Prins',
} as const;

/* ------------------------------- FAQ -------------------------------- */

const faq = {
  kicker: 'FAQ',
  title: 'Goeie vragen.',
  items: [
    {
      q: 'Van wie zijn het domein en de website?',
      a: 'Van jou. Het domein staat op jouw naam en je krijgt op verzoek altijd alle bestanden en toegangen. Je zit nergens aan vast.',
    },
    {
      q: 'Wat als ik wil stoppen met het maandbedrag?',
      a: 'Opzeggen kan maandelijks. Je site blijft van jou; je verhuist ’m naar eigen hosting of ik lever alles netjes aan. Alleen de doorlopende diensten (hosting, updates, modules zoals de agenda) stoppen dan.',
    },
    {
      q: 'Hoe snel sta ik live?',
      a: 'De meeste sites staan binnen 5 werkdagen live, gerekend vanaf het moment dat jouw teksten en foto’s binnen zijn. Complexere modules (portaal, bestellen) kunnen een paar dagen extra vragen.',
    },
    {
      q: 'Werkt mijn site goed op mobiel?',
      a: 'Mobiel is het uitgangspunt, niet een bijzaak — de meeste van jouw bezoekers komen via hun telefoon binnen (net als jij waarschijnlijk nu). Elke site test ik op echte telefoons.',
    },
    {
      q: 'Hoe zit het met de AVG en privacy?',
      a: 'Standaard bouw ik zonder tracking-cookies, dus meestal is er geen cookiebanner nodig. Kies je statistieken of een Google-kaart, dan kijken we samen of een melding nodig is — cookieloze statistieken kunnen ook. Formulieren verlopen versleuteld en je krijgt een passende privacyverklaring bij je site.',
    },
    {
      q: 'Wat kost een wijziging na oplevering?',
      a: 'Een kleine wijziging af en toe — een prijs, een foto, je openingstijden — hoort er gewoon bij, ook zonder extra plan. Wil je maandelijks dingen laten aanpassen, dan is daar Plus of Premium voor. Groter meerwerk krijgt altijd eerst een vaste prijs.',
    },
    {
      q: 'Werk je met vaste prijzen?',
      a: 'Altijd. Je ziet hier op de pagina wat alles kost, en je offerte is een vaste prijs. Meerwerk bestaat alleen als jíj iets extra’s wilt — en ook dat hoor je vooraf.',
    },
    {
      q: 'Kan ik later nog opties toevoegen?',
      a: 'Jazeker, dat is precies het idee van de menukaart. Begin klein en zet er later bijvoorbeeld de agenda of chatbot bij — voor de prijzen die je hier ziet.',
    },
  ],
} as const;

/* ------------------------------ Footer ------------------------------ */

const footer = {
  kicker: 'Samenwerken?',
  cta: 'Laten we samen iets moois maken.',
  sub: 'Vertel me over je zaak — binnen 48 uur ligt er een concreet voorstel met een vaste prijs.',
  ctaButton: 'Stel je website samen',
  phoneLine: 'Bellen of appen:',
  kvkLabel: 'KVK',
  kvk: '89874994',
  btwLabel: 'BTW-id',
  btw: '{BTW}',
  privacyLink: 'Privacyverklaring',
  termsLink: 'Algemene voorwaarden',
  rights: `© ${new Date().getFullYear()} ${site.legalName}`,
} as const;

/* --------------------------- Privacy-pagina ------------------------- */

const privacy = {
  title: 'Privacyverklaring',
  metaDescription: `Privacyverklaring van ${site.legalName}: welke gegevens het offerteformulier verwerkt, waarom, en welke rechten je hebt.`,
  updated: 'Laatst bijgewerkt: juli 2026',
  intro: `${site.legalName} (hierna: “ik”) bouwt websites voor kleine ondernemers. Op deze pagina lees je hoe ik omga met de persoonsgegevens die je via ${site.url} met mij deelt. Kort samengevat: ik verzamel alleen wat jij zelf invult in het offerteformulier, ik gebruik dat uitsluitend om contact met je op te nemen, en ik verkoop of deel niets met derden voor marketing.`,
  sections: [
    {
      title: 'Welke gegevens verwerk ik?',
      body: [
        'Vul je het offerteformulier in, dan verwerk ik: je naam, bedrijfsnaam (optioneel), telefoonnummer (optioneel), e-mailadres, je eventuele opmerking en de samenstelling die je in de configurator koos (pakket, extra’s en richtprijs).',
        'Deze website gebruikt géén tracking-cookies en géén analytics. Er is daarom ook geen cookiebanner.',
      ],
    },
    {
      title: 'Waarvoor gebruik ik je gegevens?',
      body: [
        'Uitsluitend om je aanvraag te beantwoorden: ik stuur je een offerte en eventueel een demo-voorstel, en neem daarover contact met je op via e-mail, telefoon of WhatsApp — afhankelijk van wat jij invulde.',
        'De grondslag hiervoor is “uitvoering van een overeenkomst” (art. 6 lid 1 sub b AVG): jij vraagt een offerte aan, ik lever die.',
      ],
    },
    {
      title: 'Hoe lang bewaar ik je gegevens?',
      body: [
        'Word je klant, dan bewaar ik je gegevens zolang we samenwerken en daarna zolang de wet dat vereist (bijvoorbeeld de fiscale bewaarplicht van 7 jaar voor facturen).',
        'Word je geen klant, dan verwijder ik je aanvraag uiterlijk 12 maanden na het laatste contact.',
      ],
    },
    {
      title: 'Wie hebben er toegang tot je gegevens?',
      body: [
        'Alleen ik. Voor de techniek werk ik met twee verwerkers: Vercel (hosting van deze website, met servers in de EU waar mogelijk) en Resend (het versturen van het offerteformulier naar mijn mailbox). Met beide partijen gelden verwerkersovereenkomsten volgens de AVG.',
        'De sectie “Interactieve kaart” bevat een ingesloten Google Maps-kaart. Die laadt pas zodra je hem in beeld scrolt; vanaf dat moment kan Google cookies plaatsen volgens het privacybeleid van Google. Wil je dat niet, scroll die demo dan voorbij zonder de kaart te laden.',
        'Ik verkoop nooit gegevens en deel niets met derden voor marketingdoeleinden.',
      ],
    },
    {
      title: 'Jouw rechten',
      body: [
        'Je mag je gegevens altijd inzien, laten corrigeren of laten verwijderen. Ook kun je bezwaar maken tegen verwerking of vragen om overdracht van je gegevens (dataportabiliteit).',
        `Mail daarvoor naar ${site.email} — ik reageer binnen enkele werkdagen, uiterlijk binnen de wettelijke termijn van één maand.`,
        'Ben je het niet eens met hoe ik met je gegevens omga? Dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).',
      ],
    },
    {
      title: 'Beveiliging',
      body: [
        'Deze site draait volledig via een versleutelde verbinding (HTTPS). Formuliergegevens worden versleuteld verstuurd en alleen opgeslagen in mijn beveiligde mailbox.',
      ],
    },
    {
      title: 'Contact',
      body: [
        `${site.legalName} · KVK ${footer.kvk} · ${site.email}`,
        'Vragen over deze privacyverklaring? Mail of app me gerust.',
      ],
    },
  ],
  backLink: '← Terug naar de site',
} as const;

/* ----------------------- Algemene voorwaarden ----------------------- */
/* Door Scott bevestigd (aug 2026): 50/50-betaalritme, twee revisierondes,
   prijzen excl. btw, alleen zakelijke klanten. */

const voorwaarden = {
  title: 'Algemene voorwaarden',
  updated: 'Versie augustus 2026',
  metaDescription: `Algemene voorwaarden van ${site.legalName}, in gewone taal: hoe een opdracht start, wat je krijgt, hoe betalen werkt en hoe je maandelijks opzegt.`,
  intro: `Geen kleine lettertjes: dit zijn de afspraken waaronder ik werk, in gewone taal. Ze gelden voor alles wat je bij ${site.legalName} (KVK 89874994) afneemt. Staat er iets tussen dat niet duidelijk is? Mail of app me gewoon — dan leggen we het vast voordat we beginnen.`,
  sections: [
    {
      title: 'Zo start een opdracht',
      body: [
        'Mijn aanbod is voor zakelijke klanten: ondernemers, praktijken en verenigingen. Je stelt op deze site je website samen, of we overleggen via mail, telefoon of WhatsApp. Daarna krijg je één duidelijke offerte met een vaste prijs: een eenmalig bedrag en — afhankelijk van je keuzes — een maandbedrag. Alle prijzen zijn exclusief btw.',
        'De offerte is 30 dagen geldig. Zeg je schriftelijk ja (een mailtje of appje telt ook), dan is dat het startschot en gelden deze voorwaarden.',
      ],
    },
    {
      title: 'Wat ik lever, en wanneer',
      body: [
        'Je krijgt precies wat er in de offerte staat: het gekozen basispakket plus de gekozen opties. De meeste sites staan binnen 5 werkdagen live, gerekend vanaf het moment dat al jouw materiaal (teksten, foto’s, toegangen) binnen is. Complexere modules, zoals een portaal of online bestellen, kunnen een paar dagen extra vragen.',
        'Vóór de livegang kijken we samen naar het resultaat. Twee rondes met aanpassingen horen bij de prijs. Daarna vallen wijzigingen — groot en klein — onder het onderhoud of onder meerwerk, met eerst een vaste prijs.',
      ],
    },
    {
      title: 'Betalen',
      body: [
        'Het eenmalige bedrag betaal je in twee helften. De eerste factuur stuur ik bij akkoord en de bouw start meteen; de site gaat live zodra die eerste helft binnen is. De tweede factuur volgt na de livegang. Voor beide facturen geldt een betaaltermijn van 14 dagen.',
        'Het maandbedrag loopt vanaf de livegang en betaal je per maand, op factuur of via automatische incasso — wat we afspreken.',
        'Betaal je te laat, dan stuur ik eerst een gewone herinnering. Blijft betalen uit, dan gelden de wettelijke rente en incassokosten, en mag ik doorlopende diensten pauzeren tot de betaling binnen is — dat kondig ik altijd eerst aan.',
        'Lever je na akkoord langer dan drie maanden geen materiaal aan, ondanks een herinnering, dan mag ik het project afronden op basis van wat er ligt; de eerste helft blijft dan verschuldigd.',
      ],
    },
    {
      title: 'Maandelijkse diensten en opzeggen',
      body: [
        'Het maandbedrag dekt hosting, updates en beveiliging, plus de modules met doorlopende kosten (zoals de agenda of de chatbot). Af en toe een kleine wijziging — een prijs, een foto, je openingstijden — hoort daar gewoon bij.',
        'Opzeggen kan elke maand, per mail of app, en gaat in aan het einde van de lopende maand; er is geen minimumlooptijd. Je site en je domein zijn en blijven van jou: ik lever alle bestanden netjes aan en verhuis je domein kosteloos. Alleen de doorlopende diensten stoppen dan.',
        'Moet ik het maandbedrag of deze doorlopende diensten ooit aanpassen — bijvoorbeeld omdat kosten van hosting- of AI-partijen veranderen — dan hoor je dat minimaal een maand van tevoren. Ben je het er niet mee eens, dan zeg je gewoon op.',
      ],
    },
    {
      title: 'Jouw materiaal',
      body: [
        'Jij levert de teksten, foto’s en andere content aan, of we spreken af dat ik daarbij help. Jij staat ervoor in dat dat materiaal gebruikt mag worden — dus geen foto’s of teksten van iemand anders zonder toestemming.',
        'Met persoonsgegevens ga ik om zoals in de privacyverklaring staat. Draaien er op jouw site modules die gegevens van jóuw klanten verwerken (zoals de agenda, intake of het portaal), dan verwerk ik die alleen in jouw opdracht en leggen we dat vast in een korte verwerkersovereenkomst. Zeg je op, dan krijg je een export van die gegevens en verwijder ik ze daarna binnen 30 dagen.',
      ],
    },
    {
      title: 'Van wie is de site?',
      body: [
        'Het domein registreer ik op jouw naam — dat is dus vanaf dag één van jou. De site zelf (het ontwerp, de teksten, de code en de opbouw) is helemaal van jou zodra het eenmalige bedrag volledig is betaald; op verzoek bevestig ik die overdracht met een ondertekend document. Het maandbedrag staat hier los van. Open-source onderdelen blijven onder hun eigen licentie — dat is normaal en kost je niets.',
        'Ik mag de site in mijn portfolio tonen en er in mijn eigen communicatie naar verwijzen, tenzij jij aangeeft dat liever niet te willen.',
      ],
    },
    {
      title: 'AI-modules',
      body: [
        'De chatbot en de AI-telefonist geven automatische antwoorden. We stellen ze samen zorgvuldig in, maar zulke systemen kunnen een vraag verkeerd begrijpen of een antwoord geven dat niet klopt. Controleer belangrijke informatie (prijzen, openingstijden, afspraken) in de eerste weken dus extra, en geef fouten meteen door — dan stel ik ze bij.',
        'Wat deze modules namens jouw zaak communiceren, blijft jouw verantwoordelijkheid. Laat ze geen medisch, juridisch of financieel advies geven.',
      ],
    },
    {
      title: 'Als er iets misgaat',
      body: [
        'Ik werk zorgvuldig en gebruik betrouwbare partijen voor hosting en e-mail, maar 100% bereikbaarheid kan niemand beloven. Is er een storing, dan ga ik er direct mee aan de slag.',
        'Gaat er ondanks alles iets mis waardoor je schade hebt, dan is mijn aansprakelijkheid beperkt tot het bedrag dat je mij in de drie maanden ervoor betaalde — of het eenmalige bedrag van jouw offerte, als dat hoger is. Indirecte schade, zoals gemiste omzet, valt daarbuiten. Niets hiervan beperkt aansprakelijkheid die volgens de wet niet beperkt mag worden.',
      ],
    },
    {
      title: 'Tot slot',
      body: [
        'Op onze afspraken is Nederlands recht van toepassing. Wijzig ik deze voorwaarden, dan blijft voor een lopende bouwopdracht de versie gelden waarmee je akkoord ging; voor doorlopende diensten geldt de aankondigingsregel hierboven.',
        `Vragen? Mail naar ${site.email} of stuur een appje.`,
      ],
    },
  ],
  backLink: '← Terug naar de site',
} as const;

const meta = {
  title: 'Scott Prins — Websites die werken. Gebouwd in dagen, niet maanden.',
  description:
    'Snelle, moderne websites en web-apps voor kleine ondernemers. Kies je basis, kies je extra’s en zie elke optie live op deze site. Vaste prijzen, live binnen 5 werkdagen.',
} as const;

/* ------ Teksten in de mini-site die zichzelf bouwt (HeroScene) ------ */
const heroScene = {
  menuKicker: 'De menukaart',
  headline: 'Jouw website.',
  sub: 'Kies je basis, kies je extra’s.',
  cta: 'Stel je website samen',
  chatName: 'Salon Demo',
  chatBot: 'Hoi! Vraag me gerust naar openingstijden of prijzen 💇',
  chatUser: 'Kan ik vandaag nog langskomen?',
  addToSite: '+ In mijn website',
  statNumber: '5',
  statUnit: 'dagen',
  statLabel: 'gemiddelde levertijd',
  cartUnit: 'optie',
} as const;

/* ------- Tekst rond de offerte-samenvatting (quote.ts) ------- */
const quote = {
  intro: 'Mijn samenstelling via scottprins.nl:',
  base: 'Basispakket',
  includedWith: 'Inbegrepen bij',
  extras: 'Extra’s',
  none: 'geen',
  care: 'Onderhoud',
  included: 'inbegrepen',
  totalUpfront: 'Totaal eenmalig',
  totalMonthly: 'Totaal per maand',
  /* Wat de bezoeker zelf verstuurt via WhatsApp of mailto. */
  greeting: 'Hoi Scott! ',
  subject: 'Offerte-aanvraag via scottprins.nl',
  name: 'Naam',
  company: 'Bedrijf',
  phone: 'Telefoon',
  note: 'Opmerking',
} as const;

/* --------- Namen en omschrijvingen bij pricing.ts ---------- */
/* De getallen staan in pricing.ts; alleen de tekst is taalgebonden. */
const pricing = {
  base: {
    visitekaartje: {
      name: 'Visitekaartje',
      description: 'Eén sterke pagina die je zaak verkoopt.',
      includes: ['One-pager, perfect op mobiel', 'Contactformulier + WhatsApp-knop', 'Basis-SEO', 'Hosting, domein & SSL geregeld'],
    },
    compleet: {
      name: 'Compleet',
      description: 'Meerdere pagina’s, klaar om te groeien.',
      includes: ['Tot 5 pagina’s', 'Alles uit Visitekaartje', 'Koppeling met je Google Bedrijfsprofiel', 'Statistieken'],
    },
    interactief: {
      name: 'Interactief',
      description: 'Voor zaken die online wérken.',
      includes: ['Alles uit Compleet', 'Prioriteit bij wijzigingen'],
    },
  },
  addons: {
    agenda: {
      name: 'Online agenda',
      shortPitch: 'Klanten boeken zelf een afspraak.',
    },
    chatbot: {
      name: 'AI-chatbot',
      shortPitch: 'Beantwoordt vragen, dag en nacht.',
    },
    'ai-telefonist': {
      name: 'AI-telefonist',
      shortPitch: 'Neemt op als jij je handen vol hebt.',
    },
    bestellen: {
      name: 'Eigen online bestellen',
      shortPitch: 'Zonder platform-commissie.',
    },
    kaart: {
      name: 'Interactieve kaart',
      shortPitch: 'Al je locaties, mooi op de kaart.',
    },
    scrollvideo: {
      name: 'Scroll-video / animaties',
      shortPitch: 'Die opening van deze site.',
    },
    intake: {
      name: 'Digitale intake',
      shortPitch: 'Slim formulier in stappen.',
    },
    calculator: {
      name: 'Prijscalculator',
      shortPitch: 'Klanten rekenen zelf hun prijs uit.',
    },
    beforeafter: {
      name: 'Before/after-slider',
      shortPitch: 'Laat het verschil zien.',
    },
    reviews: {
      name: 'Reviews-wall',
      shortPitch: 'Je Google-reviews, live op je site.',
    },
    meertalig: {
      name: 'Meertalig',
      shortPitch: 'NL/EN met één klik.',
    },
    portaal: {
      name: 'Klantenportaal',
      shortPitch: 'Documenten en facturen achter login.',
    },
    cadeaubonnen: {
      name: 'Cadeaubonnen & stempelkaart',
      shortPitch: 'Verkoop bonnen én laat klanten terugkomen.',
    },
    sms: {
      name: 'SMS-herinneringen',
      shortPitch: 'Minder no-shows.',
    },
    nieuwsbrief: {
      name: 'Nieuwsbrief',
      shortPitch: 'Blijf in beeld bij je klanten.',
    },
  },
  care: {
    basis: {
      name: 'Basis',
      description: 'Hosting, updates en af en toe een kleine wijziging.',
    },
    plus: {
      name: 'Plus',
      description: 'Elke maand wijzigingen doorvoeren + rapportage.',
    },
    premium: {
      name: 'Premium',
      description: 'Onbeperkt kleine wijzigingen, altijd voorrang.',
    },
  },
  presets: {
    salon: {
      label: 'Kapsalon of schoonheidssalon',
    },
    horeca: {
      label: 'Restaurant, café of bezorging',
    },
    klus: {
      label: 'Klus-, bouw- of hoveniersbedrijf',
    },
    praktijk: {
      label: 'Praktijk of behandelaar',
    },
    winkel: {
      label: 'Winkel of showroom',
    },
  },
} as const;

export const nl = {
  meta,
  pricing,
  quote,
  hero,
  heroScene,
  nav,
  howItWorks,
  menuIntro,
  demoAgenda,
  demoChatbot,
  demoKaart,
  demoCalculator,
  demoBestellen,
  demoReviews,
  demoBeforeAfter,
  demoIntake,
  demoPortaal,
  demoMeertalig,
  demoScrollvideo,
  demoCadeau,
  configurator,
  showcase,
  proof,
  about,
  faq,
  footer,
  privacy,
  voorwaarden,
} as const;
