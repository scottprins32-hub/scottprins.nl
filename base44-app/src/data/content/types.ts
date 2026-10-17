/**
 * Maakt van een `as const`-object een vorm met gewone strings en arrays.
 * nl.ts is de bron; en.ts moet precies dezelfde sleutels hebben, maar
 * natuurlijk andere tekst. Zo vangt TypeScript een ontbrekende of extra
 * sleutel al bij `astro check`.
 */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { readonly [K in keyof T]: Widen<T[K]> }
          : T;
