export default defineNuxtConfig({
  compatibilityDate: '2025-07-14',
  modules: ['@nuxt/ui', '@nuxt/fonts', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    apiSecret: '123', // sadece server
    public: {
      apiBase: 'https://mockly.atlaxt.me/api', // hem server hem client
      userKey: 'nuxt-users',
      todoKey: 'nuxt-todos',
    },
  },
})
