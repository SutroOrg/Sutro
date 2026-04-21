import { configFilesToIgnore } from "./config-files-to-ignore.js";

export const standardIgnores = [
  "lib",
  "dist",
  "node_modules",
  "docs",
  "coverage",
  "storybook-static",
  "_scratch",
  "**/_scratch",
  ".react-router",
  "*.timestamp-*.mjs",
  ...configFilesToIgnore,
];
