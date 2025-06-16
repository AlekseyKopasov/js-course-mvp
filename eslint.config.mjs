import path from "node:path";
import {fileURLToPath} from "node:url";
import {FlatCompat} from "@eslint/eslintrc";
import js from "@eslint/js";
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nPlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import prettierConfig from 'eslint-config-prettier';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const compat = new FlatCompat({
  baseDirectory: dirName,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const isDev = process.env.NODE_ENV === 'development';

export default [{
  ignores: [
    "**/node_modules/**",
    "**/dist/**",
    "src/ts/vendor/**",
    ".postcssrc.js",
    "**/vite.config.mjs.timestamp-*.mjs"
  ],
}, ...compat.extends("standard-with-typescript", "prettier"), {
  rules: {
    "import/order": ["error", {
      "groups": [
        ["builtin", "external"],
        "internal",
        ["parent", "sibling", "index"],
        "object",
        "type"
      ],
      "pathGroups": [
        {
          "pattern": "@/**",
          "group": "internal",
          "position": "before"
        }
      ],
      "pathGroupsExcludedImportTypes": ["builtin"],
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true
      },
      "newlines-between": "always"
    }],

    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",

    curly: ["error", "all"],

    "no-irregular-whitespace": ["error", {
      skipTemplates: true,
      skipStrings: true,
    }],

    "no-console": ['error', {allow: ['error', 'warn']}],
  },
},
{
  files: ["**/*.js", "**/*.ts", "**/*.tsx"],
  languageOptions: {
    ecmaVersion: 5,
    sourceType: "script",
    parserOptions: {
      project: ["./tsconfig.json", "./tsconfig.node.json"],
      tsconfigRootDir: dirName,
    },
  },
},
{
  files: ['**/*.{js,jsx,ts,tsx}'],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2021,
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
    import: importPlugin,
    'jsx-a11y': jsxA11yPlugin,
    n: nPlugin,
    promise: promisePlugin,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
},
  prettierConfig];
