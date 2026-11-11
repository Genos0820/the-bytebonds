import { defineConfig, globalIgnores } from "eslint/config";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * eslint-config-next 16 ships native flat config arrays on its subpath exports,
 * so the FlatCompat wrapper that create-next-app generates for the v15 line is
 * gone — it throws a circular-reference error when validating the v16 config.
 */
export default defineConfig([
  ...coreWebVitals,
  ...typescript,
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
