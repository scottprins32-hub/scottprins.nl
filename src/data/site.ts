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
  whatsappDisplay: '+31 6 19 90 04 44',
  meta: {
    title: 'Scott Prins — Websites that work. Built in days, not months.',
    description:
      'Fast, modern websites and web apps for small business owners. Pick your base, pick your extras and see every option live on this site. Fixed prices, live in 5 days.',
  },
} as const;

/* ------------------------------ Hero ------------------------------ */

export const hero = {
  eyebrow: 'Web design from the Netherlands · fixed prices',
  /** De H1 — staat vanaf de eerste seconde in beeld (ook de LCP van de pagina). */
  headline: 'Websites that work. Built in days, not months.',
  /** Vaste ondertitel onder de H1. */
  sub: 'Pick your base, pick your extras — and see exactly what you get while your site builds itself. Live in 5 days, always a fixed price.',
  actions: {
    primary: { label: 'Build your website', href: '#configurator' },
    secondary: { label: 'See the menu', href: '#menukaart' },
  },
  /**
   * De vijf bouwdagen. `label` verschijnt in de voortgangsbalk links,
   * `text` is de regel die tijdens het scrollen meeloopt met de bouw.
   */
  days: [
    { label: 'Sketch', text: 'Day 1 — we start with your story. No template.' },
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

export const nav = {
  links: [
    { label: 'Menu', href: '#menukaart' },
    { label: 'Examples', href: '#voorbeelden' },
    { label: 'Pricing', href: '#configurator' },
    { label: 'Results', href: '#resultaat' },
    { label: 'About Scott', href: '#over-scott' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: 'Quote',
} as const;

/* --------------------------- Zo werkt het -------------------------- */

export const howItWorks = {
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
      title: 'Live in 5 days',
      text: 'A quote plus a free demo proposal within 24 hours. Happy? Then I start building.',
    },
  ],
} as const;

/* ------------------------- De menukaart ---------------------------- */

export const menuIntro = {
  kicker: 'The menu',
  title: 'Don’t read what it does. Just try it.',
  lead: 'Every option below is a real, working demo. Like it? Tap “Add to my site” and it’s in your quote.',
} as const;

/* Demo 1 — Online agenda (fictieve massagepraktijk) */
export const demoAgenda = {
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
  confirmText: 'That’s how easy it is for your customers. Confirmation and reminder go out automatically.',
  restart: 'Try again',
  stepLabels: ['Treatment', 'Therapist', 'Time'],
} as const;

/* Demo 2 — AI-chatbot (fictieve kapsalon) */
export const demoChatbot = {
  kicker: 'Option 2',
  title: 'AI chatbot',
  lead: 'Trained on your business: opening hours, prices, appointments. Ask it something.',
  botName: 'Salon Demo',
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
export const demoKaart = {
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
  privacyNote: 'The map only loads once you scroll it into view — saves data and trackers.',
} as const;

/* Demo 4 — Prijscalculator (fictief klusbedrijf) */
export const demoCalculator = {
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
export const demoBestellen = {
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
  banks: ['Demobank', 'ING', 'Rabobank', 'ABN AMRO'],
  paidTitle: 'Order received 🍕',
  paidText: 'Straight to your kitchen, with no commission on top.',
  /** Gemiddelde platform-commissie waarmee de besparingsteller rekent. */
  commissionRate: 0.13,
  savingsLine: 'At 200 orders a month you save ±€7,000/year in delivery-platform commission.',
  savedLabel: 'saved vs. delivery platform',
} as const;

/* Demo 6 — Reviews-wall */
export const demoReviews = {
  kicker: 'Option 6',
  title: 'Reviews wall',
  lead: 'Your Google reviews, always fresh and nicely presented. This wall scrolls by itself.',
  reviews: [
    { name: 'Sanne V.', stars: 5, text: 'A site I’m genuinely proud of, within a week. Quick replies, fixed price, no surprises.' },
    { name: 'Mehmet K.', stars: 5, text: 'The online booking saves me hours of phone calls every week. Should have done it far sooner.' },
    { name: 'Lisa de B.', stars: 5, text: 'Finally someone who just does what he promises. Site was live on day four.' },
    { name: 'Peter J.', stars: 4, text: 'Tidy site, easy to find in Google. Small changes get picked up fast.' },
    { name: 'Fatima A.', stars: 5, text: 'The chatbot handles the evening questions I used to ring back about myself.' },
    { name: 'Joris T.', stars: 5, text: 'From delivery platform to my own ordering site: the commission I save pays for the site twice over.' },
    { name: 'Anouk R.', stars: 5, text: 'A clear menu with prices, so you know where you stand up front. Refreshing.' },
    { name: 'Bas W.', stars: 5, text: 'My old site was from 2011. The difference? Customers now say: “you look really professional”.' },
  ],
} as const;

/* Demo 7 — Before/after-slider (fictieve bakkerij) */
export const demoBeforeAfter = {
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
  },
} as const;

/* Demo 8 — Digitale intake */
export const demoIntake = {
  kicker: 'Option 8',
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
export const demoPortaal = {
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
export const demoMeertalig = {
  kicker: 'Option 10',
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
  kicker: 'Option 11',
  title: 'Scroll video & animation',
  lead: 'That opening you just saw — a website building itself while you scroll? That’s this option. It plays once more below.',
  replay: 'Play again',
} as const;

/* Demo 12 — Cadeaubonnen & stempelkaart */
export const demoCadeau = {
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

export const configurator = {
  kicker: 'Build your website',
  title: 'Your website, your price.',
  lead: 'Pick a base, switch on your extras (whatever you added along the way is already here) and see what it costs.',
  presetTitle: 'Quick start — what kind of business do you have?',
  presetLead: 'One tap and a setup that fits your trade is ready. After that you just change what you like.',
  baseTitle: 'Pick your base',
  addonsTitle: 'Pick your extras',
  addonsNoDemoNote: 'No demo on this page — ask, and I’ll show it live.',
  careTitle: 'Maintenance & support',
  quoteTitle: 'Your build',
  upfrontLabel: 'One-off',
  monthlyLabel: 'Per month',
  disclaimer: 'Guide price — final quote after a short chat, always a fixed price.',
  popularBadge: 'Popular',
  includedBadge: 'Included',
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
    success: 'Nice. You’ll have your quote within 24 hours, plus a free demo proposal for your business.',
    errorValidation: 'Have a look at the fields marked in red.',
    errorSend: 'That didn’t send. Use one of the buttons below — your build goes along automatically.',
    mailtoButton: 'Email your build',
    whatsappButton: 'Rather message? Send your build straight over',
    privacyNote: 'I only use your details to send your quote. See the privacy policy.',
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
export const showcase = {
  kicker: 'Examples',
  title: 'Two complete sites. Try to break them.',
  lead: 'Above, every option stands on its own. This is what it looks like when it all comes together in one site — including what a site like that costs. I made the businesses up; the sites work for real.',
  contentsLabel: 'What’s in it',
  totalLabel: 'This site',
  totalNote: 'Fixed price. Live in 5 working days.',
  presetCta: 'Load this build',
  openCta: 'Open the full site',
  liveBadge: 'View live',
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

export const proof = {
  kicker: 'Results',
  title: 'Built for business owners like you.',
  cases: [
    {
      company: '{Business}',
      sector: 'Hair salon',
      result: '{result — e.g. 40% fewer phone calls thanks to online booking}',
      quote: '{quote from the business owner}',
    },
    {
      company: '{Business}',
      sector: 'Restaurant',
      result: '{result — e.g. €580/month less platform commission}',
      quote: '{quote from the business owner}',
    },
    {
      company: '{Business}',
      sector: 'Trades',
      result: '{result — e.g. 3× more quote requests via the price calculator}',
      quote: '{quote from the business owner}',
    },
  ],
  stats: [
    { value: 25, suffix: '+', label: 'sites built' },
    { value: 5, suffix: ' days', label: 'avg. delivery time' },
    { value: 24, prefix: '< ', suffix: ' hours', label: 'response time' },
  ],
} as const;

/* ---------------------------- Over Scott --------------------------- */

export const about = {
  kicker: 'About Scott',
  title: 'Direct contact with the maker. No account managers.',
  paragraphs: [
    'I’m Scott — I build websites and web apps for small business owners in the Netherlands. Everything you see working on this page, I built myself. And everything I build for you works just as well.',
    'I work with modern AI tooling. That’s why I can deliver in days and charge in hundreds, not thousands. What AI doesn’t do: think about your business, make the choices and keep the quality up. That’s me.',
    'You message or call me directly. Need a change today? Usually it’s live the same day.',
  ],
  photoAlt: 'Photo of Scott Prins',
} as const;

/* ------------------------------- FAQ -------------------------------- */

export const faq = {
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
      a: 'By default I build without tracking cookies, so usually no cookie banner is needed. Forms are sent encrypted and you get a privacy policy to match your site.',
    },
    {
      q: 'What does a change cost after launch?',
      a: 'Small changes (text, photo, opening hours) are included in Plus and Premium maintenance. Without a maintenance plan you pay a fixed price per change — agreed up front, not by the hour.',
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

export const footer = {
  cta: 'Fancy getting started?',
  kvkLabel: 'Dutch Chamber of Commerce',
  kvk: '89874994',
  btwLabel: 'VAT ID',
  btw: '{BTW}',
  privacyLink: 'Privacy policy',
  rights: `© ${new Date().getFullYear()} ${site.legalName}`,
} as const;

/* --------------------------- Privacy-pagina ------------------------- */

export const privacy = {
  title: 'Privacy policy',
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
