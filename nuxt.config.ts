import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        shim: false
      },
      tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
      },    
      modules: ['@nuxtjs/tailwindcss']
})
