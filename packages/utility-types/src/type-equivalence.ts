/**
 * This is meant to be a type checker between two types, often a typescript
 * type and the inferred type from zod.
 *
 * Example to test bidirectional equivalence.
 * ```ts
 * typeEquivalence<MyType, MyZodType>();
 * typeEquivalence<MyZodType, MyType>();
 * typeEquivalence<Required<MyZodType>, Required<MyType>>();
 * typeEquivalence<Required<MyType>, Required<MyZodType>>();
 * ```
 */
export const typeEquivalence = <T, U extends T>(_?: U): void => {};
