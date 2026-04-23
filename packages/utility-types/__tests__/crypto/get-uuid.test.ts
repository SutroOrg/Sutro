import { describe, expect, it } from "vitest";

import { getUUID } from "../../src/crypto/get-uuid.js";
import { isUuid } from "../../src/crypto/uxid.js";

describe("getUUID", () => {
  it("should generate a valid UUID", () => {
    const uuid = getUUID();
    expect(isUuid(uuid)).toBe(true);
  });
});
