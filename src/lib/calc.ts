/**
 * Pure rekenlogica voor de configurator.
 * Draait op de client (live offerte) én op de server (/api/lead herrekent
 * de totalen — client-bedragen worden nooit vertrouwd).
 */
import {
  addons,
  basePackages,
  carePlans,
  type Addon,
  type AddonId,
  type BasePackageId,
  type CarePlanId,
} from '../data/pricing';

export interface Selection {
  base: BasePackageId;
  addons: AddonId[];
  care: CarePlanId;
}

export interface Totals {
  upfront: number;
  monthly: number;
}

export const DEFAULT_SELECTION: Selection = {
  base: 'compleet',
  addons: [],
  care: 'basis',
};

const baseById = new Map(basePackages.map((p) => [p.id, p]));
const addonById = new Map(addons.map((a) => [a.id, a]));
const careById = new Map(carePlans.map((c) => [c.id, c]));

/**
 * Maakt van willekeurige input (localStorage, request-body) een geldige
 * Selection. Onbekende ids worden stilletjes weggelaten, dubbele add-ons
 * tellen één keer — zo overleeft oude opgeslagen data een prijswijziging.
 */
export function sanitizeSelection(input: unknown): Selection {
  const raw = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;

  const base = baseById.has(raw.base as BasePackageId)
    ? (raw.base as BasePackageId)
    : DEFAULT_SELECTION.base;

  const care = careById.has(raw.care as CarePlanId)
    ? (raw.care as CarePlanId)
    : DEFAULT_SELECTION.care;

  const addonIds = Array.isArray(raw.addons)
    ? [...new Set(raw.addons)].filter((id): id is AddonId => addonById.has(id as AddonId))
    : [];

  return { base, addons: addonIds, care };
}

/** Is deze add-on gratis inbegrepen bij het gekozen basispakket? */
export function isIncluded(base: BasePackageId, addonId: AddonId): boolean {
  return baseById.get(base)?.includedAddons.includes(addonId) ?? false;
}

/**
 * Wat kost deze add-on bij dit basispakket? € 0/€ 0 wanneer hij bij het
 * pakket is inbegrepen — de hele UI én de e-mail rekenen hiermee.
 */
export function addonCost(base: BasePackageId, addon: Addon): Totals {
  return isIncluded(base, addon.id)
    ? { upfront: 0, monthly: 0 }
    : { upfront: addon.upfront, monthly: addon.monthly };
}

/** Eenmalig + maandelijks totaal voor een selectie. Muteert de input niet. */
export function calcTotals(selection: Selection): Totals {
  const sel = sanitizeSelection(selection);
  const base = baseById.get(sel.base)!;
  const care = careById.get(sel.care)!;
  const chosen = sel.addons.map((id) => addonById.get(id)!) as Addon[];
  const costs = chosen.map((a) => addonCost(sel.base, a));

  return {
    upfront:
      base.upfront + care.upfrontDelta + costs.reduce((sum, c) => sum + c.upfront, 0),
    monthly:
      base.monthly + care.monthlyDelta + costs.reduce((sum, c) => sum + c.monthly, 0),
  };
}
