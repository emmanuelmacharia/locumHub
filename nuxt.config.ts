import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image"],
  css: ["./app/assets/css/main.css"],
  // vite plugin for tailwindcss has a type issue; so we cast it to any
  vite: {
    plugins: [tailwindcss()],
  } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
});
