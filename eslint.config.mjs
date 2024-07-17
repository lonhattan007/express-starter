// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    files: ["src/**/*.ts"],
    ignores: ["**/*.js", "/dist/**/*.js"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
);

// export default tseslint.config(
//   eslint.configs.recommended,
//   ...tseslint.configs.recommended,
// );
