/**
 * English copy. Same keys as nl.ts (TypeScript enforces it via Widen).
 *
 * Rules, same as Dutch:
 * - No em or en dashes in visible text. Full stop, comma, colon or
 *   brackets. content.test.ts guards this.
 * - Numbers (price, days, hours) come from offer.ts, never typed in.
 * - {naam} is replaced by the business name in the demo.
 *
 * Written by Claude: native review before launch.
 */
import { site } from '../site';
import { offer } from '../offer';
import { eur } from '../../lib/format';
import type { Widen } from './types';
import type { nl } from './nl';

const PRICE = eur(offer.price, 'en');
const DAYS = offer.deliveryDays;
const HOURS = offer.responseHours;
const PLUS = eur(offer.care[0].monthly, 'en');
const VAT = `${Math.round(offer.vatRate * 100)}% VAT`;
const PRICE_INCL = eur(Math.round(offer.price * (1 + offer.vatRate)), 'en');

const meta = {
  title: `A website for ${PRICE}, all in | Scott Prins`,
  description: `Under your website, there’s a better one. I build it for ${PRICE}: an original design, fluid motion and fast on every phone. Live within ${DAYS} working days. Web designer near Amsterdam.`,
  ogAlt: `Under your website, there’s a better one. Scott Prins builds it for ${PRICE}.`,
};

const nav = {
  home: 'Scott Prins, back to top',
  label: 'Main menu',
  links: [
    { label: 'The demo', href: '#upgrade' },
    { label: 'Price', href: '#prijs' },
    { label: 'How it works', href: '#werkwijze' },
    { label: 'Questions', href: '#vragen' },
  ],
  cta: 'Claim your site',
  menu: 'Menu',
  close: 'Close',
  skip: 'Skip to content',
  langLabel: 'Language',
  langSwitchTo: 'Schakel naar Nederlands',
};

const hero = {
  titleStart: 'Under your website, there’s a',
  titleAccent: 'better',
  titleEnd: 'one.',
  lead: `I bring it to the surface. An original design, fluid motion and fast on every phone. For ${PRICE}, live within ${DAYS} working days.`,
  cta: `Claim your site for ${PRICE}`,
  ctaWhy: `Why only ${PRICE}?`,
};

const device = {
  regionLabel: 'Interactive demo: from an old website to a new one',
  tablistLabel: 'Pick your trade',
  nameLabel: 'Your business name',
  namePlaceholder: 'Type your business name',
  hintFine: 'Press and hold to upgrade',
  hintCoarse: 'Hold your thumb on the site',
  hintLonger: 'Hold a little longer',
  upgrade: 'Upgrade',
  reset: 'Back to the old one',
  revealedBefore: 'This is',
  revealedAfter: `For ${PRICE}.`,
  openFull: 'Open as a real site',
  claim: 'Claim this site',
  srDescription:
    'On top is a dated website, underneath is a new version of the same business. Press and hold the site, or use the Upgrade button, to show the new version. Use the tabs to pick a trade and the text field to type the name of your own business.',
  srRevealed: 'The new version is showing.',
  srReset: 'The old version is showing again.',
  beforeTag: 'What the average site looks like',
  afterTag: 'What it could look like',
};

/* Copy per trade. `before` is the dated site (deliberately so), `after`
   the new one. Every business here is a made-up example. */
const trades = {
  bakker: {
    tab: 'Bakery',
    before: {
      tagline: 'Your baker for fresh bread and pastries!',
      nav: 'Our range',
      p1: '{naam} is a family business. Come to us for fresh bread, pastries and cakes for every occasion.',
      p2: 'We stand for quality and service. Feel free to drop by our shop!',
      news: 'NEW: now also open on Sundays!!',
      caption: 'Our shop',
    },
    after: {
      nav: ['Bread', 'Cakes', 'Order'],
      navCta: 'Order for tomorrow',
      eyebrow: 'Artisan bakery',
      titleStart: 'Bread you can',
      titleAccent: 'smell',
      titleEnd: 'before you walk in.',
      sub: 'Baked every night in our own oven. Order before 8 pm and pick it up fresh tomorrow.',
      cta: 'Order for tomorrow',
      cta2: 'See what we bake',
      facts: ['Every morning from 7:00', 'Our own oven, our own dough', 'Order online too'],
      alt: 'Fresh bread on a wooden board',
    },
  },
  kapper: {
    tab: 'Hair salon',
    before: {
      tagline: 'For all your hair needs',
      nav: 'Price list',
      p1: '{naam} has been a local favourite for years. We cut hair for women, men and children.',
      p2: 'You can book an appointment by phone during opening hours.',
      news: 'Want an appointment? Call us during opening hours!',
      caption: 'Our salon',
    },
    after: {
      nav: ['Treatments', 'Team', 'Prices'],
      navCta: 'Book your appointment',
      eyebrow: 'Hair and styling',
      titleStart: 'Hair that',
      titleAccent: 'suits',
      titleEnd: 'you.',
      sub: 'Cuts, colour and styling, with time to listen first. Book online yourself, evenings too.',
      cta: 'Book your appointment',
      cta2: 'See the prices',
      facts: ['Book online, evenings too', 'Colour and balayage', 'Reminder by text message'],
      alt: 'Scissors hanging on a wooden wall',
    },
  },
  restaurant: {
    tab: 'Restaurant',
    before: {
      tagline: 'Relaxed dining in a cosy atmosphere',
      nav: 'Menu (PDF)',
      p1: 'Welcome to {naam}! We serve delicious dishes every day in a cosy setting.',
      p2: 'Reservations by phone or email.',
      news: 'Download our menu here (PDF, 4.2 MB)',
      caption: 'Our restaurant',
    },
    after: {
      nav: ['Menu', 'Book', 'Contact'],
      navCta: 'Book a table',
      eyebrow: 'Seasonal kitchen',
      titleStart: 'Table for two?',
      titleAccent: 'Tonight.',
      titleEnd: '',
      sub: 'A seasonal menu, natural wine and a kitchen that stays open until 10 pm. Booking takes twenty seconds.',
      cta: 'Book a table',
      cta2: 'See the menu',
      facts: ['Wed to Sun from 5 pm', 'Seasonal menu', 'Groups up to 20'],
      alt: 'Pasta and red wine by candlelight',
    },
  },
  bouw: {
    tab: 'Builder',
    before: {
      tagline: 'For all your building and renovation work',
      nav: 'Services',
      p1: '{naam} is your partner for new builds, renovations and maintenance. We work with skilled staff.',
      p2: 'Feel free to contact us for a no-obligation quote.',
      news: 'See our projects on Facebook too!',
      caption: 'At work',
    },
    after: {
      nav: ['Services', 'Projects', 'About'],
      navCta: 'Request a quote',
      eyebrow: 'Building and renovation',
      titleStart: 'We build.',
      titleAccent: 'You live.',
      titleEnd: '',
      sub: 'Extensions, renovations and new builds. One point of contact, a fixed price and a schedule that holds.',
      cta: 'Request a quote',
      cta2: 'See our projects',
      facts: ['Fixed price up front', 'Our own craftspeople', 'One point of contact'],
      alt: 'Tools on a wooden workbench',
    },
  },
  praktijk: {
    tab: 'Practice',
    before: {
      tagline: 'Your physiotherapy practice',
      nav: 'Treatments',
      p1: 'Welcome to the website of {naam}. Our practice specialises in all forms of physiotherapy.',
      p2: 'For an appointment, please call during opening hours. Don’t forget your insurance card!',
      news: 'Please note: changed opening hours during the holidays',
      caption: 'Our practice',
    },
    after: {
      nav: ['Treatments', 'Insurance', 'Team'],
      navCta: 'Book an appointment',
      eyebrow: 'Physio in your neighbourhood',
      titleStart: 'Move without pain',
      titleAccent: 'again.',
      titleEnd: '',
      sub: 'Personal treatment, a short waiting list and exercises you actually do at home. No referral needed.',
      cta: 'Book an appointment',
      cta2: 'What does insurance cover?',
      facts: ['No referral needed', 'Intake online beforehand', 'Evening appointments'],
      alt: 'A bonsai on a table in a calm room',
    },
  },
  sport: {
    tab: 'Gym',
    before: {
      tagline: 'Sport and fitness for everyone!',
      nav: 'Class timetable',
      p1: '{naam} offers fitness and group classes for young and old.',
      p2: 'Drop by for a tour or ask about our rates at the front desk.',
      news: 'Offer: FREE registration!!',
      caption: 'Our gym',
    },
    after: {
      nav: ['Classes', 'Timetable', 'Membership'],
      navCta: 'Free trial class',
      eyebrow: 'Training in small groups',
      titleStart: 'Stronger than',
      titleAccent: 'yesterday.',
      titleEnd: '',
      sub: 'Small groups, real coaching and a timetable that fits around your work. Your first class is free.',
      cta: 'Book a free trial class',
      cta2: 'See the timetable',
      facts: ['Small groups', 'Open from 6:00', 'First class free'],
      alt: 'Close-up of a weight plate',
    },
  },
};

/* Shared bits of the dated example site. */
const oldSite = {
  nav: ['Home', 'About us', 'Contact'],
  welcome: 'Welcome to the website of {naam}!',
  link: 'Click here for our opening hours',
  footer: '© 2014 {naam} | All rights reserved | Last updated: 12-03-2017',
  visitors: 'Visitors:',
  hours: 'Opening hours',
  hoursRows: [
    ['Mon', 'closed'],
    ['Tue to Fri', '8:30 - 17:30'],
    ['Sat', '8:00 - 16:00'],
  ],
};

const vijftig = {
  label: 'First impression',
  title: 'You get 50 milliseconds.',
  hud: '2 × 50 ms',
  intro: 'Two websites, 50 milliseconds each. Watch the cross and pick the business you would call.',
  play: 'Start the test',
  compare: 'Put them side by side',
  ask: 'Which business would you call?',
  site: 'Site',
  old: 'old',
  new: 'new',
  picked: 'your pick',
  pickedNew: 'You picked the new one without reading a word. Your customers decide just as fast.',
  pickedOld: 'You picked the old one. Take a calm look at them side by side: which one suits your business?',
  reducedVerdict: 'That is how short 50 milliseconds is: three frames on your screen. Which of these two would you call?',
  flashReduced: 'That is how short 50 milliseconds is: three frames on your screen.',
  replay: 'Once more',
  claim: 'Claim the new one',
  body: [
    'That is how fast a visitor judges your website, before a single word is read. And that first judgement colours everything after it.',
    'Anyone who drops off then clicks back to Google. To the next name on the list.',
  ],
  punch: 'Your competitor gets the same 50 milliseconds. The difference is what’s on the screen.',
  source: 'Source: Lindgaard et al., Behaviour & Information Technology, 2006',
  sourceHref: 'https://doi.org/10.1080/01449290500330448',
};

const included = {
  label: 'What you get',
  title: 'Everything you see here, you get too.',
  lead: 'Not a template kit with your logo on it. A site that shows what your business is worth from the very first second.',
  items: [
    {
      term: 'An original design',
      text: 'Not a template your competitor also uses. Your colours, your images, your voice.',
    },
    {
      term: 'Motion that fits',
      text: 'Smooth scrolling, text that glides in and details that respond to your visitor. As much as suits your business, and never in the way.',
    },
    {
      term: 'Fast, even on 4G',
      text: 'No bloated site builders. Your site loads quickly, even outdoors on a phone.',
    },
    {
      term: 'Designed for thumbs',
      text: 'Not a shrunken desktop site, but a site that starts on the phone.',
    },
    {
      term: 'Getting found',
      text: 'A clean foundation for Google: good titles and descriptions, structured data and a fast site.',
    },
    {
      term: 'Contact without friction',
      text: 'A form that actually arrives, a WhatsApp button and your number one tap away.',
    },
    {
      term: 'Copy sorted',
      text: 'No time to write? In a half-hour conversation you tell me about your business, and I turn it into the copy.',
    },
    {
      term: 'Domain and launch',
      text: 'I connect your domain and put everything live. You don’t have to do anything technical.',
    },
  ],
};

const price = {
  label: 'The price',
  question: 'What does a site like this cost?',
  once: 'One-off. Everything included. After that, it’s yours.',
  compareLabel: 'Compare it',
  compare: [
    { who: 'An agency', what: 'Often thousands of euros, and weeks of waiting.', mine: false },
    { who: 'A site builder', what: 'A monthly fee forever, and you look like everyone else.', mine: false },
    { who: 'Scott Prins', what: `${PRICE} one-off. Live within ${DAYS} working days.`, mine: true },
  ],
  includedLabel: 'Included',
  included: [
    'One page, everything on it',
    'Original design',
    'Motion and animation',
    'Mobile and fast',
    'Foundation for Google',
    'Copy after one phone call',
    'Domain connected',
    'Hosting',
    `${offer.revisionRounds} rounds of changes`,
  ],
  whyTitle: `Why only ${PRICE}?`,
  why: [
    'Because I don’t build every site from scratch. I work with my own system of designs and animations, and tailor it to each client.',
    'And I work with modern AI tooling. What AI does not do: think about your business, make the calls and guard the quality. That’s me.',
  ],
  terms: `Price excludes ${VAT} (${PRICE_INCL} including VAT). For businesses only. Half at the start, half on delivery.`,
  care: `No subscription needed. Want me to look after your site? From ${PLUS} a month, cancel any month.`,
  cta: `Claim your site for ${PRICE}`,
};

const process = {
  label: 'How it works',
  title: `From request to live in ${DAYS} working days.`,
  steps: [
    {
      title: 'Your request',
      when: 'Today',
      text: 'You fill in the order slip below. Two minutes of work, and you pay nothing yet.',
    },
    {
      title: 'Your sample page',
      when: `Within ${HOURS} hours`,
      text: 'You see the top of your new site, with your name and colours. Free. Don’t like it? Then it ends here.',
    },
    {
      title: 'Go-ahead and a call',
      when: 'Day 1',
      text: 'You pay the first half. Half an hour on the phone: what do you sell, to whom, and what should your site achieve?',
    },
    {
      title: 'Build and refine',
      when: 'Day 2 to 4',
      text: `I build your site. You follow along and steer, in ${offer.revisionRounds} rounds.`,
    },
    {
      title: 'Live',
      when: `Day ${DAYS}`,
      text: 'Your site is online and your domain is connected. Only then do you pay the second half.',
    },
  ],
  note: `The ${DAYS} working days count from the moment your material is in: your copy (or our call), photos and logo.`,
};

const about = {
  label: 'About me',
  title: 'I’m Scott.',
  paragraphs: [
    'I build websites from Badhoevedorp, near Amsterdam, for business owners who would rather practise their craft than wrestle with a site builder.',
    `You have one point of contact: me, the person who builds it. You message or call me directly and hear back within ${HOURS} hours.`,
  ],
  photoAlt: 'Portrait of Scott Prins',
  stats: [
    { value: '25+', label: 'sites and web apps built, own projects included' },
    { value: `${DAYS} working days`, label: 'from your material to live' },
    { value: `< ${HOURS} hrs`, label: 'response time' },
  ],
  proofLabel: 'Click through it yourself',
  proof: [
    {
      name: 'modernpitching.nl',
      text: 'The site of my own coaching business. Twelve pages, two languages and its own app area.',
      href: 'https://modernpitching.nl',
    },
    {
      name: 'scottprins.nl',
      text: 'The site you are on right now. Including that thing at the top.',
      href: '#upgrade',
    },
  ],
  newTab: 'opens in a new tab',
  whatsapp: 'Message me on WhatsApp',
};

const faq = {
  label: 'Questions',
  title: 'Good questions.',
  items: [
    {
      q: 'How can this be so affordable?',
      a: 'I work with my own system of designs and animations and with modern AI tooling, so I don’t have to build every site from scratch. You pay for the custom work, not for reinventing the wheel.',
    },
    {
      q: 'Is there a subscription attached?',
      a: `No. You pay ${PRICE} once and hosting is included. The only thing you pay yourself is your domain name, usually around €10 a year. Want me to look after your site? That starts at ${PLUS} a month, cancel any month.`,
    },
    {
      q: 'How many pages do I get?',
      a: 'One long, flowing page with everything on it: what you do, for whom, your offer or prices, who you are and how to reach you. For most small businesses that is exactly right. If you really need more pages, you hear the price up front.',
    },
    {
      q: 'I don’t have good copy or photos. Can we still do this?',
      a: 'Yes, and that is the rule rather than the exception. I write the copy from one half-hour phone call: you tell me about your business, I turn it into the page, you read it through. Photos from a modern phone are often good enough; otherwise I find decent royalty-free images or recommend a photographer near you.',
    },
    {
      q: 'How quickly am I live?',
      a: `Within ${DAYS} working days, counted from the moment your copy (or our call), photos and logo are in.`,
    },
    {
      q: 'What if I don’t like it?',
      a: `That’s why you start with a free sample page. If you don’t like it, it ends there and you pay nothing. If you go ahead, you still have ${offer.revisionRounds} rounds to steer before the site goes live.`,
    },
    {
      q: 'I already have a site and a domain. What happens to them?',
      a: 'You keep your own domain name; we move it, so your shop sign and business cards stay correct. We move your email addresses over before the new site goes live, so you don’t miss any mail. And your place in Google comes along: every old address neatly redirects to the new page.',
    },
    {
      q: 'Who owns the domain and the website?',
      a: 'You do. The domain is registered in your name and the site is yours once it’s paid for. On request you get all the files and access. You’re not locked into anything.',
    },
    {
      q: 'Can a web shop, a booking calendar or something else be added later?',
      a: `Yes. Anything outside the ${PRICE} gets a fixed price up front. Extra work only exists if you want something extra, and you hear the price for that up front too.`,
    },
    {
      q: 'Why don’t I see any clients or reviews on this site?',
      a: 'Because I have only just started as a web designer and I am not going to invent quotes. What I do have: this site, with a demo you can try yourself, and modernpitching.nl, my own company’s site, which I built from front to back. Click through it; that says more than a wall of logos.',
    },
    {
      q: 'What about GDPR and privacy?',
      a: 'By default I build without tracking cookies, so usually no cookie banner is needed. If you want statistics or a Google map, we check together whether a notice is needed; cookieless statistics are an option too. Forms are sent encrypted and you get a suitable privacy statement with your site.',
    },
  ],
};

const order = {
  label: 'Order',
  titleStart: 'Your competitor could have this site next week.',
  titleAccent: 'Or you could.',
  lead: `Fill in the slip. Within ${HOURS} hours you have your free sample page, and you only pay once you like it.`,
  points: [`Free sample page within ${HOURS} hours`, 'You only pay after approval', 'Rather call or message? Also fine.'],
  slip: {
    heading: 'Order slip',
    dateLabel: 'Date',
    qtyLine: 'Custom website',
    forLabel: 'for',
    yourBusiness: 'your business',
    detail: 'One page with design, motion, copy, Google foundation, domain and hosting',
    roundsLine: 'rounds of changes',
    sampleLine: 'Sample page',
    included: 'included',
    free: 'free',
    totalLabel: 'Due now',
    totalNote: 'You only pay after approving your sample page.',
    exVat: `excl. ${VAT}`,
  },
  fields: {
    name: 'Your name',
    email: 'Email address',
    phone: 'Phone',
    company: 'Business name',
    trade: 'Trade',
    message: 'Anything else I should know?',
    optional: 'optional',
  },
  tradeOther: 'Something else',
  submit: 'Request my free sample page',
  sending: 'Sending your slip…',
  privacy: 'I only use your details to answer your request.',
  privacyLink: 'Privacy statement',
  success: {
    title: 'Slip received.',
    text: `You’ll hear from me within ${HOURS} hours. In a hurry? Just message me.`,
  },
  errors: {
    name: 'Please fill in your name.',
    email: 'Please enter a valid email address.',
    generic: 'Sending didn’t work. Send your slip via WhatsApp or email instead; everything is already filled in.',
  },
  whatsapp: 'Send via WhatsApp',
  mail: 'Send via email',
  previewNote: 'This is a preview of the site: sending works via WhatsApp or email here. Everything is already filled in.',
  mailSubject: 'Order slip via scottprins.nl',
  messageIntro: 'Hi Scott, I’d like a free sample page.',
};

const footer = {
  closer: 'Under your website, there’s a better one.',
  closerCta: 'Bring it to the surface',
  contactLabel: 'Contact',
  phoneLabel: 'Call or message',
  emailLabel: 'Email',
  addressLabel: 'Address',
  addressNote: 'Not a visiting address. I work online only: by phone, WhatsApp and email.',
  detailsLabel: 'Details',
  kvkLabel: 'Chamber of Commerce',
  kvk: '89874994',
  btwLabel: 'VAT ID',
  btw: '{BTW}',
  privacyLink: 'Privacy statement',
  termsLink: 'Terms and conditions',
  rights: `© ${new Date().getFullYear()} ${site.legalName}`,
  timer: 'You’ve been here for {tijd}. Time enough for {aantal} first impressions.',
  credits: 'Photos in the demos: StockSnap (CC0).',
};

const sticky = {
  price: PRICE,
  cta: 'Claim your site',
};

const voorbeeld = {
  back: 'Back to scottprins.nl',
  badge: 'Example site',
  note: `This is an example of what you get for ${PRICE}.`,
  claim: 'Claim this site',
  titleSuffix: 'example site by Scott Prins',
};

export const en: Widen<typeof nl> = {
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
};
