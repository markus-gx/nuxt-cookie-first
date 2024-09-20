export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: true,

  cookieFirst: {
    apiKey: process.env.COOKIE_FIRST_API_KEY,
    stealthMode: false,
    silentMode: false,
    language: 'en',
    resetTabIndex: true
  },

  compatibilityDate: '2024-09-20'
})