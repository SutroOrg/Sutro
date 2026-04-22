# @sutro-dev/tsconfig

Shared TypeScript base configuration for Sutro packages.

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
pnpm pack --dry-run
```

Publish the scoped package publicly:

```sh
pnpm publish --access public
```
