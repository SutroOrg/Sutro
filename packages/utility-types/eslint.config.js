import sutroConfig, { standardIgnores } from "@sutro/eslint-config";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: standardIgnores,
  },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  ...sutroConfig,
];
