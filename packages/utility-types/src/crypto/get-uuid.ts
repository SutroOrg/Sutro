import { v4 as uuidv4 } from "uuid";

import { inTest } from "../inTest.js";

/**
 * We frequently brand UUIDs as specific types (e.g., UserId, BuilderId) for type safety.
 *
 * This function generates a UUID and casts it to the specified string subtype.
 */
let uuidCounter = 0;
export const getUUID = <S extends string>() => {
  if (inTest()) {
    uuidCounter++;
    return `00000000-0000-4000-8000-${uuidCounter.toString().padStart(12, "0")}` as S;
  }
  return uuidv4() as S;
};

/**
 * Special case that returns the nil UUID
 */
export const getNilUUID = <S extends string>() =>
  "00000000-0000-0000-0000-000000000000" as S;

export const isNilUUID = <S extends string>(uuid: S) =>
  uuid === getNilUUID<S>();
