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
import { basePackages } from '../../data/pricing';
import { calcTotals } from '../../lib/calc';
import { validateLead, type LeadPayload } from '../../lib/lead';
import { summarizeSelection } from '../../lib/quote';
import { eur } from '../../lib/format';

const TO_ADDRESS = 'scottprins32@gmail.com';
// Zonder geverifieerd domein staat Resend alleen dit afzenderadres toe.
// Na domein-verificatie (zie README) kun je dit wijzigen naar bijv. site@scottprins.nl.
const FROM_ADDRESS = 'Scott Prins Webdesign <onboarding@resend.dev>';

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

function emailText(lead: LeadPayload): string {
  return [
    'Nieuwe offerte-aanvraag via scottprins.nl',
    '',
    `Naam:     ${lead.name}`,
    `Bedrijf:  ${lead.company || '—'}`,
    `Telefoon: ${lead.phone || '—'}`,
    `E-mail:   ${lead.email}`,
    '',
    lead.message ? `Opmerking:\n${lead.message}\n` : '',
    summarizeSelection(lead.selection),
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

  // Runtime uitlezen (niet import.meta.env): zo werkt een key die je later
  // op Vercel toevoegt direct, zonder rebuild.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(503, { ok: false, error: 'email_not_configured' });
  }

  const totals = calcTotals(lead.selection);
  const baseName = basePackages.find((p) => p.id === lead.selection.base)?.name ?? 'Onbekend';
  const subject = `Aanvraag: ${baseName} + ${lead.selection.addons.length} opties — ${eur(totals.upfront)} + ${eur(totals.monthly)}/mnd`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
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
