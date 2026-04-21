# `@sutro-dev/eslint-config`

Shared ESLint flat config for Sutro-style TypeScript and React projects.

## Install

```sh
pnpm add -D @sutro-dev/eslint-config eslint@^9.34.0
```

## Usage

```js
import sutroDevConfig, {
  standardIgnores,
} from "@sutro-dev/eslint-config";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: standardIgnores,
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
  },
  ...sutroDevConfig,
];
```

## Included

- ESLint recommended rules
- TypeScript ESLint
- React and React Hooks
- `import-x`
- `simple-import-sort`
- `unused-imports`
- `package-json-dependencies`
- `workspaces/*`
- Prettier compatibility

This package is an opinionated monorepo-oriented flat config. It currently supports ESLint 9 flat config (`eslint@^9.34.0`).

## Manual Release

```sh
npm install
node --input-type=module -e "import('./index.js').then((config) => console.log(config.default.length))"
npm publish --access public
```
