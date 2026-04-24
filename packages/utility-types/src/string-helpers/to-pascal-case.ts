import { capitalizeFirstLetter } from "./capitalize-first-letter.js";

export const toPascalCase = (str: string): string => {
  return str
    .split(" ")
    .map((word) => {
      /**
       * If the word is all uppercase, then we want all but the first letter to be
       * lowercase:
       *
       *  - SQL -> Sql
       *  - UI -> Ui
       *  - DOB -> Dob
       */
      if (/^[A-Z]+$/.test(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();
      }
      return capitalizeFirstLetter(word);
    })
    .join("");
};
