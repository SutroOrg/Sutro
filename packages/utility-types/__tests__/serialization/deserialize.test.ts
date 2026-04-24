/* eslint @typescript-eslint/no-explicit-any: "warn" */
import { describe, expect, it } from "vitest";

import { deserialize } from "../../src/serialization/deserialize.js";

describe("deserialize", () => {
  it("can deserialize null", () => expect(deserialize("null")).toEqual(null));
  it("can deserialize true", () => expect(deserialize("true")).toEqual(true));
  it("can deserialize false", () =>
    expect(deserialize("false")).toEqual(false));
  it("can deserialize numbers", () => expect(deserialize("1")).toEqual(1));
  it("can deserialize strings", () => expect(deserialize('"1"')).toEqual("1"));
  it("can deserialize arrays", () =>
    expect(deserialize("[1, 2, 3]")).toEqual([1, 2, 3]));
  it("can deserialize objects", () =>
    expect(deserialize('{ "a": 1, "b": 2 }')).toEqual({ a: 1, b: 2 }));

  it("can deserialize objects with circular references", () => {
    const a: any = { n: 42 };
    const b: any = { s: "hello", a };
    a.b = b;
    expect(deserialize('{"n":42,"b":{"s":"hello","a":"__$"}}')).toEqual(a);
  });

  it("can use alternate path starts", () => {
    const a: any = { n: 42 };
    const b: any = { s: "hello", a };
    a.b = b;
    expect(
      deserialize('{"n":42,"b":{"s":"hello","a":"}{"}}', { pathStart: "}{" })
    ).toEqual(a);
    expect(
      deserialize('{"n":42,"b":{"s":"hello","a":"\\""}}', { pathStart: '"' })
    ).toEqual(a);
  });
});
