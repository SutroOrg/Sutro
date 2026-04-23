import { toPascalCase } from "./to-pascal-case.js";

export const toCamelCase = (str: string): string => {
  const pascalString = toPascalCase(str);
  return pascalString.charAt(0).toLowerCase() + pascalString.slice(1);
};
