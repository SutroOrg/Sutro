import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import packageJsonDependencies from "eslint-plugin-package-json-dependencies";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import { importX } from "eslint-plugin-import-x";
import globals from "globals";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";

const supportedExtensions = [".ts", ".tsx", ".js", ".jsx", ".json", ".d.ts"];

const compat = new FlatCompat({
  baseDirectory: fileURLToPath(new URL(".", import.meta.url)),
});

export { configFilesToIgnore } from "./config-files-to-ignore.js";
export { standardIgnores } from "./standard-ignores.js";

export default [
  {
    files: ["package.json"],
    languageOptions: {
      parser: packageJsonDependencies,
      parserOptions: { extraFileExtensions: [".json"] },
    },
    plugins: {
      "package-json-dependencies": packageJsonDependencies,
    },
    rules: {
      "package-json-dependencies/alphabetically-sorted-dependencies": "error",
      "package-json-dependencies/duplicate-dependencies": "error",
    },
  },
  {
    ignores: ["**/dist/*", "**/build/*", "**/coverage/*"],
  },
  pluginJs.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  ...compat.config({
    plugins: ["workspaces"],
    rules: {
      "workspaces/no-absolute-imports": "error",
      "workspaces/no-relative-imports": "error",
      "workspaces/require-dependency": "warn",
    },
  }),
  {
    files: ["**/*.{ts,tsx}"],
    ...reactHooks.configs["recommended-latest"],
    ...reactPlugin.configs.flat["jsx-runtime"],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    ignores: ["*.json"],
    plugins: {
      "react-hooks": reactHooks,
      "@typescript-eslint": tseslint.plugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImportsPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      reportUnusedDisableDirectives: true,
      "import-x/extensions": supportedExtensions,
      "import-x/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import-x/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: supportedExtensions,
        },
      },
    },
    rules: {
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": { descriptionFormat: "^\\s*TS\\d+.+$" },
          "ts-ignore": true,
          "ts-nocheck": true,
          "ts-check": true,
        },
      ],
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/no-implied-eval": "warn",
      "@typescript-eslint/await-thenable": "warn",
      "@typescript-eslint/restrict-plus-operands": "warn",
      "@typescript-eslint/restrict-template-expressions": "warn",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
      "no-dupe-class-members": "off",
      "simple-import-sort/imports": "error",
      "import-x/no-extraneous-dependencies": "error",
      "import-x/no-unresolved": ["error", { ignore: ["~/.*"] }],
      "import-x/named": "off",
      "import-x/namespace": "off",
      "import-x/default": "off",
      "import-x/no-named-as-default": "off",
      "import-x/no-named-as-default-member": "off",
      "@typescript-eslint/indent": "off",
      "no-unused-vars": "off",
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "no-debugger": "off",
      "require-yield": "off",
      "no-undef": "off",
      "no-empty-function": "off",
      "no-constant-condition": ["error", { checkLoops: false }],
      "no-constant-binary-expression": "error",
      "no-implicit-coercion": [
        "error",
        {
          boolean: true,
          number: true,
          string: true,
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["posthog-js/react"],
              message:
                "Posthog's implementation of this package is broken and causes build errors with Remix. Just import `posthog` from 'posthog-js' instead.",
            },
            {
              group: ["console"],
              importNames: ["assert"],
              message:
                "You probably meant to import from the 'assert' package.",
            },
          ],
        },
      ],
      "no-redeclare": 0,
      "require-await": "off",
      "object-shorthand": "error",
      "no-useless-rename": "error",
      curly: ["error", "all"],
    },
  },
  eslintConfigPrettier,
];
