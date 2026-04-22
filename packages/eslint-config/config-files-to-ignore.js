export const configFilesToIgnore = [
  "babel",
  "metro",
  "vitest",
  "tailwind",
  "postcss",
  "eslint",
].flatMap((config) => [
  `${config}.config.[tj]s`,
  `${config}.config.m[tj]s`,
  `${config}.config.c[tj]s`,
]);
