import { defineNuxtConfig } from "nuxt";
import eslintPlugin from "vite-plugin-eslint";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL || "http://localhost:8080"
        }
    },
    typescript: {
        shim: false
    },
    tailwindcss: {
        cssPath: "~/assets/css/tailwind.css"
    },
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxt/image-edge"
    ],
    vite: {
        plugins: [eslintPlugin()]
    }
});
