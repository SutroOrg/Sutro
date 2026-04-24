import type { OmitKeys } from "./omit-keys.js";

export type Replace<T, U> = OmitKeys<T, keyof U> & U;
