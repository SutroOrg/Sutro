/**
 * Takes a string and returns one that is safe to use as an
 * SQL identifier
 */

export const toSqlSafe = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^_a-zA-Z0-9]/g, "_")
    .replace(/^[^a-z]/, (match) => `_${match}`);
};
