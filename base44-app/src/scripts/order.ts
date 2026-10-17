/**
 * De bestelbon.
 *
 * - Rekent mee met het upgrade-ding: de naam op de bon, het veld 'Naam van
 *   je zaak' en de branche volgen wat de bezoeker daar koos, tot hij hier
 *   zelf iets aanpast. Andersom werkt het ook. Zonder getypte naam staat er
 *   'jouw zaak' op de bon.
 * - Valideert in de browser (dezelfde regels als de server, lib/lead.ts).
 * - Verstuurt naar de Base44-functie sendLead (base44/functions). Lukt dat
 *   niet, of is dit de preview zonder Base44, dan staat dezelfde bon klaar
 *   voor WhatsApp en mail.
 */
import { gsap, reducedMotion } from './motion/core';
import { validateLead, leadSummary, type LeadField, type LeadLabels, type LeadPayload } from '../lib/lead';
import { isTradeId } from '../data/trade-ids';
import { currentName, getState, setState, subscribe } from './state';

export function initOrder(root: HTMLElement): void {
  const form = root.querySelector<HTMLFormElement>('[data-order-form]');
  const success = root.querySelector<HTMLElement>('[data-success]');
  const status = root.querySelector<HTMLElement>('[data-status]');
  const fallback = root.querySelector<HTMLElement>('[data-fallback]');
  if (!form) return;

  const d = form.dataset;
  const locale = d.locale === 'en' ? 'en' : 'nl';
  const labels = JSON.parse(d.labels ?? '{}') as LeadLabels;
  const company = form.querySelector<HTMLInputElement>('[data-company]');
  const tradeSelect = form.querySelector<HTMLSelectElement>('[data-trade-select]');
  const slipName = form.querySelector<HTMLElement>('[data-slip-name]');
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');

  /* Datum van vandaag op de bon. */
  const today = form.querySelector<HTMLTimeElement>('[data-today]');
  if (today) {
    const now = new Date();
    today.dateTime = now.toISOString().slice(0, 10);
    today.textContent = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(now);
  }

  /* ------------------------------------------- meerekenen met de keuzes -- */
  let companyTouched = false;
  let tradeTouched = false;

  function sync(): void {
    const state = getState();
    if (slipName) {
      /* Nog niets getypt: dan 'jouw zaak', niet de voorbeeldnaam uit het
         upgrade-ding. Op de bon staat alleen wat van de bezoeker zelf is. */
      const name = state.typed.trim() ? currentName() : (slipName.dataset.fallback ?? '');
      if (slipName.textContent !== name) {
        slipName.textContent = name;
        /* Even oplichten (CSS-animatie, kleur uit de tokens). */
        slipName.classList.remove('is-new');
        void slipName.offsetWidth;
        slipName.classList.add('is-new');
      }
    }
    if (company && !companyTouched && document.activeElement !== company) company.value = state.typed.trim();
    if (tradeSelect && !tradeTouched && tradeSelect.value !== state.trade) tradeSelect.value = state.trade;
  }
  subscribe(sync);
  sync();

  company?.addEventListener('input', () => {
    companyTouched = company.value.trim() !== '';
    setState({ typed: company.value });
  });
  tradeSelect?.addEventListener('change', () => {
    tradeTouched = true;
    if (isTradeId(tradeSelect.value)) setState({ trade: tradeSelect.value });
  });

  /* --------------------------------------------------------- versturen -- */
  function payload(): Record<string, string> {
    const data = new FormData(form!);
    return {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      company: String(data.get('company') ?? '') || getState().typed.trim(),
      trade: String(data.get('trade') ?? ''),
      message: String(data.get('message') ?? ''),
      website: String(data.get('website') ?? ''),
      locale,
    };
  }

  function showErrors(fields: LeadField[]): void {
    const messages: Record<LeadField, string | undefined> = { name: d.errName, email: d.errEmail };
    for (const key of ['name', 'email'] as LeadField[]) {
      const input = form!.elements.namedItem(key) as HTMLInputElement | null;
      const err = form!.querySelector<HTMLElement>(`[data-err-for="${key}"]`);
      const bad = fields.includes(key);
      input?.setAttribute('aria-invalid', String(bad));
      if (err) err.textContent = bad ? (messages[key] ?? '') : '';
    }
    if (fields.length) (form!.elements.namedItem(fields[0]) as HTMLInputElement | null)?.focus();
  }

  function showFallback(lead: LeadPayload): void {
    const text = `${d.msgIntro ?? ''}\n\n${leadSummary(lead, labels)}`;
    const wa = form!.querySelector<HTMLAnchorElement>('[data-fallback-wa]');
    const mail = form!.querySelector<HTMLAnchorElement>('[data-fallback-mail]');
    if (wa) wa.href = `https://wa.me/${d.whatsapp}?text=${encodeURIComponent(text)}`;
    if (mail) mail.href = `mailto:${d.email}?subject=${encodeURIComponent(d.mailSubject ?? '')}&body=${encodeURIComponent(text)}`;
    if (fallback) {
      fallback.hidden = false;
      const message = fallback.querySelector('[data-fallback-text]')?.textContent ?? '';
      if (status) status.textContent = message;
      wa?.focus();
    }
  }

  function showSuccess(): void {
    form!.hidden = true;
    if (!success) return;
    success.hidden = false;
    success.focus({ preventScroll: true });
    if (!reducedMotion()) {
      gsap.from(success, { y: 30, opacity: 0, duration: 0.9, ease: 'expo.out' });
      gsap.from(success.querySelector('.slip-stamp'), { scale: 2.4, opacity: 0, rotate: -40, duration: 0.6, ease: 'back.out(1.6)', delay: 0.2 });
    }
    success.scrollIntoView({ block: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' });
  }

  form.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.getAttribute('aria-invalid') === 'true') {
      const result = validateLead(payload());
      showErrors(result.ok ? [] : result.fields.filter((f) => f === target.name));
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const result = validateLead(payload());
    if (!result.ok) {
      showErrors(result.fields);
      return;
    }
    showErrors([]);
    const lead = result.lead;

    /* Preview op GitHub Pages: geen server, dus meteen de bon klaarzetten. */
    if (import.meta.env.PREVIEW) {
      showFallback(lead);
      return;
    }

    const label = submitLabel?.textContent ?? '';
    submit?.setAttribute('aria-busy', 'true');
    if (submitLabel && d.sending) submitLabel.textContent = d.sending;
    if (status && d.sending) status.textContent = d.sending;

    try {
      /* Base44-functie sendLead: controleert, slaat op als Lead en mailt.
         Duurt het langer dan 12 seconden, dan de bon klaarzetten. */
      const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 12000));
      /* De Base44-client pas laden als iemand echt verstuurt: scheelt de
         rest van de bezoekers een flink stuk JavaScript. */
      const { base44 } = await import('@/api/base44Client');
      const { data } = await Promise.race([
        base44.functions.invoke('sendLead', { ...lead, page: window.location.pathname }),
        timeout,
      ]);
      if (!data?.ok) throw new Error(data?.error ?? 'failed');
      if (status) status.textContent = '';
      showSuccess();
    } catch {
      showFallback(lead);
    } finally {
      submit?.removeAttribute('aria-busy');
      if (submitLabel) submitLabel.textContent = label;
    }
  });
}
