import { describe, expect, it } from "vitest";

import { toCssSafe } from "../../src/string-helpers/to-css-safe.js";

describe("toCssSafe", () => {
  it("renders strings into CSS safe strings", () => {
    expect(toCssSafe("")).to.equal("");
    expect(toCssSafe("already-valid")).to.equal("already-valid");
    expect(toCssSafe("also_valid")).to.equal("also_valid");
    expect(toCssSafe("-2_bad_start")).to.equal("_-2_bad_start");
    expect(toCssSafe("2_bad_start")).to.equal("_2_bad_start");
    expect(toCssSafe("a list of words")).to.equal("a_list_of_words");
    expect(toCssSafe("🥰")).to.equal("__");
  });
  it("handles Tailwind class names", () => {
    expect(toCssSafe("text-red-500")).to.equal("text-red-500");
    expect(toCssSafe("bg-blue-200")).to.equal("bg-blue-200");
    expect(toCssSafe("test-(--ring)")).to.equal("test-\\(--ring\\)");
    expect(toCssSafe("text-[length:1.5rem]")).to.equal(
      "text-\\[length\\:1\\.5rem\\]"
    );
  });
});
