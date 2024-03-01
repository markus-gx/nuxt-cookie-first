export default defineNuxtConfig({
  modules: ['../src/module'],
  cookieFirst: {
    apiKey: process.env.COOKIE_FIRST_API_KEY,
    stealthMode: false,
    silentMode: false,
    language: 'en',
    resetTabIndex: true
  }
})
