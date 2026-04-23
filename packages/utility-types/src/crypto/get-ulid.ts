// This is the one place where importing `ulid` is OK

// eslint-disable-next-line no-restricted-imports
import { monotonicFactory, ulid } from "ulid";

import { inTest } from "../inTest.js";

function stubbedPrng() {
  return 0.96;
}
let stubbedUlid = monotonicFactory(stubbedPrng);

const FORCE_STABLE_ULIDS =
  typeof process !== "undefined" ? "FORCE_STABLE_ULIDS" in process.env : false;

/**
 * Generates a ULID (Universally Unique Lexicographically Sortable Identifier).
 *
 * In test environments, returns a deterministic ULID with a fixed timestamp
 * to ensure consistent and predictable test behavior.
 * In non-test environments, returns a standard random ULID.
 *
 * @returns {string} A ULID string
 */
export function getUlid() {
  if (inTest() || FORCE_STABLE_ULIDS) {
    return stubbedUlid(1642540443821);
  }
  return ulid();
}
