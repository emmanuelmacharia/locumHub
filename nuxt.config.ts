import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  // debug: true,
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "shadcn-nuxt",
    "convex-nuxt",
    "@clerk/nuxt",
  ],
  css: ["./app/assets/css/main.css"],
  // vite plugin for tailwindcss has a type issue; so we cast it to any
  vite: {
    plugins: [tailwindcss()],
  } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "UI",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./app/components/ui",
  },
  convex: {
    url: process.env.CONVEX_URL,
  },
  nitro: {
    plugins: ["./plugins/error-logger.ts"],
  },
});
