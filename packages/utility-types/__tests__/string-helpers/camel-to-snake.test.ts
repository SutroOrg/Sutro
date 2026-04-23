import { describe, expect, it } from "vitest";

import { camelToSnake } from "../../src/string-helpers/camel-to-snake.js";

describe("camelToSnake", () => {
  it("converts camelCase to snake_case", () => {
    expect(camelToSnake("")).to.equal("");
    expect(camelToSnake("single")).to.equal("single");
    expect(camelToSnake("twoWords")).to.equal("two_words");
    expect(camelToSnake("Single")).to.equal("single");
    expect(camelToSnake("Users")).to.equal("users");
    expect(camelToSnake("already_snake")).to.equal("already_snake");
    expect(camelToSnake("aListOfWords")).to.equal("a_list_of_words");
  });
});
