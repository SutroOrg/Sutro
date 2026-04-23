import { toSentenceCase } from "./to-sentence-case.js";

/**
 * Convert camelCase to Sentence Case (_not_ PascalCase)
 */
export const camelCaseToSentence = (str: string) =>
  toSentenceCase(str.replace(/[A-Z]/g, (match) => ` ${match.toLowerCase()}`));
