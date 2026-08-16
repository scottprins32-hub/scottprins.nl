/**
 * POST /api/lead — de enige serverless route van de site.
 * Ontvangt het offerteformulier, herrekent de totalen server-side en
 * mailt de aanvraag via Resend naar Scott.
 *
 * Zonder RESEND_API_KEY antwoordt deze route 503; de client toont dan
 * de mailto:/WhatsApp-fallback. De site blijft dus altijd werken.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import { site } from '../../data/site';
import { calcTotals } from '../../lib/calc';
import { validateLead, type LeadPayload } from '../../lib/lead';
import { summarizeSelection } from '../../lib/quote';
import { eur, perMaand } from '../../lib/format';
import { nl } from '../../data/content/nl';

const TO_ADDRESS = 'scottprins32@gmail.com';
// Zonder geverifieerd domein staat Resend alleen dit afzenderadres toe.
// Na domein-verificatie (zie README) kun je dit wijzigen naar bijv. site@scottprins.nl.
const FROM_ADDRESS = 'Scott Prins Webdesign <onboarding@resend.dev>';

/* Simpele limiter per IP: vijf aanvragen per uur is ruim voor een mens en
   onbruikbaar voor een bot. In-memory, dus per serverless-instantie — genoeg
   om spam te temperen zonder een externe store. */
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const raam = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  raam.push(now);
  hits.set(ip, raam);
  return raam.length > 5;
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

/* Deze mail komt in Scotts eigen inbox, dus altijd Nederlands — ook als de
   bezoeker de Engelse site gebruikte. De taal van de bezoeker staat er wel
   bij, zodat hij weet in welke taal hij moet terugmailen. */
function emailText(lead: LeadPayload): string {
  return [
    'Nieuwe offerte-aanvraag via scottprins.nl',
    '',
    `Naam:     ${lead.name}`,
    `Bedrijf:  ${lead.company || '—'}`,
    `Telefoon: ${lead.phone || '—'}`,
    `E-mail:   ${lead.email}`,
    `Taal:     ${lead.locale === 'en' ? 'Engels — antwoord in het Engels' : 'Nederlands'}`,
    '',
    lead.message ? `Opmerking:\n${lead.message}\n` : '',
    summarizeSelection(lead.selection, 'nl'),
  ]
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');
}

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: 'invalid_json' });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return json(400, { ok: false, error: 'validation', fields: result.fields });
  }
  const lead = result.lead;

  // Honeypot ingevuld → spambot. Doe alsof alles gelukt is.
  if (lead.website !== '') {
    return json(200, { ok: true });
  }

  // getSecret leest runtime-omgeving (Vercel) én .env (lokaal): een key die
  // je later op Vercel toevoegt werkt direct, zonder rebuild.
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (rateLimited(ip)) return json(429, { ok: false, error: 'rate_limited' });

  const apiKey = getSecret('RESEND_API_KEY');
  if (!apiKey) {
    return json(503, { ok: false, error: 'email_not_configured' });
  }

  const totals = calcTotals(lead.selection);
  const baseName = nl.pricing.base[lead.selection.base]?.name ?? 'Onbekend';
  const bedrag = `${eur(totals.upfront, 'nl')} + ${eur(totals.monthly, 'nl')}${perMaand('nl')}`;
  const subject =
    lead.intent === 'selfcopy'
      ? `Prijslijst opgevraagd: ${baseName} — ${bedrag}`
      : lead.intent === 'call'
        ? `BELAFSPRAAK: ${lead.name || lead.email} — ${bedrag}`
        : `Aanvraag: ${baseName} + ${lead.selection.addons.length} opties — ${bedrag}`;

  /* De bezoeker krijgt zijn eigen samenstelling terug: bij een self-copy is
     dat het hele punt, en bij een gewone aanvraag is het een bevestiging. */
  const kopieTaal = lead.locale;
  const kopie = {
    from: FROM_ADDRESS,
    to: [lead.email],
    reply_to: TO_ADDRESS,
    subject:
      kopieTaal === 'en'
        ? `Your build via scottprins.nl — ${eur(totals.upfront, 'en')} + ${eur(totals.monthly, 'en')}${perMaand('en')}`
        : `Jouw samenstelling via scottprins.nl — ${bedrag}`,
    text: [
      summarizeSelection(lead.selection, kopieTaal),
      '',
      kopieTaal === 'en'
        ? `Questions? Call or message Scott on ${site.whatsappDisplay}.`
        : `Vragen? Bel of app Scott op ${site.whatsappDisplay}.`,
      lead.intent === 'selfcopy'
        ? ''
        : kopieTaal === 'en'
          ? 'Within 48 hours you get a fixed price and a free sample page for your business.'
          : 'Binnen 48 uur krijg je een vaste prijs en een gratis proefpagina voor jouw zaak.',
    ]
      .join('\n')
      .trim(),
  };

  try {
    const verstuur = (body: unknown) =>
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(8000),
      });

    /* De kopie naar de bezoeker mag de aanvraag nooit blokkeren: zolang het
       domein niet in Resend geverifieerd is, weigert die tweede mail. */
    if (lead.intent !== 'call') void verstuur(kopie).catch(() => {});

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      /* Zonder timeout blijft de functie hangen als Resend traag is en ziet
         de bezoeker een spinner die nooit stopt. De catch geeft dan 502 en
         de client toont de mailto-fallback. */
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        reply_to: lead.email,
        subject,
        text: emailText(lead),
      }),
    });

    if (!res.ok) {
      // Details alleen in de serverlogs — nooit richting de bezoeker lekken.
      console.error('Resend-fout', res.status, await res.text());
      return json(502, { ok: false, error: 'email_failed' });
    }
  } catch (err) {
    console.error('Resend-request mislukt', err);
    return json(502, { ok: false, error: 'email_failed' });
  }

  return json(200, { ok: true });
};
