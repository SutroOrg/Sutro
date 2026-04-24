/* eslint @typescript-eslint/no-explicit-any: "warn" */
export type AnyObject = Record<PropertyKey, any>;
export type EmptyObject = Record<string | symbol, never>;
export type UnknownObject = Record<PropertyKey, unknown>;
