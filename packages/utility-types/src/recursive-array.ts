/**
 * This is the format output by `moo` and `nearley`
 */
export type RecursiveArray<T> = (T | RecursiveArray<T>)[];
