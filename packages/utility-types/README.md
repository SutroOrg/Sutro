# `@sutro-dev/utility-types`

Small, battle-tested TypeScript utility types and helpers extracted from Sutro.

## Install

```sh
pnpm add @sutro-dev/utility-types
```

`bcrypt` has a native binary. On pnpm 10+ you may need to approve its build script:

```sh
pnpm approve-builds
```

## Usage

There is no root entry point — every helper is a separate subpath import. This keeps the dependency surface minimal for consumers who only need a few utilities.

```ts
import { isPlainObject } from "@sutro-dev/utility-types/is-plain-object";
import { getUUID } from "@sutro-dev/utility-types/crypto/get-uuid";
import { normalizeError } from "@sutro-dev/utility-types/errors/normalize-error";
import { toCamelCase } from "@sutro-dev/utility-types/string-helpers/to-camel-case";
import type { AnyObject } from "@sutro-dev/utility-types/object-types";
import type { Brand } from "@sutro-dev/utility-types/brand";
```

## Included

- **Type helpers** — `brand`, `index-signatures`, `is-any`, `maybe`, `non-empty-array`, `object-types`, `omit-keys`, `recursive-array`, `replace`, `type-equivalence`
- **Runtime predicates** — `is-plain-object`, `inTest`
- **Crypto** — `crypto/get-uuid`, `crypto/get-ulid`, `crypto/uxid`, `crypto/password`
- **Errors** — `errors/normalize-error`
- **Promises** — `promises/convert-object-of-promises`
- **Random** — `random/get-random`, `random/generate-random-number`
- **Serialization** — `serialization/serialize`, `serialization/deserialize`
- **String helpers** — camelCase / snake_case / kebab-case / PascalCase / Title Case / Sentence case conversions, plus `to-css-safe`, `to-sql-safe`, `capitalize-first-letter`, `list-of-strings`
- **Validators** — `validators/is-email-valid`, `validators/is-password-valid`, `validators/normalize-email`

## Optional peer dependencies

Two subpaths opt in to extra peer deps. The rest of the package has zero peer requirements.

- `string-helpers/list-of-strings` — requires `react` at runtime (it calls `React.createElement`).
- `brand` — uses `zod`'s `BRAND` type (type-only; erased at build time).

Install `react` / `zod` only if you import those subpaths.

## Manual Release

```sh
pnpm install
pnpm build
pnpm test
npm publish --access public
```
