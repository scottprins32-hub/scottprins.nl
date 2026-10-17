/**
 * Wat de bezoeker in het upgrade-ding kiest (naam en branche), gedeeld met
 * de bestelbon en de 50-milliseconden-test. Eén module, dus één instantie
 * per pagina.
 *
 * De naam blijft in de browser; hij gaat pas mee als de bezoeker de bon
 * verstuurt (zo staat het ook in de privacyverklaring).
 */
import { DEFAULT_TRADE, displayName, isTradeId, type TradeId } from '../data/trade-ids';

export interface SiteState {
  /** Wat de bezoeker typte, onbewerkt. Leeg = nog niets getypt. */
  typed: string;
  trade: TradeId;
  revealed: boolean;
}

type Listener = (state: Readonly<SiteState>, changed: Partial<SiteState>) => void;

const KEY = 'sp-keuze';
const state: SiteState = { typed: '', trade: DEFAULT_TRADE, revealed: false };
const listeners = new Set<Listener>();

/* Wat je koos blijft bewaard zolang dit tabblad open is, zodat je naam er
   nog staat als je terugkomt van een voorbeeldsite. Alleen in je eigen
   browser (sessionStorage), nooit naar een server. */
let restored = false;
try {
  const saved = JSON.parse(sessionStorage.getItem(KEY) ?? 'null') as Partial<SiteState> | null;
  if (saved && typeof saved.typed === 'string') state.typed = saved.typed.slice(0, 80);
  if (saved && isTradeId(saved.trade)) state.trade = saved.trade;
  restored = Boolean(saved);
} catch {
  /* Geen opslag (privévenster, geblokkeerd): dan gewoon zonder. */
}

/** Kwam er een eerdere keuze uit dit tabblad terug? */
export function wasRestored(): boolean {
  return restored;
}

function save(): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ typed: state.typed, trade: state.trade }));
  } catch {
    /* zie hierboven */
  }
}

export function getState(): Readonly<SiteState> {
  return state;
}

export function setState(patch: Partial<SiteState>): void {
  const changed: Partial<SiteState> = {};
  for (const key of Object.keys(patch) as (keyof SiteState)[]) {
    if (patch[key] !== undefined && patch[key] !== state[key]) {
      (changed as Record<string, unknown>)[key] = patch[key];
    }
  }
  if (Object.keys(changed).length === 0) return;
  Object.assign(state, changed);
  if ('typed' in changed || 'trade' in changed) save();
  for (const fn of listeners) fn(state, changed);
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** De naam zoals hij op de site staat: getypt, of de voorbeeldnaam. */
export function currentName(s: Readonly<SiteState> = state): string {
  return displayName(s.typed, s.trade);
}

export { isTradeId };
