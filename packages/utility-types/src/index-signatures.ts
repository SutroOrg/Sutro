/**
 * This type takes another type and removes all index signatures from it.
 */
export type RemoveIndex<T> = {
  [K in keyof T as string extends K ? never
  : number extends K ? never
  : symbol extends K ? never
  : K]: T[K];
};

/**
 * This type takes another type and keeps only the index signatures from it.
 */
export type OnlyIndex<T> = {
  [K in keyof T as string extends K ? K
  : number extends K ? K
  : symbol extends K ? K
  : never]: T[K];
};
