/**
 * ALLE zichtbare tekst van de site staat in dit bestand.
 * Tekst aanpassen? Alleen hier. Prijzen staan in pricing.ts.
 *
 * Placeholders die je vóór livegang moet vervangen (grep op '{'):
 *   {BTW}  — in `footer`
 *   proof.cases — echte casestudies
 */

export const site = {
  name: 'Scott Prins',
  legalName: 'Scott Prins Webdesign',
  url: 'https://scottprins.nl',
  email: 'scottprins32@gmail.com',
  /** Internationaal formaat zonder '+', voor wa.me-links. */
  whatsapp: '31619900444',
  whatsappDisplay: '06 19 90 04 44',
  meta: {
    title: 'Scott Prins — Websites die werken. Gebouwd in dagen, niet maanden.',
    description:
      'Snelle, moderne websites en web-apps voor kleine ondernemers. Kies je basis, kies je extra’s en zie elke optie live op deze site. Vaste prijzen, live binnen 5 dagen.',
  },
} as const;

/* ------------------------------ Hero ------------------------------ */

export const hero = {
  eyebrow: 'Webdesign uit Nederland · vaste prijzen',
  /** De H1 — staat vanaf de eerste seconde in beeld (ook de LCP van de pagina). */
  headline: 'Websites die werken. Gebouwd in dagen, niet maanden.',
  /** Vaste ondertitel onder de H1. */
  sub: 'Kies je basis, kies je extra’s — en zie precies wat je krijgt terwijl je site zichzelf bouwt. Live binnen 5 dagen, altijd een vaste prijs.',
  actions: {
    primary: { label: 'Stel je website samen', href: '#configurator' },
    secondary: { label: 'Bekijk de menukaart', href: '#menukaart' },
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

export const nav = {
  links: [
    { label: 'Menukaart', href: '#menukaart' },
    { label: 'Voorbeelden', href: '#voorbeelden' },
    { label: 'Prijzen', href: '#configurator' },
    { label: 'Resultaat', href: '#resultaat' },
    { label: 'Over Scott', href: '#over-scott' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: 'Offerte',
} as const;

/* --------------------------- Zo werkt het -------------------------- */

export const howItWorks = {
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
      title: 'Live binnen 5 dagen',
      text: 'Binnen 24 uur een offerte + gratis demo-voorstel. Akkoord? Dan bouw ik direct.',
    },
  ],
} as const;

/* ------------------------- De menukaart ---------------------------- */

export const menuIntro = {
  kicker: 'De menukaart',
  title: 'Niet lezen wat het doet. Gewoon proberen.',
  lead: 'Elke optie hieronder is een échte, werkende demo. Bevalt het? Tik op “In mijn website” en hij staat in je offerte.',
} as const;

/* Demo 1 — Online agenda (fictieve massagepraktijk) */
export const demoAgenda = {
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
  confirmText: 'Zo makkelijk is het voor jouw klanten. Bevestiging en herinnering gaan automatisch.',
  restart: 'Nog een keer proberen',
  stepLabels: ['Behandeling', 'Behandelaar', 'Tijdstip'],
} as const;

/* Demo 2 — AI-chatbot (fictieve kapsalon) */
export const demoChatbot = {
  kicker: 'Optie 2',
  title: 'AI-chatbot',
  lead: 'Getraind op jouw zaak: openingstijden, prijzen, afspraken. Stel ’m een vraag.',
  botName: 'Salon Demo',
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
export const demoKaart = {
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
export const demoCalculator = {
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
export const demoBestellen = {
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
  banks: ['Demobank', 'ING', 'Rabobank', 'ABN AMRO'],
  paidTitle: 'Bestelling binnen! 🍕',
  paidText: 'Direct in jouw keuken, zonder commissie eroverheen.',
  /** Gemiddelde platform-commissie waarmee de besparingsteller rekent. */
  commissionRate: 0.13,
  savingsLine: 'Bij 200 bestellingen/maand bespaar je ±€ 7.000/jaar aan bezorgplatform-commissie.',
  savedLabel: 'bespaard t.o.v. bezorgplatform',
} as const;

/* Demo 6 — Reviews-wall */
export const demoReviews = {
  kicker: 'Optie 6',
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
export const demoBeforeAfter = {
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
  },
} as const;

/* Demo 8 — Digitale intake */
export const demoIntake = {
  kicker: 'Optie 8',
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
export const demoPortaal = {
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
export const demoMeertalig = {
  kicker: 'Optie 10',
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
export const demoScrollvideo = {
  kicker: 'Optie 11',
  title: 'Scroll-video / animaties',
  lead: 'Die opening die je net zag — website die zichzelf opbouwt terwijl je scrolt? Dat is deze optie. Hieronder speelt hij nog een keer af.',
  replay: 'Speel opnieuw af',
} as const;

/* Demo 12 — Cadeaubonnen & stempelkaart */
export const demoCadeau = {
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

export const configurator = {
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
  disclaimer: 'Richtprijs — definitieve offerte na kort gesprek, altijd vaste prijs.',
  popularBadge: 'Populair',
  includedBadge: 'Inbegrepen',
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
    success: 'Top! Je ontvangt binnen 24 uur je offerte + een gratis demo-voorstel voor jouw zaak.',
    errorValidation: 'Check even de rood gemarkeerde velden.',
    errorSend: 'Versturen lukte niet. Gebruik een van de knoppen hieronder — je samenstelling gaat automatisch mee.',
    mailtoButton: 'Mail je samenstelling',
    whatsappButton: 'Liever appen? Stuur je samenstelling direct door',
    privacyNote: 'Je gegevens gebruik ik alleen om je offerte te sturen. Zie de privacyverklaring.',
  },
} as const;

/* ---------------------------- Voorbeelden --------------------------- */
/**
 * Twee complete voorbeeldsites. Let op: de bedrijven zijn verzonnen — dit is
 * geen opgeleverd klantwerk. Zeg dat er ook bij; het maakt de rest
 * geloofwaardiger, niet minder. Echte casestudies horen in `proof.cases`.
 */
export const showcase = {
  kicker: 'Voorbeelden',
  title: 'Twee complete sites. Klik ze kapot.',
  lead: 'Hierboven staat elke optie los. Zo ziet het eruit als alles samenkomt in één site: twee volledige voorbeelden die je zelf kunt gebruiken. De bedrijven heb ik verzonnen — alles wat je aanklikt werkt echt.',
  sites: [
    {
      name: 'Fysio Vesting',
      sector: 'Fysiotherapiepraktijk · Naarden',
      href: 'https://ad-1-kliniek.base44.app',
      /** Kort: waar je op moet klikken als je maar één ding probeert. */
      tryThis: 'Plan hieronder een intake — precies zoals een patiënt dat doet.',
      rest: 'Op de site zelf zit ook het patiëntportaal met oefenvideo’s en het beheerscherm voor de praktijk.',
      /** Bijbehorende opties op de menukaart, zodat de link naar binnen wijst. */
      addons: ['agenda', 'intake', 'portaal'] as const,
    },
    {
      name: 'Hovenier Van Slooten',
      sector: 'Hovenier & bestrating · Deventer',
      href: 'https://ad-2-vakman.base44.app',
      tryThis: 'Twee vragen en je weet waar je aan toe bent.',
      rest: 'Op de site zelf gaat de aanvraag daarna door met foto’s, en staan de projecten met voor- en na-beeld.',
      addons: ['calculator', 'intake', 'beforeafter'] as const,
    },
  ],
} as const;

/**
 * Teksten voor de twee nagebouwde mini-previews in de sectie Voorbeelden.
 * Bewust nagebouwd en niet ingesloten: base44 stuurt `x-frame-options: DENY`
 * mee, dus een iframe is geen optie — en een screenshot veroudert zodra de
 * demo verandert. Dit blijft klein en klikbaar; de echte site is één klik weg.
 */
export const showcasePreview = {
  fysio: {
    heading: 'Intake plannen',
    sub: 'Ook zonder verwijzing',
    days: [
      { id: 'do', label: 'do 12', slots: ['09:00', '11:30'] },
      { id: 'vr', label: 'vr 13', slots: ['08:30', '14:00', '16:15'] },
      { id: 'ma', label: 'ma 16', slots: ['10:00', '15:30'] },
    ],
    confirmTitle: 'Gelukt.',
    confirmText: 'Je krijgt een mail ter bevestiging — en de intake staat ingevuld klaar vóór je binnenloopt.',
    restart: 'Nog eens',
  },
  vakman: {
    heading: 'Wat gaat het kosten?',
    typeLabel: 'Wat wilt u laten doen?',
    types: [
      { id: 'tuin', label: 'Complete tuin', base: 4200, perM2: 145 },
      { id: 'bestrating', label: 'Alleen bestrating', base: 1400, perM2: 95 },
      { id: 'onderhoud', label: 'Onderhoud', base: 300, perM2: 12 },
    ],
    /** Bewust niet "de tuin": de vraag geldt ook als je bestrating kiest. */
    sizeLabel: 'Hoe groot is het oppervlak?',
    sizeUnit: 'm²',
    sizeMin: 20,
    sizeMax: 150,
    sizeValue: 60,
    resultLabel: 'Indicatie',
    /** Bandbreedte: ±12% rond de berekening. Nooit één hard bedrag. */
    spread: 0.12,
    note: 'Een plan, een prijs, geen meerwerk.',
  },
} as const;

/* ------------------------------ Proof ------------------------------ */

export const proof = {
  kicker: 'Resultaat',
  title: 'Gebouwd voor ondernemers zoals jij.',
  cases: [
    {
      company: '{Bedrijf}',
      sector: 'Kapsalon',
      result: '{resultaat — bijv. 40% minder telefoontjes dankzij online agenda}',
      quote: '{quote van de ondernemer}',
    },
    {
      company: '{Bedrijf}',
      sector: 'Restaurant',
      result: '{resultaat — bijv. € 580/maand minder platform-commissie}',
      quote: '{quote van de ondernemer}',
    },
    {
      company: '{Bedrijf}',
      sector: 'Klusbedrijf',
      result: '{resultaat — bijv. 3× meer offerte-aanvragen via de prijscalculator}',
      quote: '{quote van de ondernemer}',
    },
  ],
  stats: [
    { value: 25, suffix: '+', label: 'sites gebouwd' },
    { value: 5, suffix: ' dagen', label: 'gem. oplevertijd' },
    { value: 24, prefix: '< ', suffix: ' uur', label: 'reactietijd' },
  ],
} as const;

/* ---------------------------- Over Scott --------------------------- */

export const about = {
  kicker: 'Over Scott',
  title: 'Direct contact met de maker. Geen accountmanagers.',
  paragraphs: [
    'Ik ben Scott — ik bouw websites en web-apps voor kleine ondernemers in Nederland. Alles wat je op deze pagina ziet werken, heb ik zelf gebouwd. En alles wat ik voor jou bouw, werkt net zo.',
    'Ik werk met moderne AI-tooling. Daarom kan ik leveren in dagen en rekenen in honderden, niet duizenden. Wat níet door AI gebeurt: nadenken over jouw zaak, keuzes maken en kwaliteit bewaken. Dat doe ik.',
    'Je appt of belt rechtstreeks met mij. Vandaag een wijziging nodig? Meestal staat hij er vandaag nog op.',
  ],
  photoAlt: 'Foto van Scott Prins',
} as const;

/* ------------------------------- FAQ -------------------------------- */

export const faq = {
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
      a: 'Standaard bouw ik zonder tracking-cookies, dus meestal is er geen cookiebanner nodig. Formulieren verlopen versleuteld en je krijgt een passende privacyverklaring bij je site.',
    },
    {
      q: 'Wat kost een wijziging na oplevering?',
      a: 'Kleine wijzigingen (tekst, foto, openingstijden) zitten bij het Plus- en Premium-onderhoud in. Zonder onderhoudsplan betaal je een vast bedrag per wijziging — vooraf afgesproken, geen uurtje-factuurtje.',
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

export const footer = {
  cta: 'Zin om te beginnen?',
  kvkLabel: 'KVK',
  kvk: '89874994',
  btwLabel: 'BTW-id',
  btw: '{BTW}',
  privacyLink: 'Privacyverklaring',
  rights: `© ${new Date().getFullYear()} ${site.legalName}`,
} as const;

/* --------------------------- Privacy-pagina ------------------------- */

export const privacy = {
  title: 'Privacyverklaring',
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
