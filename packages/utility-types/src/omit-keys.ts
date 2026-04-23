import type { OnlyIndex, RemoveIndex } from "./index-signatures.js";

/**
 * This is equivalent to the `Omit` utility type
 *
 * When you pass a type with index signatures to `Omit`, it ends up erasing all the other fields.
 *
 * For this reason, we need to use this type instead. It will remove the keys we specify, but keep the index signature.
 *
 */
export type OmitKeys<T, K extends PropertyKey> = Omit<RemoveIndex<T>, K> &
  OnlyIndex<T>;
