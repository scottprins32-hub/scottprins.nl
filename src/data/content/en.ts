/**
 * Engelse teksten, zichtbaar op /en/.
 * Dezelfde sleutels als nl.ts — wijkt de een af, dan valt de site om.
 * `pnpm check` (astro check) vangt dat af via het Content-type.
 */
import { site } from '../site';

/* ------------------------------ Hero ------------------------------ */

const hero = {
  eyebrow: 'Website design · fixed price from €495 · Badhoevedorp',
  /** De H1 — staat vanaf de eerste seconde in beeld (ook de LCP van de pagina). */
  headline: 'Websites that work. Built in days, not months.',
  /** Vaste ondertitel onder de H1. */
  sub: 'Pick your base, pick your extras — and see exactly what you get while your site builds itself. Fixed price, and online within 5 working days once your copy and photos are in.',
  actions: {
    primary: { label: 'Build your website', href: '#configurator' },
    secondary: { label: 'See the menu', href: '#menu' },
  },
  /**
   * De vijf bouwdagen. `label` verschijnt in de voortgangsbalk links,
   * `text` is de regel die tijdens het scrollen meeloopt met de bouw.
   */
  days: [
    { label: 'Sketch', text: 'Day 1 — half an hour on the phone: what you sell, to whom, and what the site has to deliver.' },
    { label: 'Design', text: 'Day 2 — your colours, your photos, your tone.' },
    { label: 'Build', text: 'Day 3 — everything you see working here, you can order.' },
    { label: 'Content', text: 'Day 4 — copy, prices and opening hours go in. And then the lights come on.' },
    { label: 'Live', text: 'Day 5 — findable, fast, and yours. Ready for customers.' },
  ],
  caption: '↑ This effect? You can just order it. Option 11 on the menu.',
  captionTargetId: 'menu-scrollvideo',
  scrollHint: 'Scroll — and it builds itself',
  /** Meelopende prijsteller: laat zien wat er verschijnt én wat het kost. */
  ledger: {
    label: 'Your site so far',
    upfrontLabel: 'one-off',
    monthlyLabel: '/mo',
    cta: 'Add it to my quote →',
  },
} as const;

/* ------------------------------ Navigatie --------------------------- */

const nav = {
  links: [
    { label: 'Menu', href: '#menu' },
    { label: 'Examples', href: '#examples' },
    { label: 'Pricing', href: '#configurator' },
    { label: 'Results', href: '#results' },
    { label: 'About Scott', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: 'Quote',
  skipToContent: 'Skip to content',
  menuLabel: 'Main menu',
  langLabel: 'Language',
  langSwitchTo: 'Bekijk deze site in het Nederlands',
} as const;

/* --------------------------- Zo werkt het -------------------------- */

const howItWorks = {
  kicker: 'How it works',
  title: 'Three steps. No fuss.',
  steps: [
    {
      title: 'Pick your base',
      text: 'One-Pager, Complete or Interactive — three honest packages with fixed prices.',
    },
    {
      title: 'Pick your extras',
      text: 'On this site you try every feature live: add what suits your business.',
    },
    {
      title: 'Live in 5 working days',
      text: 'A quote plus a free demo proposal within 48 hours. Happy? Then I start building.',
    },
  ],
} as const;

/* ------------------------- De menukaart ---------------------------- */

const menuIntro = {
  kicker: 'The menu',
  title: 'Don’t read what it does. Just try it.',
  lead: 'Every option below is a real, working demo. Like it? Tap “Add to my site” and it’s in your quote.',
} as const;

/* Demo 1 — Online agenda (fictieve massagepraktijk) */
const demoAgenda = {
  kicker: 'Option 1',
  title: 'Online booking',
  lead: 'Your customers book themselves, day and night. Try it — this one’s real.',
  businessName: 'Demo Practice',
  treatments: [
    { id: 'sport', name: 'Sports massage', duration: '30 min', price: '€42' },
    { id: 'ontspanning', name: 'Relaxation massage', duration: '60 min', price: '€69' },
    { id: 'intake', name: 'Intake + treatment', duration: '45 min', price: '€55' },
  ],
  therapists: [
    { id: 'emma', name: 'Emma', role: 'Sports masseur' },
    { id: 'yusuf', name: 'Yusuf', role: 'Physiotherapist' },
    { id: 'lotte', name: 'Lotte', role: 'Massage therapist' },
  ],
  slots: ['09:00', '10:30', '11:45', '14:00', '15:30', '16:45'],
  confirmTitle: 'Appointment confirmed',
  confirmText: 'That’s how easy it is for your customers. The confirmation goes out automatically; SMS reminders are an optional extra.',
  restart: 'Try again',
  stepLabels: ['Treatment', 'Therapist', 'Time'],
} as const;

/* Demo 2 — AI-chatbot (fictieve kapsalon) */
const demoChatbot = {
  kicker: 'Option 2',
  title: 'AI chatbot',
  lead: 'Trained on your business: opening hours, prices, appointments. Ask it something.',
  botName: 'Salon Demo',
  status: 'replies instantly',
  sendButton: 'Send',
  greeting: 'Hi, I’m the assistant at Salon Demo. Ask me about opening hours, prices or appointments. 💇',
  placeholder: 'Type your question…',
  suggestions: ['What are your opening hours?', 'What does a haircut cost?', 'Can I come in today?'],
  /** Sleutelwoorden → antwoord. Eerste match wint (van boven naar beneden). */
  answers: [
    {
      keywords: ['open', 'what time', 'when', 'hours', 'sunday', 'monday'],
      reply: 'We’re open Tuesday to Saturday, 09:00–17:30. On Monday and Sunday we’re closed.',
    },
    {
      keywords: ['haircut', 'cut'],
      reply: 'A haircut is €34.50 (women and men). Wash and dry always included.',
    },
    {
      keywords: ['colour', 'color', 'highlights'],
      reply: 'Colour starts at €65, highlights at €79. The exact price depends on your hair length.',
    },
    {
      keywords: ['price', 'cost', 'rate', 'rates', 'expensive'],
      reply: 'Haircut €34.50 · colour from €65 · blow-dry €27.50. Want to see the full price list?',
    },
    {
      keywords: ['appointment', 'book', 'reserve', 'available', 'slot', 'today', 'tomorrow'],
      reply: 'You can. Book straight away via online booking — there’s still a slot today at 15:30. 📅',
    },
    {
      keywords: ['address', 'where', 'location', 'parking', 'find you'],
      reply: 'You’ll find us at Demostraat 12 in Utrecht. Free parking round the corner.',
    },
    {
      keywords: ['pay', 'by card', 'ideal', 'cash', 'tikkie'],
      reply: 'You can pay by card, contactless or get a payment request. Cash is fine too.',
    },
    {
      keywords: ['cancel', 'reschedule', 'move'],
      reply: 'Moving or cancelling is free up to 24 hours ahead, just use the link in your confirmation.',
    },
    {
      keywords: ['gift card', 'gift', 'voucher'],
      reply: 'Good idea. We sell digital gift cards from €15 — you can order one online right away. 🎁',
    },
    {
      keywords: ['child', 'children'],
      reply: 'Kids up to 12 get a haircut for €19.50. Bring them along.',
    },
  ],
  fallback: 'In real life I plug into your own knowledge and diary 😉 For this demo I mainly know questions about opening hours, prices and appointments.',
} as const;

/* Demo 3 — Interactieve kaart (fictieve fietsenwinkel-keten) */
const demoKaart = {
  kicker: 'Option 3',
  title: 'Interactive map',
  lead: 'More than one location? One map, always up to date. Switch between them.',
  locations: [
    {
      id: 'amsterdam',
      name: 'Demo Bikes Amsterdam',
      address: 'Prinsengracht 263, Amsterdam',
      q: 'Prinsengracht 263, Amsterdam',
    },
    {
      id: 'utrecht',
      name: 'Demo Bikes Utrecht',
      address: 'Oudegracht 158, Utrecht',
      q: 'Oudegracht 158, Utrecht',
    },
    {
      id: 'eindhoven',
      name: 'Demo Bikes Eindhoven',
      address: 'Markt 17, Eindhoven',
      q: 'Markt 17, Eindhoven',
    },
  ],
  loadLabel: 'Load map',
  privacyNote: 'The map only loads when you click it — after that a request does go to Google. That way your site needs no cookie banner.',
  loadButton: 'Load map (loads Google Maps and sets Google cookies)',
} as const;

/* Demo 4 — Prijscalculator (fictief klusbedrijf) */
const demoCalculator = {
  kicker: 'Option 4',
  title: 'Price calculator',
  lead: 'Let visitors work it out themselves — you get enquiries from people who already know the price.',
  heading: 'What will your bathroom renovation cost?',
  sliders: [
    { id: 'oppervlak', label: 'Floor area', min: 2, max: 15, value: 6, unit: 'm²' },
    { id: 'afwerking', label: 'Finish level', min: 1, max: 3, value: 2, unit: '', labels: ['Basic', 'Comfort', 'Luxury'] },
    { id: 'sanitair', label: 'Sanitaryware', min: 1, max: 3, value: 2, unit: '', labels: ['Standard', 'Mid-range', 'Designer'] },
  ],
  /** Rekensom van de demo: basis + m² × factor(afwerking) + sanitair-staffel. */
  formula: { base: 2400, perM2: [650, 850, 1150], sanitair: [900, 1900, 3400] },
  resultLabel: 'Indicative price incl. fitting',
  disclaimer: 'Demo amounts — your calculator uses your own prices.',
} as const;

/* Demo 5 — Eigen online bestellen (fictieve pizzeria) */
const demoBestellen = {
  kicker: 'Option 5',
  title: 'Your own online ordering',
  lead: 'Orders through your own site instead of a delivery platform. Work out what that saves you.',
  restaurantName: 'Pizzeria La Vera (demo)',
  items: [
    { id: 'margherita', name: 'Margherita', price: 11.5 },
    { id: 'quattro', name: 'Quattro Formaggi', price: 14.0 },
    { id: 'diavola', name: 'Diavola', price: 13.5 },
    { id: 'tiramisu', name: 'Tiramisu', price: 6.5 },
  ],
  checkoutTitle: 'Checkout',
  checkoutNote: 'Demo checkout — nothing gets charged.',
  payButton: 'Pay with iDEAL',
  payNow: 'Pay',
  banks: ['Demobank', 'ING', 'Rabobank', 'ABN AMRO'],
  emptyCart: 'Nothing ordered yet',
  orderAgain: 'Order again',
  paidTitle: 'Order received 🍕',
  paidText: 'Straight to your kitchen, with no commission on top.',
  /** Gemiddelde platform-commissie waarmee de besparingsteller rekent. */
  commissionRate: 0.13,
  savingsLine: 'At 200 orders a month you save ±€7,000/year in delivery-platform commission.',
  savedLabel: 'saved vs. delivery platform',
} as const;

/* Demo 6 — Reviews-wall */
const demoReviews = {
  kicker: 'Option 6',
  ariaLabel: 'Made-up example reviews for this demo',
  title: 'Reviews wall',
  lead: 'Your real Google reviews, always fresh and nicely presented. Swipe through them — on desktop it scrolls by itself.',
  demoNote: 'Made-up reviews for a salon that does not exist. On your site these are your real Google reviews.',
  reviews: [
    { name: 'Sanne V.', stars: 5, text: 'First colour I have genuinely been happy with. And I could still grab a slot online at eleven at night.' },
    { name: 'Mehmet K.', stars: 5, text: 'Seen on time, neat cut, paid and done. Nothing to complain about.' },
    { name: 'Lisa de B.', stars: 5, text: 'My six-year-old sat still in the chair for the first time ever. Hats off.' },
    { name: 'Peter J.', stars: 4, text: 'Good cut and a fair price. Only downside was finding a parking spot.' },
    { name: 'Fatima A.', stars: 5, text: 'Messaged a question on Saturday evening, got an answer straight away. Cut on Monday.' },
    { name: 'Joris T.', stars: 5, text: 'Three years a customer now. They know exactly what I mean by “not too short”.' },
    { name: 'Anouk R.', stars: 5, text: 'The gift card for my mum was in her inbox within a minute. Sorted.' },
    { name: 'Bas W.', stars: 5, text: 'A text reminder the day before, so I never forget my appointment any more.' },
  ],
} as const;

/* Demo 7 — Before/after-slider (fictieve bakkerij) */
const demoBeforeAfter = {
  kicker: 'Option 7',
  title: 'Before/after slider',
  lead: 'Perfect for hairdressers, builders, landscapers — or, as here, for the difference a new website makes. Drag it.',
  beforeLabel: 'Old site (2010)',
  afterLabel: 'New site',
  sliderLabel: 'Compare old and new website',
  bakkerij: {
    name: 'Bakkerij De Korenbloem',
    tagline: 'Fresh from our own oven every day',
    items: ['Sourdough bread', 'Croissants', 'Apple pie'],
    orderButton: 'Order online',
    /* De 2010-site is een parodie — vandaar de hoofdletters en de uitroeptekens. */
    oud: {
      welkom: '~*~ Welcome to',
      nav: ['Home', 'Photo album', 'Guestbook', 'Links'],
      menuTitle: 'Menu',
      menuItems: ['» Our bread', '» Opening hours', '» Directions'],
      nieuws: 'NEW!! Now with apple pie!!',
      bezoekers: 'Visitors: 004217',
      foto: '[shop_photo_small.jpg]',
      bodyPre: 'For over 25 years your trusted address for',
      bodyPost: 'and much more!!! Do drop by the shop.',
      link: 'click here for the opening hours',
      footer: '© 2010 | This site works best in Internet Explorer 8',
    },
  },
} as const;

/* Demo 8 — Digitale intake */
const demoIntake = {
  kicker: 'Option 8',
  /** {n} en {totaal} worden vervangen door de cijfers. */
  stepCounter: 'Step {n} of {totaal}',
  title: 'Digital intake form',
  lead: 'New clients fill in their details up front. You start every appointment prepared.',
  steps: [
    {
      title: 'Your details',
      fields: [
        { id: 'naam', label: 'Name', type: 'text', placeholder: 'Anna Voorbeeld' },
        { id: 'geboortedatum', label: 'Date of birth', type: 'text', placeholder: '12-04-1988' },
      ],
    },
    {
      title: 'What you need',
      fields: [
        { id: 'klacht', label: 'What can I help you with?', type: 'textarea', placeholder: 'E.g. ongoing shoulder pain…' },
      ],
    },
    {
      title: 'Availability',
      fields: [
        { id: 'voorkeur', label: 'When are you usually free?', type: 'choice', options: ['Morning', 'Afternoon', 'Evening'] },
      ],
    },
  ],
  doneTitle: 'Intake received ✓',
  doneText: 'In real life this is now waiting in your inbox or client file — before the first appointment.',
  next: 'Next',
  back: 'Back',
  send: 'Send',
  restart: 'Restart demo',
} as const;

/* Demo 9 — Klantenportaal */
const demoPortaal = {
  kicker: 'Option 9',
  title: 'Customer portal',
  lead: 'Documents, appointments and invoices behind one login of your own. Go ahead and log in (anything goes).',
  loginTitle: 'Log in to Demo & Co',
  emailLabel: 'Email address',
  passwordLabel: 'Password',
  loginButton: 'Log in',
  loginHint: 'Demo: any input works.',
  welcome: 'Welcome back, Anna 👋',
  tiles: [
    { icon: '📄', title: 'Documents', detail: '3 files' },
    { icon: '📅', title: 'Appointments', detail: 'Tue 14:00 — check-up' },
    { icon: '🧾', title: 'Invoices', detail: '1 outstanding' },
    { icon: '💬', title: 'Messages', detail: '2 unread' },
  ],
  logout: 'Log out',
} as const;

/* Demo 10 — Meertalig: de NL- en EN-kopij van déze sectie */
const demoMeertalig = {
  kicker: 'Option 10',
  ariaLabel: 'Choose a language',
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
  kicker: 'Option 11',
  title: 'Scroll video & animation',
  lead: 'That opening you just saw, the site building itself while you scroll? That’s this option. It plays once more below.',
  replay: 'Play again',
} as const;

/* Demo 12 — Cadeaubonnen & stempelkaart */
const demoCadeau = {
  kicker: 'Option 12',
  title: 'Gift cards & loyalty card',
  lead: 'Digital gift cards and a loyalty card in the phone — no hassle with paper. Go on, flip the card over.',
  cardBrand: 'Salon Demo',
  cardValue: '€25',
  cardCode: 'DEMO-8F2K-2026',
  flipHint: 'Tap to flip',
  redeem: 'Redeem',
  redeemed: 'Redeemed — enjoy 🎉',
  stampTitle: 'Loyalty card',
  stampHint: 'Tap to stamp',
  stampReward: 'Card full — 10th cut free',
  stampCount: 10,
} as const;

/* --------------------------- Configurator -------------------------- */

const configurator = {
  kicker: 'Build your website',
  title: 'Your website, your price.',
  lead: 'Pick a base, switch on your extras (whatever you added along the way is already here) and see what it costs.',
  presetTitle: 'Quick start — what kind of business do you have?',
  presetLead: 'One tap and a complete setup that fits your trade is ready, price included. After that you just change what you like.',
  baseTitle: 'Pick your base',
  addonsTitle: 'Pick your extras',
  addonsNoDemoNote: 'No demo on this page — ask, and I’ll show it live.',
  careTitle: 'Maintenance & support',
  quoteTitle: 'Your build',
  upfrontLabel: 'One-off',
  monthlyLabel: 'Per month',
  disclaimer: 'This is the price, ex VAT. You get it back one to one in your quote — it only goes up if you add something yourself.',
  cartOne: 'option',
  cartMany: 'options',
  popularBadge: 'Popular',
  /* 13 — allemaal al in de voorwaarden; hier alleen zichtbaar gemaakt. */
  assurances: [
    'Domain in your name — from day one',
    'Cancel monthly — no minimum term',
    'Leaving? All files come with you and the domain transfer is free',
  ],
  monthlyTitle: 'What exactly am I paying that monthly amount for?',
  monthlyItems: [
    'Hosting — the computer your site runs on 24/7, including the padlock in the address bar.',
    'Updates and security — so your site does not quietly age or get hacked.',
    'Small changes — a new price, a different photo, changed opening hours: just send a message.',
    'The options with running costs that you chose (booking, chatbot, reviews).',
  ],
  includedWorth: 'Together worth',
  cartTotal: 'total',
  presetFrom: 'from',
  includedBadge: 'Included',
  freeLabel: 'free',
  seeDemo: 'See the demo ↑',
  addButton: '+ Add to my site',
  addedButton: '✓ In your site',
  includedButton: '✓ Free with your package',
  form: {
  title: 'Request your quote',
    name: 'Name',
    company: 'Company',
    phone: 'Phone / WhatsApp',
    email: 'Email',
    message: 'Note (optional)',
    submit: 'Send my build',
    sending: 'Sending…',
    success: 'Nice. You’ll have your quote within 48 hours, plus a free demo proposal for your business.',
    errorValidation: 'Have a look at the fields marked in red.',
    errorSend: 'That didn’t send. Use one of the buttons below — your build goes along automatically.',
    mailtoButton: 'Email your build',
    whatsappButton: 'Rather message? Send your build straight over',
    privacyNote: 'I only use your details to send your quote. See',
    privacyLink: 'the privacy policy',
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
  kicker: 'Examples',
  title: 'Two complete sites. Try to break them.',
  lead: 'Above, every option stands on its own. This is what it looks like when it all comes together in one site — including what a site like that costs. I made the businesses up; the sites work for real.',
  contentsLabel: 'What’s in it',
  totalLabel: 'This site',
  totalNote: 'Fixed price. A complete site like this goes live in 7 working days, counted from your material.',
  presetCta: 'Load this build',
  openCta: 'Open the full site',
  liveBadge: 'View live',
  demoEnvNote: 'demo environment — running on a temporary address',
  newTab: 'opens in a new tab',
  sites: [
    {
      name: 'Fysio Vesting',
      sector: 'Physiotherapy practice · Naarden',
      domain: 'fysiovesting.nl',
      href: 'https://ad-1-kliniek.base44.app',
      /**
       * Basisnaam van de schermafbeelding in `public/`. Showcase.astro maakt
       * daar `-600.webp` en `-1200.webp` van. Ontbreekt het bestand, dan slaat
       * hij het beeld over en werkt de kaart gewoon zonder.
       */
      image: '/voorbeeld-fysio',
      summary: 'A complete practice site: patients book themselves, and the intake form is done before they walk in.',
      base: 'interactief',
      /** Gelijk aan preset 'praktijk' in pricing.ts. */
      addons: ['agenda', 'intake', 'portaal', 'sms'] as const,
      /** Eén korte regel per optie: wat het hier doet, niet wat het is. */
      does: {
        agenda: 'patients book themselves, evenings too',
        intake: 'filled in beforehand instead of in the waiting room',
        portaal: 'exercise videos and appointments behind their own login',
        sms: 'a reminder the day before',
      },
      extra: '+ an admin screen where the practice opens up its diary.',
    },
    {
      name: 'Hovenier Van Slooten',
      sector: 'Landscaping & paving · Deventer',
      domain: 'hovenier-vanslooten.nl',
      href: 'https://ad-2-vakman.base44.app',
      image: '/voorbeeld-vakman',
      summary: 'A complete trade site: two questions and you know where you stand, and the request arrives complete.',
      base: 'compleet',
      /** Gelijk aan preset 'klus' in pricing.ts. */
      addons: ['calculator', 'intake', 'beforeafter'] as const,
      does: {
        calculator: 'a price indication in four steps',
        intake: 'measurements and photos sent along straight away',
        beforeafter: 'projects with a before and after shot',
      },
      extra: '+ one overview where every request lands.',
    },
  ],
} as const;

/* ------------------------------ Proof ------------------------------ */

const proof = {
  kicker: 'Results',
  title: 'This is already live. Click your way through it.',
  lead: 'No wall of client logos and no quotes I made up myself. What I do have: two real sites I built and own myself — open them and click around.',
  visitLabel: 'Open the site',
  newTab: 'opens in a new tab',
  builtLabel: 'What runs on it',
  cases: [
    {
      company: 'modernpitching.nl',
      sector: 'My own business · baseball coaching',
      href: 'https://modernpitching.nl',
      extern: true,
      result: 'Twelve pages, two languages and its own app area — the site my own coaching business runs on.',
      built: [
        'AI coach that answers pitchers’ questions',
        'Booking form for sessions',
        'Video upload for a free analysis',
        'Dashboard with progress and messages',
        'Fully Dutch and English',
      ],
    },
    {
      company: 'scottprins.nl',
      sector: 'The page you’re on right now',
      href: '#menu',
      extern: false,
      result: 'Everything on the menu above is live right here. No mockups — you just used the options yourself.',
      built: [
        'Twelve working demos, not screenshots',
        'Configurator that prices your build live',
        'Quote that lands in my inbox as an email',
        'Fully Dutch and English',
      ],
    },
  ],
  stats: [
    { value: 25, suffix: '+', label: 'sites & web apps built — own projects included' },
    { value: 5, suffix: ' working days', label: 'from your material to live' },
    { value: 48, prefix: '< ', suffix: ' hrs', label: 'response time' },
  ],
} as const;

/* ---------------------------- Over Scott --------------------------- */

const about = {
  kicker: 'About Scott',
  title: 'Direct contact with the maker. No account managers.',
  paragraphs: [
    'I’m Scott — I build websites and web apps for small business owners in the Netherlands. Everything you see working on this page, I built myself. And everything I build for you works just as well.',
    'I work with modern AI tooling. That’s why I can deliver in days and charge in hundreds, not thousands. What AI doesn’t do: think about your business, make the choices and keep the quality up. That’s me.',
    'You message or call me directly. Need a change today? Usually it’s live the same day.',
  ],
  whatsappButton: '💬 Message me on WhatsApp',
  photoAlt: 'Photo of Scott Prins',
} as const;

/* ------------------------------- FAQ -------------------------------- */

const faq = {
  kicker: 'FAQ',
  title: 'Good questions.',
  items: [
    {
      q: 'Who owns the domain and the website?',
      a: 'You do. The domain is in your name and you can always ask for all the files and logins. You’re not tied to anything.',
    },
    {
      q: 'What if I want to stop the monthly fee?',
      a: 'You can cancel monthly. The site stays yours; you move it to your own hosting or I hand everything over properly. Only the ongoing services (hosting, updates, modules like online booking) stop.',
    },
    {
      q: 'How fast am I live?',
      a: 'Most sites are live in 5 working days, counted from the moment your texts and photos are in. More complex modules (customer portal, ordering) can take a few days extra.',
    },
    {
      q: 'Does my site work well on mobile?',
      a: 'Mobile is the starting point, not an afterthought — most of your visitors arrive on their phone (probably like you right now). I test every site on real phones.',
    },
    {
      q: 'What about the GDPR and privacy?',
      a: 'By default I build without tracking cookies, so usually no cookie banner is needed. If you pick visitor stats or a Google map, we’ll check together whether a notice is needed — cookieless stats are an option too. Forms are sent encrypted and you get a privacy policy to match your site.',
    },
    {
      q: 'What does a change cost after launch?',
      a: 'The occasional small change — a price, a photo, your opening hours — is simply part of the deal, even without an extra plan. Want things updated monthly? That’s what Plus and Premium are for. Bigger changes always get a fixed price first.',
    },
    {
      q: 'Do you work with fixed prices?',
      a: 'Always. You can see on this page what everything costs, and your quote is a fixed price. Extra work only exists if you want something extra — and you hear that price up front too.',
    },
    {
      q: 'Can I add options later?',
      a: 'Yes, that’s exactly the idea behind the menu. Start small and add online booking or the chatbot later — at the prices you see here.',
    },
  ],
} as const;

/* ------------------------------ Footer ------------------------------ */

const footer = {
  kicker: 'Work together?',
  cta: 'Tell me about your business. You’ll know what it costs within 48 hours.',
  sub: 'Tell me about your business — within 48 hours you’ll have a concrete fixed-price proposal.',
  ctaButton: 'Build your website',
  phoneLine: 'Call or message:',
  kvkLabel: 'Dutch Chamber of Commerce',
  kvk: '89874994',
  btwLabel: 'VAT ID',
  btw: '{BTW}',
  privacyLink: 'Privacy policy',
  termsLink: 'Terms & conditions',
  rights: `© ${new Date().getFullYear()} ${site.legalName}`,
} as const;

/* --------------------------- Privacy-pagina ------------------------- */

const privacy = {
  title: 'Privacy policy',
  metaDescription: `Privacy policy for ${site.legalName}: what data the quote form processes, why, and what your rights are.`,
  updated: 'Last updated: July 2026',
  intro: `${site.legalName} (“I” below) builds websites for small business owners. This page explains how I handle the personal data you share with me through ${site.url}. In short: I only collect what you fill in yourself in the quote form, I use it only to get in touch with you, and I sell or share nothing with third parties for marketing.`,
  sections: [
    {
      title: 'What data do I process?',
      body: [
        'If you fill in the quote form, I process: your name, business name (optional), phone number (optional), email address, any comment you left and the combination you chose in the configurator (package, add-ons and indicative price).',
        'This website uses no tracking cookies and no analytics. So there’s no cookie banner either.',
      ],
    },
    {
      title: 'What do I use your data for?',
      body: [
        'Only to answer your request: I send you a quote and possibly a demo proposal, and contact you about it by email, phone or WhatsApp — depending on what you filled in.',
        'The legal basis for this is “performance of a contract” (art. 6(1)(b) GDPR): you ask for a quote, I deliver it.',
      ],
    },
    {
      title: 'How long do I keep your data?',
      body: [
        'If you become a client, I keep your data for as long as we work together and after that for as long as the law requires (the 7-year tax retention period for invoices, for example).',
        'If you don’t become a client, I delete your request no later than 12 months after our last contact.',
      ],
    },
    {
      title: 'Who has access to your data?',
      body: [
        'Only me. On the technical side I work with two processors: Vercel (hosting of this website, with servers in the EU where possible) and Resend (sending the quote form to my mailbox). Data processing agreements under the GDPR are in place with both.',
        'The “Interactive map” section contains an embedded Google Maps map. It only loads once you scroll it into view; from that moment Google can place cookies under Google’s own privacy policy. Don’t want that? Scroll past that demo without loading the map.',
        'I never sell data and I share nothing with third parties for marketing purposes.',
      ],
    },
    {
      title: 'Your rights',
      body: [
        'You can always view your data, have it corrected or have it deleted. You can also object to processing or ask for your data to be transferred (data portability).',
        `Email ${site.email} for that — I reply within a few working days, at the latest within the legal term of one month.`,
        'Not happy with how I handle your data? You can file a complaint with the Dutch data protection authority, the Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).',
      ],
    },
    {
      title: 'Security',
      body: [
        'This site runs entirely over an encrypted connection (HTTPS). Form data is sent encrypted and stored only in my secured mailbox.',
      ],
    },
    {
      title: 'Contact',
      body: [
        `${site.legalName} · Dutch Chamber of Commerce ${footer.kvk} · ${site.email}`,
        'Questions about this privacy policy? Just email or message me.',
      ],
    },
  ],
  backLink: '← Back to the site',
} as const;

/* ----------------------- Algemene voorwaarden ----------------------- */
/* Door Scott bevestigd — zie de notitie in nl.ts. */

const voorwaarden = {
  title: 'Terms & conditions',
  updated: 'Version August 2026',
  metaDescription: `The terms and conditions of ${site.legalName}, in plain language: how a project starts, what you get, how payment works and how you cancel monthly.`,
  intro: `No small print: these are the terms I work under, in plain language. They apply to everything you buy from ${site.legalName} (Dutch Chamber of Commerce 89874994). Anything unclear? Just email or message me — we’ll put it in writing before we start.`,
  sections: [
    {
      title: 'How a project starts',
      body: [
        'My offer is for business customers: entrepreneurs, practices and associations. You build your website on this site, or we talk it through by email, phone or WhatsApp. You then get one clear quote with a fixed price: a one-off amount and — depending on your choices — a monthly amount. All prices exclude VAT.',
        'The quote is valid for 30 days. Say yes in writing (an email or a WhatsApp message counts) and that’s the starting gun — these terms apply from then on.',
      ],
    },
    {
      title: 'What I deliver, and when',
      body: [
        'You get exactly what the quote says: the chosen base package plus the chosen options. Most sites go live within 5 working days, counted from the moment all your material (copy, photos, logins) is in. More complex modules, such as a portal or online ordering, can take a few days extra.',
        'Before going live we review the result together. Two rounds of adjustments are part of the price. After that, changes — big and small — fall under maintenance or under extra work, with a fixed price first.',
      ],
    },
    {
      title: 'Payment',
      body: [
        'You pay the one-off amount in two halves. I send the first invoice when you agree and start building right away; the site goes live once that first half is in. The second invoice follows after go-live. Both invoices have a 14-day payment term.',
        'The monthly amount starts at go-live and is billed per month, by invoice or direct debit — whatever we agree.',
        'If you pay late, I first send a normal reminder. If payment still doesn’t come, statutory interest and collection costs apply, and I may pause running services until payment is in — always announced first.',
        'If, after agreeing, you don’t supply material for more than three months despite a reminder, I may wrap up the project based on what’s there; the first half remains due.',
      ],
    },
    {
      title: 'Monthly services and cancelling',
      body: [
        'The monthly amount covers hosting, updates and security, plus the modules with running costs (such as online booking or the chatbot). The occasional small change — a price, a photo, your opening hours — is simply part of it.',
        'You can cancel any month, by email or message, effective at the end of the current month; there is no minimum term. Your site and your domain are and remain yours: I hand over all files neatly and transfer your domain free of charge. Only the running services stop.',
        'If I ever need to change the monthly amount or these running services — for instance because hosting or AI providers change their costs — you’ll hear at least a month in advance. Don’t agree? Then you simply cancel.',
      ],
    },
    {
      title: 'Your material',
      body: [
        'You supply the copy, photos and other content, or we agree that I help with that. You guarantee that this material may be used — so no photos or texts that belong to someone else without permission.',
        'Personal data is handled as described in the privacy policy. If your site runs modules that process your own customers’ data (such as online booking, intake or the portal), I process that data only on your instructions and we record this in a short data processing agreement. If you cancel, you get an export of that data and I delete it within 30 days.',
      ],
    },
    {
      title: 'Who owns the site?',
      body: [
        'I register the domain in your name — so that’s yours from day one. The site itself (the design, the copy, the code and the structure) is entirely yours once the one-off amount is paid in full; on request I confirm that transfer with a signed document. The monthly amount is separate from this. Open-source components remain under their own licences — that’s normal and costs you nothing.',
        'I may show the site in my portfolio and refer to it in my own communication, unless you tell me you’d rather I didn’t.',
      ],
    },
    {
      title: 'AI modules',
      body: [
        'The chatbot and the AI phone assistant give automated answers. We set them up carefully together, but systems like these can misunderstand a question or give an answer that isn’t right. So double-check important information (prices, opening hours, appointments) in the first weeks, and report mistakes straight away — I’ll adjust them.',
        'What these modules communicate on behalf of your business remains your responsibility. Don’t let them give medical, legal or financial advice.',
      ],
    },
    {
      title: 'If something goes wrong',
      body: [
        'I work carefully and use reliable parties for hosting and email, but nobody can promise 100% uptime. If there’s an outage, I get on it straight away.',
        'If despite everything something goes wrong and you suffer damages, my liability is limited to the amount you paid me in the three months before — or the one-off amount of your quote, if that is higher. Indirect damages, such as lost revenue, are excluded. None of this limits liability that cannot legally be limited.',
      ],
    },
    {
      title: 'Finally',
      body: [
        'Dutch law applies to our agreements. If I change these terms, an ongoing build keeps the version you agreed to; for running services the announcement rule above applies.',
        `Questions? Email ${site.email} or send a message.`,
      ],
    },
  ],
  backLink: '← Back to the site',
} as const;

const meta = {
  title: 'Website design from €495 — Scott Prins Webdesign',
  description:
    'A website at a fixed price: from €495 ex VAT, live in 5 working days. Web designer based in Badhoevedorp, working across the Netherlands. Build your own site right here.',
} as const;

/* ------ Teksten in de mini-site die zichzelf bouwt (HeroScene) ------ */
const heroScene = {
  menuKicker: 'The menu',
  headline: 'Your website.',
  sub: 'Pick your base, pick your extras.',
  cta: 'Build your website',
  chatName: 'Salon Demo',
  chatBot: 'Hi. Ask me about opening hours or prices 💇',
  chatUser: 'Can I come in today?',
  addToSite: '+ Add to my site',
  statNumber: '5',
  statUnit: 'days',
  statLabel: 'avg. delivery time',
  cartUnit: 'option',
} as const;

/* ------- Tekst rond de offerte-samenvatting (quote.ts) ------- */
const quote = {
  intro: 'My build via scottprins.nl:',
  base: 'Base package',
  includedWith: 'Included with',
  extras: 'Extras',
  none: 'none',
  care: 'Care plan',
  included: 'included',
  totalUpfront: 'Total one-off',
  totalMonthly: 'Total per month',
  /* Wat de bezoeker zelf verstuurt via WhatsApp of mailto. */
  greeting: 'Hi Scott! ',
  subject: 'Quote request via scottprins.nl',
  name: 'Name',
  company: 'Company',
  phone: 'Phone',
  note: 'Note',
} as const;

/* --------- Namen en omschrijvingen bij pricing.ts ---------- */
/* De getallen staan in pricing.ts; alleen de tekst is taalgebonden. */
const pricing = {
  base: {
    visitekaartje: {
      name: 'One-Pager',
      description: 'One strong page that sells your business.',
      includes: ['One page with everything on it, built for the phone', 'Contact form + WhatsApp button', 'Findable in Google for your trade and your town', 'Domain, hosting and the padlock in the address bar: sorted'],
    },
    compleet: {
      name: 'Complete',
      description: 'Several pages, ready to grow.',
      includes: ['Up to 5 pages', 'Everything in One-Pager', 'Linked to your Google Business Profile: opening hours, directions and reviews match everywhere', 'Visitor numbers, without a cookie banner'],
    },
    interactief: {
      name: 'Interactive',
      description: 'For businesses where customers book, order or check their own file.',
      includes: ['Everything in Complete', 'Online booking included at no extra cost', 'Your changes go first'],
    },
  },
  addons: {
    agenda: {
      name: 'Online booking',
      shortPitch: 'Customers book their own appointment.',
    },
    chatbot: {
      name: 'AI chatbot',
      shortPitch: 'Answers questions, day and night.',
    },
    'ai-telefonist': {
      name: 'AI phone assistant',
      shortPitch: 'Picks up when your hands are full.',
    },
    bestellen: {
      name: 'Your own online ordering',
      shortPitch: 'No platform commission.',
    },
    kaart: {
      name: 'Interactive map',
      shortPitch: 'All your locations, neatly on the map.',
    },
    scrollvideo: {
      name: 'Scroll video & animation',
      shortPitch: 'That opening on this site.',
    },
    intake: {
      name: 'Digital intake form',
      shortPitch: 'Smart form, step by step.',
    },
    calculator: {
      name: 'Price calculator',
      shortPitch: 'Customers work out their own price.',
    },
    beforeafter: {
      name: 'Before/after slider',
      shortPitch: 'Show the difference.',
    },
    reviews: {
      name: 'Reviews wall',
      shortPitch: 'Your Google reviews, live on your site.',
    },
    meertalig: {
      name: 'Multilingual',
      shortPitch: 'NL/EN in one click.',
    },
    portaal: {
      name: 'Customer portal',
      shortPitch: 'Documents and invoices behind a login.',
    },
    cadeaubonnen: {
      name: 'Gift cards & loyalty card',
      shortPitch: 'Sell gift cards and bring customers back.',
    },
    sms: {
      name: 'SMS reminders',
      shortPitch: 'Fewer no-shows.',
    },
    nieuwsbrief: {
      name: 'Newsletter',
      shortPitch: 'Stay on your customers’ radar.',
    },
  },
  care: {
    basis: {
      name: 'Basic',
      description: 'Hosting, updates and the occasional small tweak.',
    },
    plus: {
      name: 'Plus',
      description: 'Changes applied every month + reporting.',
    },
    premium: {
      name: 'Premium',
      description: 'Unlimited small changes, always priority.',
    },
  },
  presets: {
    salon: {
      label: 'Hair or beauty salon',
    },
    horeca: {
      label: 'Restaurant, café or delivery',
    },
    klus: {
      label: 'Trades, building or landscaping',
    },
    praktijk: {
      label: 'Practice or therapist',
    },
    winkel: {
      label: 'Shop or showroom',
    },
  },
} as const;

export const en = {
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
