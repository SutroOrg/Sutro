import { UnknownObject } from "../object-types.js";

/**
 * Converts an object that may contain promise values into a promise that resolves to an object with all promises resolved.
 * @param o
 * @returns
 */
export const convertObjectOfPromises = async <
  T extends Record<string, Promise<unknown> | unknown>,
>(
  o: T
): Promise<UnknownObject> => {
  const entries = await Promise.all(
    Object.entries(o).map(async ([key, value]) => {
      const resolvedValue = await value;
      return [key, resolvedValue];
    })
  );
  return Object.fromEntries(entries);
};
