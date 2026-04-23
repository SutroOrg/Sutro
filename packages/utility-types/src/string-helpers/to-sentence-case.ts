import { toCamelCase } from "./to-camel-case.js";

export const toSentenceCase = (
  str: string,
  makeOtherWordsStartWithLowerCase = false
): string => {
  if (str.length === 0) {
    return str;
  }
  return (
    str[0]?.toUpperCase() +
    (makeOtherWordsStartWithLowerCase ?
      str.slice(1).split(" ").map(toCamelCase).join(" ")
    : str.slice(1))
  );
};
