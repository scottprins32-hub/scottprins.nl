/**
 * Gedeelde validatie voor het leadformulier — gebruikt door het
 * client-script (directe feedback) én door /api/lead (de echte controle).
 */
import { sanitizeSelection, type Selection } from './calc';

export interface LeadPayload {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  /** Honeypot-veld: mensen laten dit leeg, spambots niet. */
  website: string;
  selection: Selection;
  /** Taal waarin de bezoeker de site gebruikte; bepaalt hoe Scott terugmailt. */
  locale: 'nl' | 'en';
}

export type LeadValidation =
  | { ok: true; lead: LeadPayload }
  | { ok: false; fields: string[] };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export function validateLead(input: unknown): LeadValidation {
  const raw = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;

  const lead: LeadPayload = {
    name: str(raw.name, 100),
    company: str(raw.company, 100),
    phone: str(raw.phone, 30),
    email: str(raw.email, 200),
    message: str(raw.message, 2000),
    website: str(raw.website, 200),
    selection: sanitizeSelection(raw.selection),
    locale: raw.locale === 'en' ? 'en' : 'nl',
  };

  const fields: string[] = [];
  if (lead.name.length === 0) fields.push('name');
  if (!EMAIL_RE.test(lead.email)) fields.push('email');

  return fields.length > 0 ? { ok: false, fields } : { ok: true, lead };
}
