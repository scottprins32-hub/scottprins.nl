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
  eyebrow: 'Website laten maken · vaste prijs vanaf € 495 · Badhoevedorp',
  /** De H1 — staat vanaf de eerste seconde in beeld (ook de LCP van de pagina). */
  headline: 'Websites die werken. Gebouwd in dagen, niet maanden.',
  /** Vaste ondertitel onder de H1. */
  sub: 'Kies je basis, kies je extra’s — en zie precies wat je krijgt terwijl je site zichzelf bouwt. Vaste prijs, en binnen 5 werkdagen online zodra jouw teksten en foto’s binnen zijn.',
  actions: {
    primary: { label: 'Stel je website samen', href: '#configurator' },
    secondary: { label: 'Bekijk de menukaart', href: '#menu' },
  },
  /**
   * De vijf bouwdagen. `label` verschijnt in de voortgangsbalk links,
   * `text` is de regel die tijdens het scrollen meeloopt met de bouw.
   */
  days: [
    { label: 'Schets', text: 'Dag 1 — ik bel je een half uur: wat verkoop je, aan wie, en wat moet die site opleveren.' },
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
  cta: 'Gratis proefpagina',
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
      title: 'Binnen 48 uur een prijs én een proefpagina',
      text: 'Je krijgt een vaste prijs én een gratis proefpagina: één echte pagina van jouw site, met jouw naam, kleuren en teksten. Bevalt het, dan bouw ik door. Zo niet, dan kost het je niets.',
    },
  ],
} as const;

/* ------------------------- De menukaart ---------------------------- */

const menuIntro = {
  indexLabel: 'Spring naar een optie',
  index: [
    { id: 'menu-booking', label: 'Online agenda' },
    { id: 'menu-chatbot', label: 'AI-chatbot' },
    { id: 'menu-map', label: 'Kaart' },
    { id: 'menu-calculator', label: 'Prijscalculator' },
    { id: 'menu-ordering', label: 'Online bestellen' },
    { id: 'menu-reviews', label: 'Reviews' },
    { id: 'menu-beforeafter', label: 'Voor/na' },
    { id: 'menu-intake', label: 'Intake' },
    { id: 'menu-portal', label: 'Klantenportaal' },
    { id: 'menu-multilingual', label: 'Meertalig' },
    { id: 'menu-scrollvideo', label: 'Scroll-video' },
    { id: 'menu-giftcards', label: 'Cadeaubonnen' },
    { id: 'menu-telefonist', label: 'AI-telefonist' },
  ],
  kicker: 'De menukaart',
  title: 'Niet lezen wat het doet. Gewoon proberen.',
  lead: 'Elke optie hieronder is een échte, werkende demo. Bevalt het? Tik op “In mijn website” en hij staat in je offerte.',
} as const;

/* Demo 1 — Online agenda (fictieve massagepraktijk) */
const demoAgenda = {
  kicker: 'Optie 1',
  title: 'Online afspraken maken op je website',
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
  title: 'AI-chatbot die klantvragen 24/7 beantwoordt',
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
  title: 'Al je vestigingen op één kaart',
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
  privacyNote: 'De kaart laadt pas als jíj erop klikt — daarna gaat er wél een verzoek naar Google. Zo hoeft er op je site geen cookiebanner.',
  loadButton: 'Kaart laden (laadt Google Maps en zet cookies van Google)',
} as const;

/* Demo 4 — Prijscalculator (fictief klusbedrijf) */
const demoCalculator = {
  kicker: 'Optie 4',
  title: 'Prijscalculator voor offerteaanvragen',
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
  title: 'Online bestellen zonder platform-commissie',
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
  ariaLabel: 'Verzonnen voorbeeld-reviews voor deze demo',
  title: 'Je Google-reviews op je eigen site',
  lead: 'Je échte Google-reviews, automatisch vers en stijlvol in beeld. Veeg erdoorheen — op desktop scrolt hij vanzelf.',
  demoNote: 'Verzonnen reviews van een niet-bestaande salon. Op jouw site staan hier je échte Google-reviews.',
  reviews: [
    { name: 'Sanne V.', stars: 5, text: 'Voor het eerst een kleuring waar ik echt blij mee ben. En ik kon ’s avonds om elf uur nog online een plekje pakken.' },
    { name: 'Mehmet K.', stars: 5, text: 'Op tijd geholpen, netjes geknipt, pinnen en klaar. Niets op aan te merken.' },
    { name: 'Lisa de B.', stars: 5, text: 'Mijn zoon van 6 zat voor het eerst stil in de stoel. Petje af.' },
    { name: 'Peter J.', stars: 4, text: 'Prima knipbeurt en een eerlijke prijs. Alleen was het even zoeken naar een parkeerplek.' },
    { name: 'Fatima A.', stars: 5, text: 'Zaterdagavond een vraag geappt, meteen antwoord. Maandag geknipt.' },
    { name: 'Joris T.', stars: 5, text: 'Al drie jaar klant. Ze weten precies wat ik bedoel met “niet te kort”.' },
    { name: 'Anouk R.', stars: 5, text: 'De cadeaubon voor mijn moeder stond binnen een minuut in haar mail. Top geregeld.' },
    { name: 'Bas W.', stars: 5, text: 'Een sms-herinnering een dag van tevoren — daardoor vergeet ik mijn afspraak nooit meer.' },
  ],
} as const;

/* Demo 7 — Before/after-slider (fictieve bakkerij) */
const demoBeforeAfter = {
  kicker: 'Optie 7',
  title: 'Voor en na naast elkaar, met één schuif',
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
  title: 'Digitaal intakeformulier voor nieuwe klanten',
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
  title: 'Klantenportaal met eigen inlog',
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
  title: 'Scroll-animatie die je verhaal vertelt',
  lead: 'Die opening die je net zag, de site die zichzelf opbouwt terwijl je scrolt? Dat is deze optie. Hieronder speelt hij nog een keer af.',
  replay: 'Speel opnieuw af',
} as const;

/* Demo 12 — Cadeaubonnen & stempelkaart */
const demoCadeau = {
  kicker: 'Optie 12',
  title: 'Cadeaubonnen verkopen vanaf je site',
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
  presetLead: 'Eén tik en er staat een compleet voorstel klaar dat past bij jouw vak — inclusief prijs. Daarna pas je alles gewoon aan.',
  /* Onder de snelstart-chips: naar de branchepagina van dat vak. */
  brancheIntro: 'Uitgebreid, per vak:',
  baseTitle: 'Kies je basis',
  addonsTitle: 'Kies je extra’s',
  addonsNoDemoNote: 'Geen demo op deze pagina — vraag ernaar, dan laat ik ’m live zien.',
  careTitle: 'Onderhoud & support',
  quoteTitle: 'Jouw samenstelling',
  upfrontLabel: 'Eenmalig',
  monthlyLabel: 'Per maand',
  disclaimer: 'Dit is de prijs, excl. btw. Je krijgt hem één op één terug in je offerte — hij gaat alleen omhoog als jíj er iets bij kiest.',
  cartOne: 'optie',
  cartMany: 'opties',
  popularBadge: 'Populair',
  /* 13 — staan alle drie al in de voorwaarden; hier alleen zichtbaar gemaakt. */
  guarantee: 'Oplevergarantie: 5 werkdagen nadat jouw teksten en foto’s binnen zijn, staat je site live. Later? Dan gaat er € 50 per werkdag van de eindfactuur af.',
  revisionNote: 'Twee rondes met aanpassingen zitten bij de prijs in.',
  assurances: [
    'Domein op jouw naam — vanaf dag één',
    'Maandelijks opzegbaar — geen minimumlooptijd',
    'Stop je? Alle bestanden mee en gratis domeinverhuizing',
  ],
  monthlyTitle: 'Wat betaal ik dat maandbedrag precies voor?',
  monthlyItems: [
    'Hosting — de computer waar je site 24/7 op draait, inclusief het slotje in de adresbalk.',
    'Updates en beveiliging — zodat je site niet stilletjes veroudert of gehackt wordt.',
    'Kleine wijzigingen — een nieuwe prijs, een andere foto, gewijzigde openingstijden: gewoon een appje.',
    'De opties met doorlopende kosten die je koos (agenda, chatbot, reviews).',
  ],
  includedWorth: 'Samen t.w.v.',
  cartTotal: 'totaal',
  exVat: 'excl. btw',
  vatNote: 'Alle prijzen zijn excl. btw. Als btw-plichtige ondernemer krijg je die terug van de Belastingdienst. Val je onder de KOR of ben je btw-vrijgesteld (zorg), dan is het bedrag inclusief btw je eindprijs.',
  presetFrom: 'vanaf',
  stripTitle: 'Drie startpunten',
  stripNote: 'Elke optie hieronder komt daar bovenop — je ziet steeds precies wat.',
  stripCta: 'Zie wat er in elk pakket zit',
  includedBadge: 'Inbegrepen',
  freeLabel: 'gratis',
  seeDemo: 'Bekijk de demo ↑',
  addButton: '+ In mijn website',
  addedButton: '✓ In je website',
  includedButton: '✓ Gratis bij je pakket',
  form: {
  title: 'Gratis: een proefpagina van jouw eigen site',
    lead: 'Binnen 48 uur krijg je een vaste prijs én een echte proefpagina voor jouw zaak. Geen verplichtingen, geen kosten — er gebeurt pas iets als jij ja zegt.',
    name: 'Naam',
    company: 'Bedrijf',
    phone: 'Telefoon / WhatsApp',
    email: 'E-mail',
    message: 'Opmerking (optioneel)',
    submit: 'Ja, stuur mijn gratis proefpagina',
    callTitle: 'Wanneer bel ik je even?',
    callLead: 'Eén telefoontje van tien minuten scheelt drie mailtjes heen en weer. Kies wat jou uitkomt — of bel zelf.',
    callOptions: ['Vandaag na 17:00', 'Morgenochtend', 'Morgenmiddag'],
    callSelf: 'Ik bel liever zelf',
    callDone: 'Genoteerd. Ik bel je dan.',
    selfCopy: 'Nog niet klaar? Mail mijn samenstelling naar mezelf',
    selfCopyError: 'Vul je e-mailadres in, dan stuur ik je samenstelling door.',
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
  title: 'Drie complete sites. Klik ze kapot.',
  lead: 'Hierboven staat elke optie los. Zo ziet het eruit als alles samenkomt in één site — inclusief wat zo\u2019n site dan kost. De bedrijven heb ik verzonnen; de sites werken echt.',
  contentsLabel: 'Wat zit erin',
  totalLabel: 'Deze site',
  totalNote: 'Vaste prijs, excl. btw. Zo’n complete site staat in 7 werkdagen live, gerekend vanaf jouw materiaal.',
  presetCta: 'Zet deze samenstelling klaar',
  openCta: 'Open de hele site',
  liveBadge: 'Bekijk live',
  demoEnvNote: 'demo-omgeving — draait op een tijdelijk adres',
  demoOwnNote: 'demo-omgeving — verzonnen zaak, draait op dit domein',
  newTab: 'opent in een nieuw tabblad',
  sites: [
    {
      name: 'Kapsalon Mera',
      sector: 'Kapsalon · Haarlem',
      domain: 'kapsalonmera.nl',
      /* Draait op scottprins.nl zelf en niet bij een externe aanbieder:
         geen derde partij, geen tijdelijk adres, en hij blijft staan. */
      href: '/demo/kapsalon/',
      image: '/voorbeeld-salon',
      summary: 'Een complete salonsite: klanten boeken zelf, herinnering per sms, en een cadeaubon die zichzelf verkoopt.',
      base: 'compleet',
      /** Gelijk aan preset 'salon' in pricing.ts. */
      addons: ['agenda', 'reviews', 'sms', 'cadeaubonnen'] as const,
      does: {
        agenda: 'behandeling, stylist en tijd in drie tikken',
        reviews: 'de beoordelingen staan op de pagina zelf',
        sms: 'herinnering een dag van tevoren, scheelt no-shows',
        cadeaubonnen: 'bedrag kiezen, naam erop, klaar',
      },
      extra: '+ een prijslijst die de salon zelf bijwerkt.',
    },
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
  title: 'Dit draait al. Klik er zelf doorheen.',
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
    { value: 25, suffix: '+', label: 'sites & web-apps gebouwd — eigen projecten inbegrepen' },
    { value: 5, suffix: ' werkdagen', label: 'van jouw materiaal tot live' },
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
      q: 'Ik heb geen goede teksten of foto’s. Kan het dan wel?',
      a: 'Ja, en dat is eerder regel dan uitzondering. De teksten schrijf ik op basis van één telefoongesprek van een half uur: jij vertelt over je zaak, ik maak er de pagina van, jij leest hem na. Foto’s met een moderne telefoon zijn vaak goed genoeg; anders zoek ik nette rechtenvrije beelden of raad ik een fotograaf bij jou in de buurt aan.',
    },
    {
      q: 'Ik heb al een site en een domein. Wat gebeurt daarmee?',
      a: 'Je houdt je eigen domeinnaam — die verhuizen we, dus je gevelbord en je visitekaartjes blijven kloppen. Je e-mailadressen zetten we over vóórdat de nieuwe site live gaat, zodat je geen mail mist. En je plek in Google gaat mee: elk oud adres wijst netjes door naar de nieuwe pagina.',
    },
    {
      q: 'Wat als de site niet af is binnen 5 werkdagen?',
      a: 'Dan kost het je geld — mij. De klok start zodra jouw teksten en foto’s binnen zijn. Sta je daarna niet binnen 5 werkdagen live, dan gaat er € 50 per werkdag van de eindfactuur af. Complexere modules zoals een klantenportaal of online bestellen spreken we vooraf op 7 werkdagen af.',
    },
    {
      q: 'Wat gebeurt er als jij ermee stopt?',
      a: 'Je site blijft van jou, en dat is niet alleen een belofte: het domein staat op jouw naam en de site is technisch van jou zodra het eenmalige bedrag betaald is. Op verzoek krijg je alle bestanden en toegangen, zodat elke andere webbouwer er verder mee kan. Je zit nergens aan vast — opzeggen kan elke maand.',
    },
    {
      q: 'Waarom zie ik geen klanten of reviews op deze site?',
      a: 'Omdat ik net begonnen ben als webdesigner en ik geen quotes ga verzinnen. Wat ik wel heb: deze site, met twaalf opties die je zelf kunt uitproberen, en modernpitching.nl — de site van mijn eigen bedrijf, die ik van voor tot achter gebouwd heb. Klik er gerust doorheen; dat zegt meer dan een logo-muur.',
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
  cta: 'Vertel me over je zaak. Dan weet je binnen 48 uur wat het kost.',
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


/* ----------------------- Algemene voorwaarden ----------------------- */
/* Door Scott bevestigd (aug 2026): 50/50-betaalritme, twee revisierondes,
   prijzen excl. btw, alleen zakelijke klanten. */


/* ------------------ Demo 13 — AI-telefonist ------------------------ */
/* Geen echt telefoonnummer: dit is een nagespeeld gesprek dat in echte tijd
   afloopt. Wél eerlijk gelabeld, want elke andere demo op deze pagina doet
   écht wat hij belooft. */
const demoTelefonist = {
  kicker: 'Optie 13',
  title: 'AI-telefonist die opneemt als jij bezig bent',
  lead: 'De duurste optie op deze kaart, en tot nu toe de enige zonder demo. Druk op bellen: dit is een nagespeeld gesprek, precies zoals het bij Salon Demo zou lopen.',
  callButton: 'Bel Salon Demo',
  callAgain: 'Nog een keer',
  callingLabel: 'Bellen…',
  connected: 'Verbonden met de AI-telefonist',
  ended: 'Gesprek beëindigd · 42 seconden',
  demoNote: 'Nagespeeld gesprek. Op jouw nummer neemt de telefonist echt op, in jouw stem-instellingen en met jouw agenda.',
  resultTitle: 'Wat er ondertussen gebeurde',
  results: [
    'Afspraak gezet: donderdag 14:30, knippen + föhnen',
    'Bevestiging per sms naar de klant',
    'In jouw agenda gezet, met naam en telefoonnummer',
  ],
  /* wie: 'ai' of 'beller'; ms = wachttijd vóór deze regel */
  script: [
    { wie: 'ai', ms: 900, tekst: 'Goedemiddag, u spreekt met de assistent van Salon Demo. Waarmee kan ik u helpen?' },
    { wie: 'beller', ms: 2400, tekst: 'Ja hoi, ik wilde een afspraak maken voor knippen.' },
    { wie: 'ai', ms: 1800, tekst: 'Dat kan. Heeft u een voorkeur voor een dag of dagdeel?' },
    { wie: 'beller', ms: 2200, tekst: 'Donderdagmiddag zou fijn zijn.' },
    { wie: 'ai', ms: 2000, tekst: 'Donderdag kan ik 14:30 of 16:00 aanbieden. Wat past het beste?' },
    { wie: 'beller', ms: 1900, tekst: 'Half drie graag.' },
    { wie: 'ai', ms: 1700, tekst: 'Genoteerd. Mag ik uw naam en mobiele nummer voor de bevestiging?' },
    { wie: 'beller', ms: 2600, tekst: 'Anne de Wit, 06 12 34 56 78.' },
    { wie: 'ai', ms: 2400, tekst: 'Dank u wel. Donderdag 14:30, knippen en föhnen, op naam van Anne de Wit. U krijgt zo een sms met de bevestiging. Fijne dag!' },
  ],
} as const;

/* ------------------ Branchepagina's (losse landingspagina's) ------- */
/* Alleen de terugkerende labels; de tekst per vak staat in branches.ts. */
const branche = {
  navDemos: 'Demo’s',
  navPrice: 'Prijs',
  navMenu: 'Alle opties',
  heroDemoCta: 'Eerst de demo’s bekijken',
  quoteTitle: 'Deze samenstelling',
  breakdown: 'Zie de opbouw',
  adjustNote: 'Hieronder pas je hem aan; de prijs rekent live mee.',
} as const;

const meta = {
  title: 'Website laten maken vanaf € 495 — Scott Prins Webdesign',
  description:
    'Website laten maken met een vaste prijs: vanaf € 495 excl. btw, live binnen 5 werkdagen. Webdesigner uit Badhoevedorp, werkt in heel Nederland. Stel je site zelf samen.',
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
      includes: ['Eén pagina waarop alles staat, gemaakt voor de telefoon', 'Contactformulier + WhatsApp-knop', 'Vindbaar in Google op je vak en je plaats', 'Domein, hosting en het slotje in de adresbalk: geregeld'],
    },
    compleet: {
      name: 'Compleet',
      description: 'Meerdere pagina’s, klaar om te groeien.',
      includes: ['Tot 5 pagina’s', 'Alles uit Visitekaartje', 'Gekoppeld aan je Google-bedrijfsprofiel: openingstijden, route en reviews kloppen overal', 'Bezoekcijfers, zonder cookiebanner'],
    },
    interactief: {
      name: 'Interactief',
      description: 'Voor zaken waar klanten zelf boeken, bestellen of hun dossier inzien.',
      includes: ['Alles uit Compleet', 'Online agenda zit er gratis bij', 'Jouw wijzigingen gaan voor'],
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
  demoTelefonist,
  branche,
  configurator,
  showcase,
  proof,
  about,
  faq,
  footer,
} as const;
