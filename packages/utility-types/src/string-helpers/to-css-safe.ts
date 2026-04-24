/**
 * Takes a string and returns one that is safe to use as a
 * CSS id or class
 */

export const toCssSafe = (str: string) => {
  return str
    .replace(/\s+/g, "_")
    .replace(/[^-_a-zA-Z0-9)(\][:.]/g, "_")
    .replace(/[)([\]:.]/g, (match) => `\\${match}`)
    .replace(/^-[^a-z]/, (match) => `_${match}`)
    .replace(/^[^-a-z_]/, (match) => `_${match}`);
};
