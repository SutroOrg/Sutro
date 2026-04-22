# @sutro-dev/tsconfig

Shared TypeScript base configuration for Sutro packages.

This package is maintained in the [`SutroOrg/Sutro`](https://github.com/SutroOrg/Sutro) monorepo.

## Usage

Install the package:

```sh
pnpm add -D @sutro-dev/tsconfig
```

Extend it from a package `tsconfig.json`:

```json
{
  "extends": "@sutro-dev/tsconfig",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

## Publishing

Dry-run the package contents before publishing:

```sh
pnpm install
pnpm lint
pnpm test
pnpm build
```

Publish the scoped package publicly:

```sh
pnpm publish --access public
```
