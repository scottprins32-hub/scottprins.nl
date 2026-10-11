/**
 * Juridische teksten (en). Bewust los van en.ts: deze twee blokken
 * worden alleen door /en/privacy en /en/voorwaarden gebruikt, en die
 * renderen server-side.
 *
 * Written by Claude from the Dutch version: native review before launch.
 * The Dutch version is the binding one.
 */
import { site } from '../site';
import { offer } from '../offer';
import { eur } from '../../lib/format';

const PRICE = eur(offer.price, 'en');
const DAYS = offer.deliveryDays;
const PLUS = eur(offer.care[0].monthly, 'en');
const PREMIUM = eur(offer.care[1].monthly, 'en');

const privacy = {
  title: 'Privacy statement',
  metaDescription: `Privacy statement for ${site.legalName}: what data the order slip processes, why, and what your rights are.`,
  updated: 'Last updated: October 2026',
  intro: `${site.legalName} (“I” below) builds websites for business owners. This page explains how I handle the personal data you share with me through ${site.url}. In short: I only process what you fill in yourself on the order slip, I use it only to answer your request, and I sell or share nothing with third parties for marketing.`,
  sections: [
    {
      title: 'What data do I process?',
      body: [
        'If you send the order slip, I process: your name, your email address, the name of your business and your trade, and, if you fill them in, your phone number and your message.',
        'If you type your business name into the demo at the top, it stays in your own browser. It does not go to me or to any server until you send the order slip yourself.',
        'This website uses no tracking cookies and no analytics. So there is no cookie banner either.',
      ],
    },
    {
      title: 'What do I use your data for?',
      body: [
        'Only to answer your request: I make your free sample page and get in touch by email, phone or WhatsApp, depending on what you filled in.',
        'The legal basis for this is taking steps at your request before entering into a contract (art. 6(1)(b) GDPR): you ask for a sample page, I deliver it.',
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
        'Only me. On the technical side I work with two processors: Vercel (hosting of this website) and Resend (delivering the order slip to my mailbox). Data processing terms under the GDPR are in place with both.',
        'If you send your slip via WhatsApp or email, your data goes through that service, and the terms of WhatsApp or your email provider apply as well.',
        'I never sell data and I share nothing with third parties for marketing purposes.',
      ],
    },
    {
      title: 'Your rights',
      body: [
        'You can always view your data, have it corrected or have it deleted. You can also object to processing or ask for your data to be transferred (data portability).',
        `Email ${site.email} for that. I reply within a few working days, at the latest within the legal term of one month.`,
        'Not happy with how I handle your data? You can file a complaint with the Dutch data protection authority, the Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).',
      ],
    },
    {
      title: 'Security',
      body: [
        'This site runs entirely over an encrypted connection (HTTPS). Form data is sent encrypted and kept only in my secured mailbox.',
      ],
    },
    {
      title: 'Contact',
      body: [
        `${site.legalName}, Chamber of Commerce 89874994, ${site.email}.`,
        'Questions about this privacy statement? Feel free to email or message me.',
      ],
    },
  ],
  backLink: 'Back to the site',
} as const;

const voorwaarden = {
  title: 'Terms and conditions',
  updated: 'Version October 2026',
  metaDescription: `Terms and conditions of ${site.legalName}, in plain language: how a project starts, what you get for ${PRICE}, how payment works and what happens afterwards.`,
  intro: `No small print: these are the terms I work under, in plain language. They apply to everything you buy from ${site.legalName} (Chamber of Commerce 89874994). Something unclear? Email or message me and we put it in writing before we start. The Dutch version of these terms is the binding one.`,
  sections: [
    {
      title: 'How a project starts',
      body: [
        'My offer is for business clients: business owners, practices and associations. You request a free sample page through the order slip on this site, or we talk by email, phone or WhatsApp. If you like the sample page, you get a confirmation with the fixed price. All prices exclude 21% VAT.',
        'That confirmation is valid for 30 days. If you say yes in writing (an email or a message counts), that is the starting signal and these terms apply. If you say no or I don’t hear back, you pay nothing, not even for the sample page.',
      ],
    },
    {
      title: `What you get for ${PRICE}`,
      body: [
        'A custom website on one page: an original design with motion, made for phone and desktop, a clean foundation for Google, copy based on a conversation, connecting your domain, the launch and hosting. Exactly what goes on it is set out in the confirmation.',
        `Your site is live within ${DAYS} working days, counted from the moment all your material is in (copy or our call, photos, logo and access). If that unexpectedly doesn’t work out, you hear about it straight away, with a new date.`,
        `Before launch we look at the result together. ${offer.revisionRounds} rounds of changes are included in the price. After that, changes fall under maintenance or extra work, and you always hear the fixed price up front.`,
      ],
    },
    {
      title: 'Payment',
      body: [
        'You pay in two halves. I send the first invoice after your go-ahead; then the build starts. The second invoice follows at launch. Both invoices have a payment term of 14 days.',
        'If you pay late, I first send an ordinary reminder. If payment still doesn’t come, statutory interest and collection costs apply.',
        'If after your go-ahead you supply no material for more than three months, despite a reminder, I may finish the project based on what is there; the first half then remains due.',
      ],
    },
    {
      title: 'Hosting',
      body: [
        'Hosting is included in the price, with no monthly fee. I put your site with a reliable hosting provider and keep an eye on the technical side.',
        'That applies to the site as I delivered it. If something is added later with its own running costs, such as a web shop or a booking system, you hear about it up front.',
        'If I ever stop hosting, you hear about it at least three months in advance and I move your site free of charge to a provider of your choice.',
      ],
    },
    {
      title: 'Maintenance, if you want it',
      body: [
        `After launch you need nothing: no subscription and no monthly fee. If you want me to look after your site, that starts at ${PLUS} a month: your changes made every month, plus a short report. For ${PREMIUM} a month, small changes are unlimited and you always get priority.`,
        'You cancel maintenance by email or message; it stops at the end of the current month. There is no minimum term.',
        'Without maintenance you can always hire me for a change. You hear the price up front.',
      ],
    },
    {
      title: 'Your material',
      body: [
        'You supply the copy, photos and other content, or we agree that I help with that. You guarantee that the material may be used: so no photos or text from someone else without permission.',
        'I handle personal data as described in the privacy statement. If your site processes data of your customers, for example through a contact form, I do that only on your instructions and we record it in a short data processing agreement.',
      ],
    },
    {
      title: 'Who owns the site?',
      body: [
        'The domain is registered in your name, so it is yours from day one; you pay the registration yourself, usually around €10 a year. The site itself (the design, the copy, the code and the structure) is entirely yours once it is paid in full. On request I confirm that transfer with a signed document. Open-source components stay under their own licence; that is normal and costs you nothing.',
        'I may show the site in my portfolio and refer to it in my own communication, unless you tell me you would rather I didn’t.',
      ],
    },
    {
      title: 'If something goes wrong',
      body: [
        'I work carefully and use reliable providers for hosting and email, but nobody can promise 100% uptime. If there is an outage, I get to work on it straight away.',
        'If despite everything something goes wrong and you suffer damage, my liability is limited to the amount of the project, plus what you paid in maintenance in the three months before. Indirect damage, such as lost revenue, is excluded. None of this limits liability that cannot be limited by law.',
      ],
    },
    {
      title: 'Finally',
      body: [
        'Dutch law applies to our agreements. If I change these terms, the version you agreed to stays in force for a running project. For maintenance you hear about a change at least a month in advance; if you don’t agree, you simply cancel.',
        `Questions? Email ${site.email} or send a message.`,
      ],
    },
  ],
  backLink: 'Back to the site',
} as const;

export const enLegal = { privacy, voorwaarden } as const;
