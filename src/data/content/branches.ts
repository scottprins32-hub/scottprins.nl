/**
 * Branchepagina's: één landingspagina per vak, met eigen tekst.
 *
 * Waarom apart en niet in nl.ts/en.ts: dit zijn losse routes en dus losse
 * paginabundels. Zo groeit de taalbundel van de homepage niet mee met elke
 * branche die erbij komt.
 *
 * Belangrijk: elke pagina moet écht andere tekst hebben. Vijf pagina's met
 * één uitgewisseld woord zijn doorway pages en daar rekent Google op af.
 * Vandaar: eerst deze ene, meten, en pas dan de volgende.
 *
 * `trade` kiest welk voorbeeld het upgrade-ding bovenaan laat zien.
 */
import type { TradeId } from '../trades';
import { offer } from '../offer';
import { eur } from '../../lib/format';

export interface Branche {
  /**
   * URL-segment, zonder slashes. In beide talen hetzelfde: het is een
   * Nederlandse zoekterm, en zo blijven de hreflang-paren één-op-één.
   */
  slug: string;
  trade: TradeId;
  meta: { title: string; description: string };
  eyebrow: string;
  h1: string;
  intro: string;
  /** De herkenbare dagelijkse ergernissen, geen features. */
  painTitle: string;
  pain: string[];
  bodyTitle: string;
  body: string[];
  demoTitle: string;
  demoLead: string;
  priceTitle: string;
  priceLead: string;
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
  backLink: string;
}

const PRIJS = eur(offer.price, 'nl');
const PRICE = eur(offer.price, 'en');

export const branchesNl: Branche[] = [
  {
    slug: 'website-laten-maken-fysiotherapie',
    trade: 'praktijk',
    meta: {
      title: `Website laten maken voor je fysiopraktijk voor ${PRIJS} | Scott Prins`,
      description: `Een praktijksite die vertrouwen geeft voordat iemand belt. Eigen ontwerp, snel op elke telefoon, binnen ${offer.deliveryDays} werkdagen live. ${PRIJS} eenmalig. Webdesigner uit Badhoevedorp.`,
    },
    eyebrow: 'Voor fysiotherapie- en behandelpraktijken',
    h1: 'Een praktijksite die vertrouwen geeft voordat iemand belt.',
    intro:
      'Iemand met rugpijn zoekt ’s avonds op de bank naar een fysiotherapeut in de buurt en opent drie sites. Eén ziet eruit alsof hij uit 2014 komt, één laadt niet op de telefoon, en één voelt rustig, duidelijk en verzorgd. Raad eens wie de volgende ochtend gebeld wordt.',
    painTitle: 'Herkenbaar?',
    pain: [
      'Je site is ooit gemaakt door een neef, een bureau of een bouwpakket, en sindsdien niet meer aangeraakt.',
      'Op de telefoon moet je inzoomen om het telefoonnummer te vinden.',
      'De vraag “wordt dit vergoed?” beantwoord je elke week opnieuw aan de telefoon.',
      'Nieuwe patiënten weten niet of ze een verwijzing nodig hebben, en bellen dus maar.',
      'Je praktijk is beter dan je site laat zien.',
    ],
    bodyTitle: 'Wat ik daarvoor bouw',
    body: [
      'Een rustige, verzorgde site die laat zien wie je bent en hoe je werkt. Eén pagina waar alles op staat: je behandelingen, je team, vergoedingen, openingstijden en hoe je een afspraak maakt.',
      'De vragen die je nu elke week aan de telefoon beantwoordt, staan er helder op: heb ik een verwijzing nodig, wordt het vergoed, hoe lang duurt een behandeling.',
      'Werk je al met een online agenda in je praktijksoftware? Dan zet ik de afspraakknop daar direct naartoe. Zo kiest een patiënt ook om elf uur ’s avonds nog een plek.',
      'Wat ik níet doe: je dossiersysteem vervangen of medische beloftes verzinnen. De teksten schrijf ik op basis van een gesprek met jou, en jij leest alles na voordat het live gaat.',
    ],
    demoTitle: 'Zo kan jouw praktijksite eruitzien',
    demoLead: 'Typ de naam van je praktijk en houd de site ingedrukt. Dit is het soort site dat je krijgt.',
    priceTitle: 'Wat kost een praktijksite?',
    priceLead: `${PRIJS} eenmalig, exclusief btw. Alles erin: ontwerp, motion, teksten, domein en hosting. Geen abonnement nodig.`,
    ctaTitle: 'Zelf zien hoe het voor jouw praktijk wordt?',
    ctaLead: `Vraag een gratis proefpagina aan. Binnen ${offer.responseHours} uur zie je de bovenkant van je nieuwe site, met de naam en kleuren van je praktijk. Bevalt hij niet, dan betaal je niets.`,
    ctaButton: 'Vraag je gratis proefpagina aan',
    backLink: 'Naar de homepage',
  },
];

export const branchesEn: Branche[] = [
  {
    slug: 'website-laten-maken-fysiotherapie',
    trade: 'praktijk',
    meta: {
      title: `A website for your physiotherapy practice for ${PRICE} | Scott Prins`,
      description: `A practice site that builds trust before anyone calls. Original design, fast on every phone, live within ${offer.deliveryDays} working days. ${PRICE} one-off. Web designer near Amsterdam.`,
    },
    eyebrow: 'For physiotherapy and treatment practices',
    h1: 'A practice site that builds trust before anyone calls.',
    intro:
      'Someone with back pain is on the sofa one evening, looking for a physiotherapist nearby, and opens three sites. One looks like it was made in 2014, one won’t load on the phone, and one feels calm, clear and well cared for. Guess who gets the call the next morning.',
    painTitle: 'Sound familiar?',
    pain: [
      'Your site was once made by a nephew, an agency or a site builder, and hasn’t been touched since.',
      'On a phone you have to zoom in to find the phone number.',
      'You answer “is this covered by insurance?” on the phone every single week.',
      'New patients don’t know whether they need a referral, so they just call.',
      'Your practice is better than your site shows.',
    ],
    bodyTitle: 'What I build for that',
    body: [
      'A calm, well-crafted site that shows who you are and how you work. One page with everything on it: your treatments, your team, insurance, opening hours and how to book.',
      'The questions you now answer on the phone every week are clearly on the page: do I need a referral, is it covered, how long does a treatment take.',
      'Already using an online calendar in your practice software? Then I point the booking button straight at it. That way a patient can still pick a slot at eleven at night.',
      'What I don’t do: replace your patient record system or make up medical promises. I write the copy from a conversation with you, and you read everything before it goes live.',
    ],
    demoTitle: 'What your practice site could look like',
    demoLead: 'Type the name of your practice and press and hold the site. This is the kind of site you get.',
    priceTitle: 'What does a practice site cost?',
    priceLead: `${PRICE} one-off, excluding VAT. Everything included: design, motion, copy, domain and hosting. No subscription needed.`,
    ctaTitle: 'Want to see how it would look for your practice?',
    ctaLead: `Request a free sample page. Within ${offer.responseHours} hours you see the top of your new site, with your practice’s name and colours. Don’t like it? Then you pay nothing.`,
    ctaButton: 'Request your free sample page',
    backLink: 'To the homepage',
  },
];

export function branches(locale: 'nl' | 'en'): Branche[] {
  return locale === 'en' ? branchesEn : branchesNl;
}
