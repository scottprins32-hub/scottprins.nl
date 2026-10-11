/**
 * POST /api/lead: de enige serverless route van de site.
 * Ontvangt de bestelbon, controleert hem opnieuw en mailt hem via Resend
 * naar Scott. De bezoeker krijgt een kopie (als dat lukt).
 *
 * Zonder RESEND_API_KEY antwoordt deze route 503; de browser zet de bon
 * dan klaar voor WhatsApp of mail. De site blijft dus altijd werken.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import { site } from '../../data/site';
import { offer } from '../../data/offer';
import { TRADE_IDS } from '../../data/trade-ids';
import { validateLead, leadSummary, type LeadLabels, type LeadPayload } from '../../lib/lead';
import { eur } from '../../lib/format';
import { nl } from '../../data/content/nl';
import { en } from '../../data/content/en';

const TO_ADDRESS = site.email;
// Zonder geverifieerd domein staat Resend alleen dit afzenderadres toe.
// Na domeinverificatie kan dit bijvoorbeeld site@scottprins.nl worden.
const FROM_ADDRESS = 'Scott Prins Webdesign <onboarding@resend.dev>';

/* Simpele limiter per IP: vijf bonnen per uur is ruim voor een mens en
   onbruikbaar voor een bot. In-memory, dus per serverless-instantie: genoeg
   om spam te temperen zonder externe opslag. */
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

function labelsFor(bundle: typeof nl | typeof en): LeadLabels {
  const o = bundle.order;
  return {
    name: o.fields.name,
    email: o.fields.email,
    phone: o.fields.phone,
    company: o.fields.company,
    trade: o.fields.trade,
    message: o.fields.message,
    trades: {
      ...(Object.fromEntries(TRADE_IDS.map((id) => [id, bundle.trades[id].tab])) as Record<
        (typeof TRADE_IDS)[number],
        string
      >),
      anders: o.tradeOther,
    },
  };
}

/* Deze mail komt in Scotts eigen inbox, dus altijd Nederlands. De taal van
   de bezoeker staat erbij, zodat hij weet hoe hij moet terugmailen. */
function mailToScott(lead: LeadPayload): string {
  return [
    `Nieuwe bestelbon via scottprins.nl: gratis proefpagina gevraagd.`,
    '',
    leadSummary(lead, labelsFor(nl)),
    '',
    `Taal: ${lead.locale === 'en' ? 'Engels, antwoord in het Engels' : 'Nederlands'}`,
    `Prijs op de bon: ${eur(offer.price, 'nl')} excl. btw`,
  ].join('\n');
}

function copyToVisitor(lead: LeadPayload): { subject: string; text: string } {
  const bundle = lead.locale === 'en' ? en : nl;
  const english = lead.locale === 'en';
  return {
    subject: english ? 'Your order slip via scottprins.nl' : 'Je bestelbon via scottprins.nl',
    text: [
      english ? `Hi ${lead.name},` : `Hoi ${lead.name},`,
      '',
      bundle.order.success.text,
      '',
      leadSummary(lead, labelsFor(bundle)),
      '',
      english
        ? `Questions? Call or message Scott on ${site.whatsappDisplay}.`
        : `Vragen? Bel of app Scott op ${site.whatsappDisplay}.`,
    ].join('\n'),
  };
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

  // Honeypot ingevuld: spambot. Doe alsof alles gelukt is.
  if (lead.website !== '') {
    return json(200, { ok: true });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (rateLimited(ip)) return json(429, { ok: false, error: 'rate_limited' });

  // getSecret leest de runtime-omgeving (Vercel) én .env (lokaal): een key die
  // later op Vercel wordt toegevoegd, werkt meteen, zonder nieuwe build.
  const apiKey = getSecret('RESEND_API_KEY');
  if (!apiKey) {
    return json(503, { ok: false, error: 'email_not_configured' });
  }

  const send = (payload: unknown) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      /* Zonder timeout blijft de functie hangen als Resend traag is; de
         browser valt dan na de 502 terug op WhatsApp of mail. */
      signal: AbortSignal.timeout(8000),
    });

  const tradeLabel = labelsFor(nl).trades[lead.trade];
  const subject = `Proefpagina: ${lead.company || lead.name} (${tradeLabel})`;

  try {
    const res = await send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      reply_to: lead.email,
      subject,
      text: mailToScott(lead),
    });
    if (!res.ok) {
      // Details alleen in de serverlogs, nooit richting de bezoeker.
      console.error('Resend-fout', res.status, await res.text());
      return json(502, { ok: false, error: 'email_failed' });
    }
  } catch (err) {
    console.error('Resend-request mislukt', err);
    return json(502, { ok: false, error: 'email_failed' });
  }

  /* Pas als Scott de bon heeft, krijgt de bezoeker een kopie. Die mag nooit
     een fout opleveren: zolang het domein niet in Resend geverifieerd is,
     weigert Resend deze tweede mail. We wachten er wel op, want na het
     antwoord kan een serverless functie meteen bevriezen. */
  const copy = copyToVisitor(lead);
  await send({ from: FROM_ADDRESS, to: [lead.email], reply_to: TO_ADDRESS, ...copy }).catch(() => undefined);

  return json(200, { ok: true });
};
