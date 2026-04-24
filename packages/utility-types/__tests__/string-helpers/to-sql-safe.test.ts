import { describe, expect, it } from "vitest";

import { toSqlSafe } from "../../src/string-helpers/to-sql-safe.js";

describe("toSqlSafe", () => {
  it("renders strings into valid SQL identifiers", () => {
    expect(toSqlSafe("")).to.equal("");
    expect(toSqlSafe("not-valid")).to.equal("not_valid");
    expect(toSqlSafe("actually_valid")).to.equal("actually_valid");
    expect(toSqlSafe("Users")).to.equal("users");
    expect(toSqlSafe("-2_bad_start")).to.equal("__2_bad_start");
    expect(toSqlSafe("2_bad_start")).to.equal("_2_bad_start");
    expect(toSqlSafe("a list of words")).to.equal("a_list_of_words");
    expect(toSqlSafe("🥰")).to.equal("___");
  });
});
