/**
 * Client-side selectie-store voor de configurator.
 * - Bewaart de keuze in localStorage (overleeft een refresh).
 * - Elke wijziging verstuurt een 'sp:selection'-event op document;
 *   menukaart-knoppen, cart-pill en configurator tekenen daarop opnieuw.
 * Wordt uitsluitend vanuit <script>-blokken geïmporteerd (nooit SSR).
 */
import type { AddonId, BasePackageId, CarePlanId } from '../data/pricing';
import { DEFAULT_SELECTION, sanitizeSelection, type Selection } from '../lib/calc';

const STORAGE_KEY = 'sp:selection:v1';
export const SELECTION_EVENT = 'sp:selection';

function load(): Selection {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return sanitizeSelection(JSON.parse(raw));
  } catch {
    // Kapotte of geblokkeerde storage (bijv. private mode) → verse start.
  }
  return structuredClone(DEFAULT_SELECTION);
}

let selection: Selection = load();

function commit(next: Selection): void {
  selection = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
  } catch {
    // Opslaan mislukt? Jammer, maar de sessie zelf blijft gewoon werken.
  }
  document.dispatchEvent(new CustomEvent<Selection>(SELECTION_EVENT, { detail: selection }));
}

export function getSelection(): Selection {
  return selection;
}

export function setBase(id: BasePackageId): void {
  commit(sanitizeSelection({ ...selection, base: id }));
}

export function setCare(id: CarePlanId): void {
  commit(sanitizeSelection({ ...selection, care: id }));
}

export function toggleAddon(id: AddonId): void {
  const addons = selection.addons.includes(id)
    ? selection.addons.filter((a) => a !== id)
    : [...selection.addons, id];
  commit(sanitizeSelection({ ...selection, addons }));
}

/**
 * Roept `fn` direct aan met de huidige selectie en daarna bij elke wijziging.
 * Retourneert een unsubscribe-functie (op deze site niet nodig, wel netjes).
 */
export function subscribe(fn: (sel: Selection) => void): () => void {
  fn(selection);
  const handler = (event: Event) => fn((event as CustomEvent<Selection>).detail);
  document.addEventListener(SELECTION_EVENT, handler);
  return () => document.removeEventListener(SELECTION_EVENT, handler);
}
