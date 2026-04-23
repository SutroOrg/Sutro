import { describe, expect, it } from "vitest";

import { toCamelCase } from "../../src/string-helpers/to-camel-case.js";

describe("toCamelCase", () => {
  it("converts string to camelCase", () => {
    expect(toCamelCase("")).toBe("");
    expect(toCamelCase("single")).toBe("single");
    expect(toCamelCase("two words")).toBe("twoWords");
    expect(toCamelCase("Two Words")).toBe("twoWords");
    expect(toCamelCase("two words")).toBe("twoWords");
    expect(toCamelCase("a list of words")).toBe("aListOfWords");
    expect(toCamelCase("a UI system")).toBe("aUiSystem");
    expect(toCamelCase("DOB")).toBe("dob");
    expect(toCamelCase("REST API")).toBe("restApi");
  });
});
