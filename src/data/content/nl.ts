/**
 * Nederlandse teksten. Dit is de standaardtaal van de site.
 *
 * Regels voor alles hier:
 * - Geen gedachtestreepjes (— of –) in zichtbare tekst. Punt, komma,
 *   dubbele punt of haakjes. De test in content.test.ts bewaakt dit.
 * - Getallen (prijs, dagen, uren) komen uit offer.ts, nooit ingetypt.
 * - {naam} wordt in het voorbeeld vervangen door de naam van de zaak.
 */
import { site } from '../site';
import { offer } from '../offer';
import { eur } from '../../lib/format';

const PRIJS = eur(offer.price, 'nl');
const DAGEN = offer.deliveryDays;
const UUR = offer.responseHours;
const PLUS = eur(offer.care[0].monthly, 'nl');
const BTW = `${Math.round(offer.vatRate * 100)}% btw`;
const PRIJS_INCL = eur(Math.round(offer.price * (1 + offer.vatRate)), 'nl');

const meta = {
  title: `Website laten maken voor ${PRIJS} | Scott Prins`,
  description: `Onder je website zit een betere. Ik bouw hem voor ${PRIJS}: eigen ontwerp, vloeiende motion en snel op elke telefoon. Binnen ${DAGEN} werkdagen live. Webdesigner uit Badhoevedorp.`,
  ogAlt: `Onder je website zit een betere. Scott Prins bouwt hem voor ${PRIJS}.`,
} as const;

const nav = {
  home: 'Scott Prins, naar boven',
  label: 'Hoofdmenu',
  links: [
    { label: 'Het voorbeeld', href: '#upgrade' },
    { label: 'Prijs', href: '#prijs' },
    { label: 'Werkwijze', href: '#werkwijze' },
    { label: 'Vragen', href: '#vragen' },
  ],
  cta: 'Claim je site',
  menu: 'Menu',
  close: 'Sluiten',
  skip: 'Naar de inhoud',
  langLabel: 'Taal',
  langSwitchTo: 'Switch to English',
} as const;

const hero = {
  titleStart: 'Onder je website zit een',
  titleAccent: 'betere',
  titleEnd: '.',
  lead: `Ik haal hem naar boven. Een eigen ontwerp, vloeiende motion en snel op elke telefoon. Voor ${PRIJS}, binnen ${DAGEN} werkdagen live.`,
  cta: `Claim je site voor ${PRIJS}`,
  ctaWhy: `Waarom maar ${PRIJS}?`,
} as const;

const device = {
  regionLabel: 'Interactief voorbeeld: van oude naar nieuwe website',
  tablistLabel: 'Kies je branche',
  nameLabel: 'Naam van je zaak',
  namePlaceholder: 'Typ je bedrijfsnaam',
  hintFine: 'Houd de muis ingedrukt om te upgraden',
  hintCoarse: 'Houd je duim op de site',
  hintLonger: 'Iets langer vasthouden',
  upgrade: 'Upgrade',
  reset: 'Terug naar de oude',
  revealedBefore: 'Dit is',
  revealedAfter: `Voor ${PRIJS}.`,
  openFull: 'Open als echte site',
  claim: 'Claim deze site',
  srDescription:
    'Bovenop ligt een verouderde website, eronder een nieuwe versie van dezelfde zaak. Houd de site ingedrukt of gebruik de knop Upgrade om de nieuwe versie te tonen. Met de tabs kies je een branche, in het tekstveld typ je de naam van je eigen zaak.',
  srRevealed: 'De nieuwe versie is zichtbaar.',
  srReset: 'De oude versie is weer zichtbaar.',
  beforeTag: 'Zo ziet de gemiddelde site eruit',
  afterTag: 'Zo kan het',
} as const;

/* Teksten per branche. `before` is de verouderde site (bewust zo), `after`
   de nieuwe. Alles is een verzonnen voorbeeldzaak. */
const trades = {
  bakker: {
    tab: 'Bakker',
    before: {
      tagline: 'Uw bakker voor vers brood en gebak!',
      nav: 'Assortiment',
      p1: '{naam} is een familiebedrijf. Bij ons kunt u terecht voor vers brood, gebak en taarten voor elke gelegenheid.',
      p2: 'Wij staan voor kwaliteit en service. Kom gerust eens langs in onze winkel!',
      news: 'NIEUW: nu ook geopend op zondag!!',
      caption: 'Onze winkel',
    },
    after: {
      nav: ['Brood', 'Taart', 'Bestellen'],
      navCta: 'Bestel voor morgen',
      eyebrow: 'Ambachtelijke bakker',
      titleStart: 'Brood dat je',
      titleAccent: 'ruikt',
      titleEnd: 'voordat je binnen bent.',
      sub: 'Elke nacht gebakken in onze eigen oven. Bestel vóór 20:00 en haal het morgen vers op.',
      cta: 'Bestel voor morgen',
      cta2: 'Bekijk het assortiment',
      facts: ['Elke ochtend vanaf 7:00', 'Eigen oven, eigen deeg', 'Ook online bestellen'],
      alt: 'Vers brood op een houten plank',
    },
  },
  kapper: {
    tab: 'Kapper',
    before: {
      tagline: 'Voor al uw haarwensen',
      nav: 'Prijslijst',
      p1: '{naam} is al jaren een begrip in de buurt. Wij knippen dames, heren en kinderen.',
      p2: 'U kunt telefonisch een afspraak maken tijdens openingstijden.',
      news: 'Afspraak maken? Bel ons tijdens openingstijden!',
      caption: 'Onze salon',
    },
    after: {
      nav: ['Behandelingen', 'Team', 'Prijzen'],
      navCta: 'Plan je afspraak',
      eyebrow: 'Haar en styling',
      titleStart: 'Haar dat',
      titleAccent: 'bij je',
      titleEnd: 'past.',
      sub: 'Knippen, kleuren en stylen, met de tijd om eerst te luisteren. Plan zelf online, ook ’s avonds.',
      cta: 'Plan je afspraak',
      cta2: 'Bekijk de prijzen',
      facts: ['Online plannen, ook ’s avonds', 'Kleur en balayage', 'Herinnering per sms'],
      alt: 'Scharen aan een houten wand',
    },
  },
  restaurant: {
    tab: 'Restaurant',
    before: {
      tagline: 'Gezellig uit eten in een ongedwongen sfeer',
      nav: 'Menukaart (PDF)',
      p1: 'Welkom bij {naam}! Wij serveren dagelijks heerlijke gerechten in een gezellige omgeving.',
      p2: 'Reserveren kan telefonisch of per e-mail.',
      news: 'Download hier onze menukaart (PDF, 4,2 MB)',
      caption: 'Ons restaurant',
    },
    after: {
      nav: ['Menu', 'Reserveren', 'Contact'],
      navCta: 'Reserveer een tafel',
      eyebrow: 'Seizoenskeuken',
      titleStart: 'Tafel voor twee?',
      titleAccent: 'Vanavond nog.',
      titleEnd: '',
      sub: 'Een seizoenskaart, natuurwijn en een keuken die tot 22:00 open is. Reserveren duurt twintig seconden.',
      cta: 'Reserveer een tafel',
      cta2: 'Bekijk de kaart',
      facts: ['Wo t/m zo vanaf 17:00', 'Seizoenskaart', 'Groepen tot 20 personen'],
      alt: 'Pasta en rode wijn bij kaarslicht',
    },
  },
  bouw: {
    tab: 'Bouw',
    before: {
      tagline: 'Voor al uw bouw- en verbouwwerkzaamheden',
      nav: 'Werkzaamheden',
      p1: '{naam} is uw partner voor nieuwbouw, verbouw en onderhoud. Wij werken met vakkundig personeel.',
      p2: 'Neem gerust contact met ons op voor een vrijblijvende offerte.',
      news: 'Zie ook onze projecten op Facebook!',
      caption: 'Aan het werk',
    },
    after: {
      nav: ['Diensten', 'Projecten', 'Over ons'],
      navCta: 'Vraag een offerte',
      eyebrow: 'Bouw en verbouw',
      titleStart: 'Wij bouwen.',
      titleAccent: 'Jij woont.',
      titleEnd: '',
      sub: 'Aanbouw, renovatie en nieuwbouw. Eén aanspreekpunt, een vaste prijs en een planning die klopt.',
      cta: 'Vraag een offerte',
      cta2: 'Bekijk projecten',
      facts: ['Vaste prijs vooraf', 'Eigen vakmensen', 'Eén aanspreekpunt'],
      alt: 'Gereedschap op een houten werkbank',
    },
  },
  praktijk: {
    tab: 'Praktijk',
    before: {
      tagline: 'Uw praktijk voor fysiotherapie',
      nav: 'Behandelingen',
      p1: 'Welkom op de website van {naam}. Onze praktijk is gespecialiseerd in alle vormen van fysiotherapie.',
      p2: 'Voor een afspraak kunt u bellen tijdens openingstijden. Vergeet uw verzekeringspas niet!',
      news: 'Let op: gewijzigde openingstijden tijdens de feestdagen',
      caption: 'Onze praktijk',
    },
    after: {
      nav: ['Behandelingen', 'Vergoeding', 'Team'],
      navCta: 'Maak een afspraak',
      eyebrow: 'Fysiotherapie in de wijk',
      titleStart: 'Weer zonder pijn',
      titleAccent: 'bewegen.',
      titleEnd: '',
      sub: 'Persoonlijke behandeling, een korte wachttijd en oefeningen die je thuis ook echt doet. Je bent welkom zonder verwijzing.',
      cta: 'Maak een afspraak',
      cta2: 'Wat wordt vergoed?',
      facts: ['Ook zonder verwijzing', 'Intake vooraf online', 'Avondspreekuur'],
      alt: 'Een bonsai op een tafel in een rustige kamer',
    },
  },
  sport: {
    tab: 'Sport',
    before: {
      tagline: 'Sport en fitness voor iedereen!',
      nav: 'Lesrooster',
      p1: '{naam} biedt fitness en groepslessen voor jong en oud.',
      p2: 'Kom langs voor een rondleiding of vraag naar onze tarieven aan de balie.',
      news: 'Actie: inschrijfgeld GRATIS!!',
      caption: 'Onze zaal',
    },
    after: {
      nav: ['Lessen', 'Rooster', 'Lidmaatschap'],
      navCta: 'Gratis proefles',
      eyebrow: 'Training in kleine groepen',
      titleStart: 'Sterker dan',
      titleAccent: 'gisteren.',
      titleEnd: '',
      sub: 'Kleine groepen, echte coaching en een rooster dat om je werk heen past. De eerste les is gratis.',
      cta: 'Plan een gratis proefles',
      cta2: 'Bekijk het rooster',
      facts: ['Kleine groepen', 'Open vanaf 6:00', 'Eerste les gratis'],
      alt: 'Close-up van een halterschijf',
    },
  },
} as const;

/* Gedeelde stukjes van de verouderde voorbeeldsite. */
const oldSite = {
  nav: ['Home', 'Over ons', 'Contact'],
  welcome: 'Welkom op de website van {naam}!',
  link: 'Klik hier voor onze openingstijden',
  footer: '© 2014 {naam} | Alle rechten voorbehouden | Laatst bijgewerkt: 12-03-2017',
  visitors: 'Bezoekers:',
  hours: 'Openingstijden',
  hoursRows: [
    ['ma', 'gesloten'],
    ['di t/m vr', '8.30 - 17.30'],
    ['za', '8.00 - 16.00'],
  ],
} as const;

const vijftig = {
  label: 'Eerste indruk',
  title: 'Je hebt 50 milliseconden.',
  flashCaption: 'Dat was 50 milliseconden. Zag je het?',
  flashReduced: 'Zo kort is 50 milliseconden: drie beeldjes op je scherm.',
  play: 'Toon 50 milliseconden',
  replay: 'Nog een keer',
  body: [
    'Zo snel oordeelt een bezoeker over je website, nog voordat er één woord gelezen is. En dat eerste oordeel kleurt alles wat daarna komt.',
    'Wie dan afhaakt, klikt terug naar Google. Naar de volgende in de lijst.',
  ],
  punch: 'Je concurrent krijgt dezelfde 50 milliseconden. Het verschil is wat er dan op het scherm staat.',
  source: 'Bron: Lindgaard e.a., Behaviour & Information Technology, 2006',
  sourceHref: 'https://doi.org/10.1080/01449290500330448',
} as const;

const included = {
  label: 'Wat je krijgt',
  title: 'Alles wat je hier ziet, krijg jij ook.',
  lead: 'Geen bouwpakket met je logo erop. Een site die vanaf de eerste seconde laat zien wat je zaak waard is.',
  items: [
    {
      term: 'Een eigen ontwerp',
      text: 'Geen template die je concurrent ook heeft. Jouw kleuren, jouw beelden, jouw toon.',
    },
    {
      term: 'Motion die klopt',
      text: 'Vloeiend scrollen, tekst die binnenkomt en details die reageren op je bezoeker. Zoveel als bij je zaak past, en nergens in de weg.',
    },
    {
      term: 'Snel, ook op 4G',
      text: 'Geen loodzware bouwpakketten. Je site laadt vlot, ook buiten op de telefoon.',
    },
    {
      term: 'Ontworpen voor de duim',
      text: 'Geen kleiner gemaakte desktopsite, maar een site die op de telefoon begint.',
    },
    {
      term: 'Gevonden worden',
      text: 'Een nette basis voor Google: goede titels en beschrijvingen, gestructureerde gegevens en een snelle site.',
    },
    {
      term: 'Contact zonder drempel',
      text: 'Een formulier dat echt aankomt, een WhatsApp-knop en je nummer één tik weg.',
    },
    {
      term: 'Teksten geregeld',
      text: 'Geen zin om te schrijven? In een gesprek van een half uur vertel jij over je zaak, en ik maak er de teksten van.',
    },
    {
      term: 'Domein en livegang',
      text: 'Ik koppel je domein en zet alles live. Jij hoeft niets technisch te doen.',
    },
  ],
} as const;

const price = {
  label: 'De prijs',
  question: 'Wat kost zo’n site?',
  once: 'Eenmalig. Alles erin. Daarna is hij van jou.',
  compareLabel: 'Vergelijk het maar',
  compare: [
    { who: 'Een bureau', what: 'Vaak duizenden euro’s, en weken wachten.', mine: false },
    { who: 'Een websitebouwer', what: 'Elke maand betalen, en je lijkt op iedereen.', mine: false },
    { who: 'Scott Prins', what: `${PRIJS} eenmalig. Binnen ${DAGEN} werkdagen live.`, mine: true },
  ],
  includedLabel: 'Erin zit',
  included: [
    'Eén pagina, alles erop',
    'Eigen ontwerp',
    'Motion en animaties',
    'Mobiel en snel',
    'Basis voor Google',
    'Teksten na een belgesprek',
    'Domein koppelen',
    'Hosting',
    `${offer.revisionRounds} rondes aanpassingen`,
  ],
  whyTitle: `Waarom maar ${PRIJS}?`,
  why: [
    'Omdat ik niet elke site vanaf nul bouw. Ik werk met een eigen systeem van ontwerpen en animaties, en dat maak ik per klant op maat.',
    'En ik werk met moderne AI-tooling. Wat níet door AI gebeurt: nadenken over jouw zaak, keuzes maken en kwaliteit bewaken. Dat doe ik.',
  ],
  terms: `Prijs exclusief ${BTW} (${PRIJS_INCL} inclusief). Alleen voor bedrijven. De helft bij de start, de helft bij oplevering.`,
  care: `Geen abonnement nodig. Wil je dat ik je site bijhoud? Dat kan vanaf ${PLUS} per maand, maandelijks opzegbaar.`,
  cta: `Claim je site voor ${PRIJS}`,
} as const;

const process = {
  label: 'Werkwijze',
  title: `Van aanvraag tot live in ${DAGEN} werkdagen.`,
  steps: [
    {
      title: 'Je aanvraag',
      when: 'Vandaag',
      text: 'Je vult de bestelbon onderaan in. Twee minuten werk, en je betaalt nog niets.',
    },
    {
      title: 'Je proefpagina',
      when: `Binnen ${UUR} uur`,
      text: 'Je ziet de bovenkant van je nieuwe site, met jouw naam en kleuren. Gratis. Bevalt hij niet, dan stopt het hier.',
    },
    {
      title: 'Akkoord en een gesprek',
      when: 'Dag 1',
      text: 'Je betaalt de eerste helft. Een half uur aan de telefoon: wat verkoop je, aan wie, en wat moet je site opleveren?',
    },
    {
      title: 'Bouwen en bijsturen',
      when: 'Dag 2 tot 4',
      text: `Ik bouw je site. Jij kijkt mee en stuurt bij, in ${offer.revisionRounds} rondes.`,
    },
    {
      title: 'Live',
      when: `Dag ${DAGEN}`,
      text: 'Je site staat online en je domein is gekoppeld. Pas dan betaal je de tweede helft.',
    },
  ],
  note: `De ${DAGEN} werkdagen tellen vanaf het moment dat je materiaal binnen is: je teksten (of ons gesprek), foto’s en logo.`,
} as const;

const about = {
  label: 'Over mij',
  title: 'Ik ben Scott.',
  paragraphs: [
    'Ik bouw websites vanuit Badhoevedorp, voor ondernemers die liever hun vak doen dan worstelen met een websitebouwer.',
    `Je hebt één aanspreekpunt: de maker zelf. Je appt of belt rechtstreeks met mij en hebt binnen ${UUR} uur antwoord.`,
  ],
  photoAlt: 'Portret van Scott Prins',
  stats: [
    { value: '25+', label: 'sites en web-apps gebouwd, eigen projecten inbegrepen' },
    { value: `${DAGEN} werkdagen`, label: 'van jouw materiaal tot live' },
    { value: `< ${UUR} uur`, label: 'reactietijd' },
  ],
  proofLabel: 'Klik er zelf doorheen',
  proof: [
    {
      name: 'modernpitching.nl',
      text: 'De site van mijn eigen coachingbedrijf. Twaalf pagina’s, twee talen en een eigen app-omgeving.',
      href: 'https://modernpitching.nl',
    },
    {
      name: 'scottprins.nl',
      text: 'De site waar je nu op staat. Inclusief dat ding bovenaan.',
      href: '#upgrade',
    },
  ],
  newTab: 'opent in een nieuw tabblad',
  whatsapp: 'App me op WhatsApp',
} as const;

const faq = {
  label: 'Vragen',
  title: 'Goeie vragen.',
  items: [
    {
      q: 'Hoe kan dit zo betaalbaar?',
      a: 'Ik werk met een eigen systeem van ontwerpen en animaties en met moderne AI-tooling, dus ik hoef niet elke site vanaf nul te bouwen. Jij betaalt voor het maatwerk, niet voor het opnieuw uitvinden van het wiel.',
    },
    {
      q: 'Zit er een abonnement aan vast?',
      a: `Nee. Je betaalt ${PRIJS} eenmalig en de hosting zit erin. Alleen je domeinnaam betaal je zelf, meestal zo’n € 10 per jaar. Wil je dat ik je site bijhoud, dan kan dat vanaf ${PLUS} per maand, maandelijks opzegbaar.`,
    },
    {
      q: 'Hoeveel pagina’s krijg ik?',
      a: 'Eén lange, vloeiende pagina waar alles op staat: wat je doet, voor wie, je aanbod of prijzen, wie je bent en hoe je bereikbaar bent. Voor de meeste kleine zaken is dat precies goed. Heb je echt meer pagina’s nodig, dan hoor je vooraf wat dat kost.',
    },
    {
      q: 'Ik heb geen goede teksten of foto’s. Kan het dan wel?',
      a: 'Ja, en dat is eerder regel dan uitzondering. De teksten schrijf ik op basis van één telefoongesprek van een half uur: jij vertelt over je zaak, ik maak er de pagina van, jij leest hem na. Foto’s met een moderne telefoon zijn vaak goed genoeg; anders zoek ik nette rechtenvrije beelden of raad ik een fotograaf bij jou in de buurt aan.',
    },
    {
      q: 'Hoe snel sta ik live?',
      a: `Binnen ${DAGEN} werkdagen, gerekend vanaf het moment dat jouw teksten (of ons gesprek), foto’s en logo binnen zijn.`,
    },
    {
      q: 'Wat als ik het niet mooi vind?',
      a: `Daarom begin je met een gratis proefpagina. Bevalt die niet, dan stopt het daar en betaal je niets. Ga je door, dan heb je nog ${offer.revisionRounds} rondes om bij te sturen voordat de site live gaat.`,
    },
    {
      q: 'Ik heb al een site en een domein. Wat gebeurt daarmee?',
      a: 'Je houdt je eigen domeinnaam; die verhuizen we, dus je gevelbord en je visitekaartjes blijven kloppen. Je e-mailadressen zetten we over voordat de nieuwe site live gaat, zodat je geen mail mist. En je plek in Google gaat mee: elk oud adres wijst netjes door naar de nieuwe pagina.',
    },
    {
      q: 'Van wie zijn het domein en de website?',
      a: 'Van jou. Het domein staat op jouw naam en de site is van jou zodra hij betaald is. Op verzoek krijg je alle bestanden en toegangen. Je zit nergens aan vast.',
    },
    {
      q: 'Kan er later een webshop, agenda of iets anders bij?',
      a: `Ja. Alles wat buiten de ${PRIJS} valt, krijgt vooraf een vaste prijs. Meerwerk bestaat alleen als jij iets extra’s wilt, en ook dat hoor je vooraf.`,
    },
    {
      q: 'Waarom zie ik geen klanten of reviews op deze site?',
      a: 'Omdat ik net begonnen ben als webdesigner en ik geen quotes ga verzinnen. Wat ik wel heb: deze site, met een voorbeeld dat je zelf kunt uitproberen, en modernpitching.nl, de site van mijn eigen bedrijf, die ik van voor tot achter gebouwd heb. Klik er gerust doorheen; dat zegt meer dan een logomuur.',
    },
    {
      q: 'Hoe zit het met de AVG en privacy?',
      a: 'Standaard bouw ik zonder trackingcookies, dus meestal is er geen cookiebanner nodig. Wil je statistieken of een Google-kaart, dan kijken we samen of een melding nodig is; cookieloze statistieken kunnen ook. Formulieren verlopen versleuteld en je krijgt een passende privacyverklaring bij je site.',
    },
  ],
} as const;

const order = {
  label: 'Bestellen',
  titleStart: 'Je concurrent kan deze site volgende week hebben.',
  titleAccent: 'Of jij.',
  lead: `Vul de bon in. Binnen ${UUR} uur heb je je gratis proefpagina, en je betaalt pas als je hem goed vindt.`,
  points: [`Gratis proefpagina binnen ${UUR} uur`, 'Je betaalt pas na akkoord', 'Liever bellen of appen? Ook goed.'],
  slip: {
    heading: 'Bestelbon',
    dateLabel: 'Datum',
    qtyLine: 'Website op maat',
    forLabel: 'voor',
    yourBusiness: 'jouw zaak',
    detail: 'Eén pagina met ontwerp, motion, teksten, Google-basis, domein en hosting',
    roundsLine: 'rondes aanpassingen',
    sampleLine: 'Proefpagina',
    included: 'inbegrepen',
    free: 'gratis',
    totalLabel: 'Nu te betalen',
    totalNote: 'Je betaalt pas na akkoord op je proefpagina.',
    exVat: `excl. ${BTW}`,
  },
  fields: {
    name: 'Je naam',
    email: 'E-mailadres',
    phone: 'Telefoon',
    company: 'Naam van je zaak',
    trade: 'Branche',
    message: 'Nog iets wat ik moet weten?',
    optional: 'optioneel',
  },
  tradeOther: 'Iets anders',
  submit: 'Vraag mijn gratis proefpagina aan',
  sending: 'Bon wordt verstuurd…',
  privacy: 'Ik gebruik je gegevens alleen om je aanvraag te beantwoorden.',
  privacyLink: 'Privacyverklaring',
  success: {
    title: 'Bon ontvangen.',
    text: `Binnen ${UUR} uur hoor je van me. Haast? App me gerust.`,
  },
  errors: {
    name: 'Vul je naam in.',
    email: 'Vul een geldig e-mailadres in.',
    generic: 'Versturen lukte niet. Stuur je bon via WhatsApp of mail, dan staat alles er al in.',
  },
  whatsapp: 'Stuur via WhatsApp',
  mail: 'Stuur via mail',
  previewNote: 'Dit is een preview van de site: versturen gaat hier via WhatsApp of mail. Alles staat er al in.',
  mailSubject: 'Bestelbon via scottprins.nl',
  messageIntro: 'Hoi Scott, ik wil graag een gratis proefpagina.',
} as const;

const footer = {
  closer: 'Onder je website zit een betere.',
  closerCta: 'Haal hem naar boven',
  contactLabel: 'Contact',
  phoneLabel: 'Bellen of appen',
  emailLabel: 'Mail',
  addressLabel: 'Adres',
  addressNote: 'Geen bezoekadres. Ik werk alleen online: via telefoon, WhatsApp en mail.',
  detailsLabel: 'Gegevens',
  kvkLabel: 'KvK',
  kvk: '89874994',
  btwLabel: 'Btw-id',
  btw: '{BTW}',
  privacyLink: 'Privacyverklaring',
  termsLink: 'Algemene voorwaarden',
  rights: `© ${new Date().getFullYear()} ${site.legalName}`,
  timer: 'Je bent hier nu {tijd}. Tijd genoeg voor {aantal} eerste indrukken.',
  credits: 'Foto’s in de voorbeelden: StockSnap (CC0).',
} as const;

const sticky = {
  price: PRIJS,
  cta: 'Claim je site',
} as const;

const voorbeeld = {
  back: 'Terug naar scottprins.nl',
  badge: 'Voorbeeldsite',
  note: `Dit is een voorbeeld van wat je krijgt voor ${PRIJS}.`,
  claim: 'Claim deze site',
  titleSuffix: 'voorbeeldsite door Scott Prins',
} as const;

export const nl = {
  meta,
  nav,
  hero,
  device,
  trades,
  oldSite,
  vijftig,
  included,
  price,
  process,
  about,
  faq,
  order,
  footer,
  sticky,
  voorbeeld,
} as const;
