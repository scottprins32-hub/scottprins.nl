import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { LABELS, SITE, TRADES } from './labels.ts';

/**
 * De bestelbon van scottprins.nl. Het formulier roept deze functie aan
 * (base44.functions.invoke('sendLead', bon)). Hij controleert de bon
 * opnieuw, slaat hem op als Lead en mailt hem via Base44 naar Scott; de
 * bezoeker krijgt een kopie. Bezoekers schrijven zelf geen Leads: alleen
 * deze functie, met de service-rol.
 *
 * Dezelfde regels als src/lib/lead.ts in de site. Lukt het opslaan niet,
 * dan antwoordt hij met een fout en zet de browser de bon klaar voor
 * WhatsApp of mail. Lukt alleen het mailen niet, dan is de bon wel binnen.
 */

type Lang = 'nl' | 'en';
type Trade = (typeof TRADES)[number] | 'anders';
interface Lead {
  name: string;
  email: string;
  phone: string;
  company: string;
  trade: Trade;
  message: string;
  website: string;
  locale: Lang;
  page: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '';

function validate(input: unknown): { ok: true; lead: Lead } | { ok: false; fields: string[] } {
  const raw = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;
  const trade = (TRADES as readonly string[]).includes(String(raw.trade)) ? (raw.trade as Trade) : 'anders';
  const lead: Lead = {
    name: str(raw.name, 100),
    email: str(raw.email, 200),
    phone: str(raw.phone, 30),
    company: str(raw.company, 100),
    trade,
    /* Het bericht mag regels houden. */
    message: typeof raw.message === 'string' ? raw.message.trim().slice(0, 2000) : '',
    website: str(raw.website, 200),
    locale: raw.locale === 'en' ? 'en' : 'nl',
    page: str(raw.page, 200),
  };
  const fields: string[] = [];
  if (lead.name.length === 0) fields.push('name');
  if (!EMAIL_RE.test(lead.email)) fields.push('email');
  return fields.length > 0 ? { ok: false, fields } : { ok: true, lead };
}

/** Leesbare samenvatting, zoals leadSummary in de site. */
function summary(lead: Lead, lang: Lang): string {
  const l = LABELS[lang];
  const rows: [string, string][] = [
    [l.fields.name, lead.name],
    [l.fields.company, lead.company],
    [l.fields.trade, l.trades[lead.trade]],
    [l.fields.email, lead.email],
    [l.fields.phone, lead.phone],
  ];
  const lines = rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`);
  if (lead.message) lines.push('', `${l.fields.message}:`, lead.message);
  return lines.join('\n');
}

/* Vijf bonnen per uur per IP is ruim voor een mens en onbruikbaar voor een
   bot. In het geheugen van deze instantie: genoeg om spam te temperen. */
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const window = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  window.push(now);
  hits.set(ip, window);
  return window.length > 5;
}

Deno.serve(async (req) => {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) return Response.json({ ok: false, error: 'validation', fields: result.fields }, { status: 400 });
  const lead = result.lead;

  // Honeypot ingevuld: een bot. Hetzelfde antwoord als een mens krijgt.
  if (lead.website !== '') {
    console.log('[sendLead] honeypot');
    return Response.json({ ok: true });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (rateLimited(ip)) return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 });

  const base44 = createClientFromRequest(req);
  try {
    await base44.asServiceRole.entities.Lead.create({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || undefined,
      company: lead.company || undefined,
      trade: lead.trade,
      message: lead.message || undefined,
      locale: lead.locale,
      page: lead.page || undefined,
      status: 'Nieuw',
    });
  } catch (error) {
    console.error('[sendLead] opslaan mislukt', error);
    return Response.json({ ok: false, error: 'save_failed' }, { status: 500 });
  }

  // Vanaf hier is het bezorging: de bon is binnen, dus elke stap mag los mislukken.
  const english = lead.locale === 'en';
  try {
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: SITE.email,
      subject: `Nieuwe bestelbon: ${lead.company || lead.name}`,
      body: [
        'Nieuwe bestelbon via scottprins.nl: gratis proefpagina gevraagd.',
        '',
        summary(lead, 'nl'),
        '',
        `Taal: ${english ? 'Engels, antwoord in het Engels' : 'Nederlands'}`,
        'Prijs op de bon: € 500 excl. btw',
      ].join('\n'),
    });
  } catch (error) {
    console.error('[sendLead] mail aan Scott mislukt', error);
  }
  try {
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: lead.email,
      subject: english ? 'Your order slip via scottprins.nl' : 'Je bestelbon via scottprins.nl',
      body: [
        english ? `Hi ${lead.name},` : `Hoi ${lead.name},`,
        '',
        LABELS[lead.locale].success,
        '',
        summary(lead, lead.locale),
        '',
        english
          ? `Questions? Call or message Scott on ${SITE.whatsappDisplay}.`
          : `Vragen? Bel of app Scott op ${SITE.whatsappDisplay}.`,
      ].join('\n'),
    });
  } catch (error) {
    console.error('[sendLead] kopie aan bezoeker mislukt', error);
  }

  return Response.json({ ok: true });
});
