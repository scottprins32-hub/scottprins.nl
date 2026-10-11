/**
 * De bestelbon: gedeelde validatie voor het formulier in de browser
 * (directe feedback) én voor /api/lead (de echte controle).
 */
import { isTradeId, type TradeId } from '../data/trade-ids';

export type LeadTrade = TradeId | 'anders';

export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  trade: LeadTrade;
  message: string;
  /** Honeypot: mensen laten dit leeg, spambots niet. */
  website: string;
  /** Taal waarin de bezoeker de site gebruikte; bepaalt hoe Scott terugmailt. */
  locale: 'nl' | 'en';
}

export type LeadField = 'name' | 'email';

export type LeadValidation = { ok: true; lead: LeadPayload } | { ok: false; fields: LeadField[] };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '';
}

export function validateLead(input: unknown): LeadValidation {
  const raw = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;

  const lead: LeadPayload = {
    name: str(raw.name, 100),
    email: str(raw.email, 200),
    phone: str(raw.phone, 30),
    company: str(raw.company, 100),
    trade: isTradeId(raw.trade) ? raw.trade : 'anders',
    /* Het bericht mag regels houden. */
    message: typeof raw.message === 'string' ? raw.message.trim().slice(0, 2000) : '',
    website: str(raw.website, 200),
    locale: raw.locale === 'en' ? 'en' : 'nl',
  };

  const fields: LeadField[] = [];
  if (lead.name.length === 0) fields.push('name');
  if (!EMAIL_RE.test(lead.email)) fields.push('email');

  return fields.length > 0 ? { ok: false, fields } : { ok: true, lead };
}

/** Labels voor de samenvatting, per taal aangeleverd door de aanroeper. */
export interface LeadLabels {
  name: string;
  email: string;
  phone: string;
  company: string;
  trade: string;
  message: string;
  trades: Record<LeadTrade, string>;
}

/** Leesbare samenvatting: voor WhatsApp, mail en de mail aan Scott. */
export function leadSummary(lead: LeadPayload, labels: LeadLabels): string {
  const rows: [string, string][] = [
    [labels.name, lead.name],
    [labels.company, lead.company],
    [labels.trade, labels.trades[lead.trade]],
    [labels.email, lead.email],
    [labels.phone, lead.phone],
  ];
  const lines = rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`);
  if (lead.message) lines.push('', `${labels.message}:`, lead.message);
  return lines.join('\n');
}
