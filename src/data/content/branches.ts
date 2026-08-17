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
 * `preset` verwijst naar een preset in pricing.ts, zodat de prijs en de
 * voorgeselecteerde configuratie nooit uit de pas lopen met de rest.
 */
import type { AddonId, PresetId } from '../pricing';

/**
 * De demo's die een branchepagina kan tonen. Bewust een korte union en niet
 * `AddonId`: BranchePage.astro importeert alleen déze componenten, en elke
 * import sleept het bijbehorende script mee de pagina in. Heeft een nieuwe
 * branche een andere demo nodig, breid dan deze union én het register in
 * BranchePage.astro uit — TypeScript dwingt af dat je dat allebei doet.
 */
export type BrancheDemoId = Extract<AddonId, 'agenda' | 'intake' | 'portaal'>;

export interface Branche {
  /**
   * URL-segment, zonder slashes. In beide talen hetzelfde: het is een
   * Nederlandse zoekterm, en zo blijven de hreflang-paren één-op-één.
   */
  slug: string;
  preset: PresetId;
  /** Welke drie demo-secties van de menukaart hier het meest toe doen. */
  demos: BrancheDemoId[];
  /** Korte linktekst, gebruikt in de snelstart-rij van de configurator. */
  linkLabel: string;
  meta: { title: string; description: string };
  eyebrow: string;
  h1: string;
  intro: string;
  /** De herkenbare dagelijkse ergernissen — geen features. */
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

export const branchesNl: Branche[] = [
  {
    slug: 'website-laten-maken-fysiotherapie',
    preset: 'praktijk',
    demos: ['agenda', 'intake', 'portaal'],
    linkLabel: 'Alles over een fysiosite',
    meta: {
      title: 'Website laten maken voor je fysiopraktijk — vanaf € 995',
      description:
        'Een praktijksite waarin patiënten zelf plannen en de intake al binnen is voor ze binnenlopen. Vaste prijs, live in 5 werkdagen. Webdesigner uit Badhoevedorp.',
    },
    eyebrow: 'Voor fysiotherapie- en behandelpraktijken',
    h1: 'Een praktijksite waarin patiënten zelf plannen.',
    intro:
      'De meeste praktijksites zijn een digitaal visitekaartje: openingstijden, een routebeschrijving en een telefoonnummer. Alles wat daarna komt — plannen, verzetten, intakes, vragen over vergoedingen — belandt alsnog bij de balie of op jouw voicemail. Dat kan anders, en het hoeft geen praktijksoftware van duizenden euro’s te zijn.',
    painTitle: 'Herkenbaar?',
    pain: [
      'De telefoon gaat tijdens een behandeling, en je patiënt op de bank hoort mee.',
      'Nieuwe patiënten vullen hun intake in de wachtkamer in, op papier, met een pen die het half doet.',
      'Iemand wil verzetten en dat kost drie keer heen en weer bellen.',
      'De vraag "wordt dit vergoed?" beantwoord je elke week opnieuw.',
      'No-shows: het uur is weg en je kunt niemand meer inplannen.',
    ],
    bodyTitle: 'Wat ik daarvoor bouw',
    body: [
      'Een site waarop patiënten zelf een afspraak inplannen, ook om elf uur ’s avonds. Jij bepaalt welke behandelingen op welke dagen open staan en hoe lang ze duren; de rest gaat vanzelf. Wie verzet of annuleert doet dat via de link in zijn bevestiging, zonder jou te storen.',
      'De intake staat klaar vóór het eerste consult. Klachtomschrijving, verwijzing, verzekering, eerdere behandelingen: allemaal ingevuld in stappen, thuis, op de telefoon. Jij begint het gesprek dus voorbereid in plaats van met een leeg formulier.',
      'En achter een eigen inlog kan een patiënt zijn oefeningen, afspraken en documenten terugvinden. Dat scheelt niet alleen mailtjes met bijlagen, het is ook een reden om terug te komen naar jouw site in plaats van naar een zoekmachine.',
      'Wat ik níet doe: jouw dossiersysteem vervangen. Dit is de laag ervoor — de plek waar de patiënt binnenkomt, plant en zijn gegevens achterlaat.',
    ],
    demoTitle: 'Probeer het hieronder',
    demoLead:
      'Dit zijn geen screenshots. De drie onderdelen die voor een praktijk het meest uitmaken staan hier live. Probeer ze gerust.',
    priceTitle: 'Wat kost zo’n praktijksite?',
    priceLead:
      'Deze samenstelling — het pakket Interactief met de agenda, de digitale intake, het klantenportaal en sms-herinneringen — staat hieronder al voor je klaar. Verander gerust wat je niet nodig hebt; de prijs rekent live mee.',
    ctaTitle: 'Zelf zien hoe het voor jouw praktijk wordt?',
    ctaLead:
      'Vertel me kort over je praktijk. Binnen 48 uur heb je een vaste prijs én een gratis proefpagina met jouw naam, kleuren en teksten erin.',
    ctaButton: 'Stel je praktijksite samen',
    backLink: '← Naar de hele menukaart',
  },
];

export const branchesEn: Branche[] = [
  {
    slug: 'website-laten-maken-fysiotherapie',
    preset: 'praktijk',
    demos: ['agenda', 'intake', 'portaal'],
    linkLabel: 'All about a practice site',
    meta: {
      title: 'A website for your physiotherapy practice — from €995',
      description:
        'A practice site where patients book themselves and the intake is in before they walk through the door. Fixed price, live in 5 working days.',
    },
    eyebrow: 'For physiotherapy and treatment practices',
    h1: 'A practice site where patients book themselves.',
    intro:
      'Most practice websites are a digital business card: opening hours, directions and a phone number. Everything after that — booking, rescheduling, intake forms, questions about reimbursement — still lands at the front desk or on your voicemail. It can work differently, and it does not need practice software costing thousands.',
    painTitle: 'Sound familiar?',
    pain: [
      'The phone rings during a treatment, and the patient on the table hears every word.',
      'New patients fill in their intake in the waiting room, on paper, with a pen that half works.',
      'Someone wants to reschedule and it takes three calls back and forth.',
      'You answer “is this reimbursed?” again every single week.',
      'No-shows: the hour is gone and you cannot fill it any more.',
    ],
    bodyTitle: 'What I build for that',
    body: [
      'A site where patients book their own appointment, including at eleven at night. You decide which treatments are open on which days and how long they take; the rest runs itself. Anyone rescheduling or cancelling does so through the link in their confirmation, without disturbing you.',
      'The intake is done before the first consultation. Complaint description, referral, insurance, previous treatment: filled in step by step, at home, on their phone. So you start the conversation prepared instead of with a blank form.',
      'And behind their own login a patient finds their exercises, appointments and documents. That saves emails with attachments, and it gives them a reason to come back to your site rather than to a search engine.',
      'What I do not do: replace your patient record system. This is the layer in front of it — where the patient arrives, books and leaves their details.',
    ],
    demoTitle: 'Try it below',
    demoLead:
      'These are not screenshots. The three parts that matter most for a practice are live right here. Try them for yourself.',
    priceTitle: 'What does a practice site like this cost?',
    priceLead:
      'This build — the Interactive package with booking, the digital intake, the customer portal and SMS reminders — is already loaded for you below. Change whatever you do not need; the price recalculates live.',
    ctaTitle: 'Want to see how it would look for your practice?',
    ctaLead:
      'Tell me briefly about your practice. Within 48 hours you have a fixed price and a free sample page with your name, colours and copy in it.',
    ctaButton: 'Build your practice site',
    backLink: '← To the full menu',
  },
];

export function branches(locale: 'nl' | 'en'): Branche[] {
  return locale === 'en' ? branchesEn : branchesNl;
}
