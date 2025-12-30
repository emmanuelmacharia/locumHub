// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default withNuxt(
  {
    rules: prettierConfig.rules,
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },
);
