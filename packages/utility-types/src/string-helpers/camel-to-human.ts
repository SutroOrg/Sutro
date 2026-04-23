/**
 * Converts a camelCase string to a human-readable format.
 *
 * @param {string} str - The camelCase string.
 * @returns {string} - The human-readable string.
 *
 * @example
 * camelCaseToHuman('firstName') // 'First Name'
 * camelCaseToHuman('userAccountSettings') // 'User Account Settings'
 * camelCaseToHuman('apiKey') // 'Api Key'
 * camelCaseToHuman('hello') // 'Hello'
 */
export const camelCaseToHuman = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
};
