export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: true,

  compatibilityDate: '2024-09-20',

  cookieFirst: {
    apiKey: process.env.COOKIE_FIRST_API_KEY,
    // host: process.env.COOKIE_FIRST_HOST,
    stealthMode: false,
    silentMode: false,
    language: 'en',
    resetTabIndex: true,
    // sites: [
    //   {
    //     apiKey: process.env.COOKIE_FIRST_API_KEY,
    //     host: 'wb.at',
    //     stealthMode: false,
    //     silentMode: false,
    //   },
    //   {
    //     apiKey: process.env.COOKIE_FIRST_API_KEY,
    //     stealthMode: true,
    //     host: process.env.COOKIE_FIRST_HOST,
    //     silentMode: true,
    //   },
    // ],
  },
})
