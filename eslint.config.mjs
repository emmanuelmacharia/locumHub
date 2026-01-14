// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  // Your custom configs here
  rules: {
    "vue/no-multiple-template-root": "off",
    "no-console": ["warn"],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "any", // Allow both <img> and <img />
        },
      },
    ],
  },
  ignores: ["**/convex/_generated", "**/app/components/ui/*"],
});
