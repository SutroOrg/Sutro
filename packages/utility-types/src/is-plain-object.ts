/**
 * This function checks if a value is just a plain object, not an array or null
 */
export const isPlainObject = (
  value: unknown
): value is Record<PropertyKey, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);
