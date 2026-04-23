/* eslint @typescript-eslint/no-explicit-any: "warn" */
import { describe, expect, it } from "vitest";

import { serialize } from "../../src/serialization/serialize.js";

describe("serialize", () => {
  it("can serialize null", () => expect(serialize(null)).toEqual("null"));
  it("can serialize true", () => expect(serialize(true)).toEqual("true"));
  it("can serialize false", () => expect(serialize(false)).toEqual("false"));
  it("can serialize numbers", () => expect(serialize(1)).toEqual("1"));
  it("can serialize strings", () => expect(serialize("1")).toEqual('"1"'));
  it("can serialize arrays", () =>
    expect(serialize([1, 2, 3])).toEqual("[1,2,3]"));
  it("can serialize objects", () =>
    expect(serialize({ a: 1, b: 2 })).toEqual('{"a":1,"b":2}'));

  it("can serialize objects with circular references", () => {
    const a: any = { n: 42 };
    const b: any = { s: "hello", a };
    a.b = b;
    expect(serialize(a)).toEqual(`{"b":{"a":"__$","s":"hello"},"n":42}`);
  });

  it("can use alternate path starts", () => {
    const a: any = { n: 42 };
    const b: any = { s: "hello", a };
    a.b = b;
    expect(serialize(a, { pathStart: "}{" })).toEqual(
      '{"b":{"a":"}{","s":"hello"},"n":42}'
    );
    expect(serialize(a, { pathStart: '"' })).toEqual(
      `{"b":{"a":"\\"","s":"hello"},"n":42}`
    );
  });
});
