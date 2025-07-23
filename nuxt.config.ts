import process from 'node:process'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-14',
  modules: ['@nuxt/ui', '@nuxt/fonts', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    apiSecret: '123', // sadece server
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      userKey: process.env.NUXT_PUBLIC_USER_KEY,
      todoKey: process.env.NUXT_PUBLIC_TODO_KEY,
    },
  },
})
