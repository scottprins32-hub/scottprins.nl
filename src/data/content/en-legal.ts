/**
 * Juridische teksten (en). Bewust los van en.ts: deze twee blokken
 * worden alleen door /privacy en /voorwaarden gebruikt, en die renderen
 * server-side. Zaten ze in de taalbundel, dan downloadde elke bezoeker de
 * volledige privacyverklaring en algemene voorwaarden in tweevoud mee.
 */
import { site } from '../site';

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
        `${site.legalName} · Dutch Chamber of Commerce 89874994 · ${site.email}`,
        'Questions about this privacy policy? Just email or message me.',
      ],
    },
  ],
  backLink: '← Back to the site',
} as const;

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

export const enLegal = { privacy, voorwaarden } as const;
