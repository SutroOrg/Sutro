import type { BRAND } from "zod";

/**
 * Brand now supports optional branding.
 *
 * It uses the zod `BRAND` type, so that inferred types that include a brand
 * will be compatible with our use of `Brand`.
 *
 * type Foo = Brand<string> // is just a string
 * type Bar = Brand<string, "Bar"> // is a string, but with a brand of "Bar"
 */
export type Brand<K, T extends PropertyKey | null = null> =
  T extends null ? K : K & BRAND<Exclude<T, null>>;
