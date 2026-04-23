import { defineProject } from "vitest/config";

export default defineProject({
  test: {
    env: {
      SUTRO_ENV: "test",
      NODE_ENV: "test",
    },
  },
});
