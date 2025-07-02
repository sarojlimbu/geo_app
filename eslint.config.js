import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";

export default tseslint.config(
  [
    {
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
          ecmaFeatures: { jsx: true },
        },
        globals: {
          ...globals.browser,
          ...globals.node,
        },
      },
      settings: {
        react: { version: "detect" },
        "import/resolver": {
          typescript: {
            project: "./tsconfig.json",
          },
          node: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
          },
        },
      },
      plugins: {
        react,
        "react-hooks": reactHooks,
        import: importPlugin,
        "jsx-a11y": jsxA11y,
        prettier,
      },
      rules: {
        // ✅ Spread all recommended rules first
        ...js.configs.recommended.rules,
        ...tseslint.configs.recommended[0].rules,
        ...react.configs.recommended.rules,
        ...reactHooks.configs.recommended.rules,
        ...jsxA11y.configs.recommended.rules,

        // ✅ Then your overrides
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/ban-ts-comment": "off",

        // Clean code
        "no-console": "warn",
        "no-alert": "warn",
        eqeqeq: "warn",
        "no-debugger": "warn",
        curly: "warn",

        // ✅ Import order with alias support
        "import/order": [
          "warn",
          {
            groups: [
              ["builtin", "external"],
              "internal",
              ["parent", "sibling", "index"],
            ],
            pathGroups: [
              {
                pattern: "@/**",
                group: "internal",
                position: "after",
              },
            ],
            pathGroupsExcludedImportTypes: ["builtin"],
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
            "newlines-between": "always",
          },
        ],

        // ✅ Prettier integration
        "prettier/prettier": "warn",
      },
    },
  ],
  {
    ignores: ["node_modules", "dist"],
  },
);
