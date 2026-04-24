/**
 * For cases when you want to have an array that has at least one element.
 */
export type NonEmptyArray<T> = [T, ...T[]];
