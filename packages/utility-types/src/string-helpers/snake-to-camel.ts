/**
 * Convert snake_case to camelCase
 */
export const snakeToCamel = (str: string) =>
  str.replace(/_./g, (match) => match[1]?.toUpperCase() ?? "");
