# Nuxt Cookie First

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

![Nuxt Cookie First](banner.jpg)


Nuxt Cookie First is a powerful and easy-to-use Nuxt.js module that seamlessly
integrates [CookieFirst](https://cookiefirst.com/),
a GDPR and CCPA compliant cookie consent solution, into your Nuxt.js application. This module enables developers to
manage cookies
and user consent with minimal effort while providing an optimal user experience.

# Links

- [Documentation](https://nuxt-cookiefirst.netlify.app)
- [Quick Setup](#quick-setup)

### Quick Setup

1. Add `nuxt-cookie-first` dependency to your project

```bash
# Using pnpm
pnpm add nuxt-cookie-first

# Using yarn
yarn add nuxt-cookie-first

# Using npm
npm install nuxt-cookie-first
```

2. Add `nuxt-cookie-first` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-cookie-first'
  ],
  cookieFirst: {
    // Options
    apiKey: 'YOUR_API_KEY',
    resetTabIndex: false, //If the tabindex of the elements inside the cookie banner layer should be reset to 0
    stealthMode: false, //default false
    silentMode: false, //default false
    language: 'YOUR_DEFAULT_LANGUAGE', //default null
    useEuropeanCDN: true //default true - If the European CDN should be used
  }
})
```

That's it! You can now use Nuxt Cookie First in your Nuxt app ✨

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-cookie-first/latest.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-version-href]: https://npmjs.com/package/nuxt-cookie-first

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-cookie-first.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-downloads-href]: https://npmjs.com/package/nuxt-cookie-first

[license-src]: https://img.shields.io/npm/l/nuxt-cookie-first.svg?style=flat&colorA=18181B&colorB=28CF8D

[license-href]: https://npmjs.com/package/nuxt-cookie-first

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js

[nuxt-href]: https://nuxt.com
