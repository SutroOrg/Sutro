import { snakeToCamel } from "./snake-to-camel.js";

/**
 * Convert kebab-case to camelCase
 * @param {string} str kebab-case string
 * @returns {string} camelCase string
 */
export const kebabToCamel = (str: string) => {
  return snakeToCamel(str.replace(/-/g, () => `_`));
};
