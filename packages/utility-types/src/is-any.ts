/**
 * In some rare cases you need to do `T extends any ? A : B`, where your options
 * are `any` or "anything except `any`". This utility will help with that.
 *
 * You can use it like:
 * ```
 * type Foo<T> = IsAny<T> extends true ? A : B;
 * ```
 *
 * The logic is 0 never extends 1, but `1 & any` is `any` and `0` extends `any`.
 * So only `0 extends 1 & T` where `T` is `any` is true.
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;
