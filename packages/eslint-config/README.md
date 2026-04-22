# `@sutro-dev/eslint-config`

Shared ESLint flat config for Sutro-style TypeScript and React projects.

This package is maintained in the [`SutroOrg/Sutro`](https://github.com/SutroOrg/Sutro) monorepo.

## Install

```sh
pnpm add -D @sutro-dev/eslint-config eslint@^9.34.0
```

## Usage

```js
import sutroDevConfig, { standardIgnores } from "@sutro-dev/eslint-config";

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
pnpm install
pnpm lint
pnpm test
pnpm build
pnpm publish --access public
```
