/**
 * Capitalize the first letter of a string
 */
export function capitalizeFirstLetter(val: string): string {
  return val.charAt(0).toUpperCase() + val.slice(1);
}
