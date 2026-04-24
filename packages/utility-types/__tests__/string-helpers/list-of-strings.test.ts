import { createElement } from "react";
import { describe, expect, it } from "vitest";

import { listOfStrings } from "../../src/string-helpers/list-of-strings.js";

const asBold = (str: string) => createElement("b", {}, str);
describe("listOfStrings", () => {
  it("turns an array of strings into a list", () => {
    expect(listOfStrings(["a", "b", "c"])).toBe("a, b, and c");
  });
  it("handles just one string", () => {
    expect(listOfStrings(["a"])).toBe("a");
  });
  it("handles two strings", () => {
    expect(listOfStrings(["a", "b"])).toBe("a and b");
  });
  it("handles an empty list", () => {
    expect(listOfStrings([])).toBe("");
  });
  it("turns an array of ReactNodes into a list", () => {
    expect(listOfStrings([asBold("a")])).toMatchInlineSnapshot(`
      <React.Fragment>
        <b>
          a
        </b>
      </React.Fragment>
    `);
    expect(listOfStrings([asBold("a"), asBold("b")])).toMatchInlineSnapshot(`
      <React.Fragment>
        <b>
          a
        </b>
         and 
        <b>
          b
        </b>
      </React.Fragment>
    `);
    expect(listOfStrings([asBold("a"), asBold("b"), asBold("c")]))
      .toMatchInlineSnapshot(`
      <React.Fragment>
        <b>
          a
        </b>
        , 
        <b>
          b
        </b>
        , 
        and 
        <b>
          c
        </b>
      </React.Fragment>
    `);
  });
});
