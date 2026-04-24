/* eslint @typescript-eslint/no-explicit-any: "warn" */
import { describe, expect, it } from "vitest";

import { deserialize } from "../../src/serialization/deserialize.js";
import { serialize } from "../../src/serialization/serialize.js";

const lee = {
  name: "Lee",
  friends: [] as unknown[],
};
const robin = {
  name: "Robin",
  friends: [lee],
};
lee.friends.push(robin);
const sasha = {
  name: "Sasha",
  friends: [lee, robin],
};
const kiran = {
  name: "Kiran",
  friends: [robin, sasha],
};
lee.friends.push(kiran);

describe("Users", () => {
  it("cannot be stringified normally", () => {
    expect(() => JSON.stringify(Object.freeze(lee))).toThrow();
  });
  it("is stringified with circular references", () => {
    expect(() => serialize(Object.freeze(lee))).not.toThrow();
  });
  it("is stringified with circular references", () => {
    expect(serialize(Object.freeze(lee))).toEqual(
      '{"friends":[{"friends":["__$"],"name":"Robin"},{"friends":["__$.friends.[0]",{"friends":["__$","__$.friends.[0]"],"name":"Sasha"}],"name":"Kiran"}],"name":"Lee"}'
    );
  });
  it("serializes and deserializes symmetrically", () => {
    const serialized = serialize(Object.freeze(lee));

    const deserialized: any = deserialize(serialized);
    for (const key in lee) {
      expect(lee[key as keyof typeof lee]).toEqual(
        deserialized[key as keyof typeof lee]
      );
    }
  });

  it("supports alternate path starts", () => {
    const serialized = serialize(Object.freeze(lee), { pathStart: "%{$*" });

    const deserialized: any = deserialize(serialized, { pathStart: "%{$*" });
    for (const key in lee) {
      expect(lee[key as keyof typeof lee]).toEqual(
        deserialized[key as keyof typeof lee]
      );
    }
  });
});
