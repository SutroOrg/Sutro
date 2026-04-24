/**
 * Convert camelCase to snake_case
 */
export const camelToSnake = (str: string) => {
  if (str.length === 0) {
    return "";
  } else {
    return (
      str.at(0)?.toLowerCase() +
      str.slice(1).replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)
    );
  }
};
