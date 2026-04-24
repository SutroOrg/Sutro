import { camelToSnake } from "./camel-to-snake.js";

/**
 * Convert camelCase to kebab-case
 * @param {string} str camelCase string
 * @returns {string} kebab-case string
 */
export const camelToKebab = (str: string) => {
  return camelToSnake(str).replace(/_/g, () => `-`);
};
