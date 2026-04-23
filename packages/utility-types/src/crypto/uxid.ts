import { isValid } from "ulid";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Returns true if the given value is a valid ULID.
 */
export const isUlid = (value: unknown): boolean => {
  return typeof value === "string" && isValid(value);
};

/**
 * Returns true if the given value is a valid UUID.
 */
export const isUuid = (value: unknown): boolean => {
  // A UUID is a 36-character string with specific formatting
  return typeof value === "string" && UUID_REGEX.test(value);
};

/*
 * These functions convert between UUID and ULID formats.
 * They will both throw an error if the input is not valid.
 */
export { uuidToULID, ulidToUUID } from "ulid";
