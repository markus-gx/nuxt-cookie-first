# Nuxt Cookie First

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt Cookie First is a powerful and easy-to-use Nuxt.js module that seamlessly
integrates [CookieFirst](https://cookiefirst.com/),
a GDPR and CCPA compliant cookie consent solution, into your Nuxt.js application. This module enables developers to
manage cookies
and user consent with minimal effort while providing an optimal user experience.

# Table of Contents

- [Features](#features)
- [Quick Setup](#quick-setup)
- [Composable `useCookieFirst`](#composable-usecookiefirst)
  - [Reactive Properties](#reactive-properties)
  - [Methods / Events](#methods--events)
- [Components](#components)
  - [CookieFirstPolicy](#cookiefirstpolicy)
  - [CookieFirstTable](#cookiefirsttable)

## Features

- GDPR and CCPA compliant cookie management
- User-friendly cookie consent banner with customizable design (See [CookieFirst](https://cookiefirst.com/))
- Supports multilingual applications
- Cookie Policy rendering component
- Fully Typed

## Quick Setup

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
  }
})
```

That's it! You can now use Nuxt Cookie First in your Nuxt app ✨

## Composable `useCookieFirst`

This module comes with only composable called `useCookieFirst` which you can use in your components like:

```javascript
const cf = useCookieFirst()

//or destructure the composable to only make use of certain methods

const {init} = useCookieFirst()
init((cookieFirst) => {
  console.log("Cookie first initiated")
})
```

### Reactive Properties

#### `categories: CookieFirstCategories`

The current consent categories.

**Example**

```vue

<script setup>
const {categories} = useCookieFirst();
console.log(categories.value);
</script>
```

#### `services: CookieFirstServices`

The current consent services.

**Example:**

```vue

<script setup>
const {services} = useCookieFirst();
console.log(services.value);
</script>
```

### Methods / Events

#### `init(callback: (cookieFirst: CookieFirst) => void): void`

This function will be called when CookieFirst is ready.

**Example:**

```vue

<script setup>
const {init} = useCookieFirst();
init((cookieFirst) => {
  console.log('CookieFirst object is ready:', cookieFirst);
});
</script>
```

#### `onConsentCategoryChange(cb: (categories: CookieFirstCategories) => void)`

Is triggered when the consent categories change.

**Example:**

```vue

<script setup>
const {onConsentCategoryChange} = useCookieFirst();
onConsentCategoryChange(categories => {
  console.log('Consent categories changed:', categories);
});
</script>
```

#### `onConsentServiceChange(cb: (services: CookieFirstServices) => void)`

Is triggered when the consent services change.

**Example:**

```vue

<script setup>
const {onConsentServiceChange} = useCookieFirst();
onConsentServiceChange(services => {
  console.log('Consent services changed:', services);
});
</script>
```

#### `onLayerReady(cb: (layer: HTMLElement) => void)`

Is triggered when the layer is visible/ready.

**Example:**

```vue

<script setup>
const {onLayerReady} = useCookieFirst();
onLayerReady(layer => {
  console.log('Layer ready:', layer);
});
</script>
```

#### `openPanel(tab?: "settings" | "cookie" | "policy")`

Opens the Cookie Preference Center if not currently open.
The tab to open can be provided, and if not, the last opened tab will be used.

**Example:**

```vue

<template>
  <button @click="openPanel()">Open Panel</button>
</template>

<script setup>
const {openPanel} = useCookieFirst();
</script>
```

#### `closePanel()`

Closes the Cookie Preference Center if currently open.

**Example:**

```vue

<template>
  <button @click="closePanel()">Close Panel</button>
</template>

<script setup>
const {closePanel} = useCookieFirst();
</script>
```

#### `withdrawConsent()`

Consent withdraw function will clear the visitor's consent and log such change in our consent log. After this action is
performed, the website will reload to allow visitors to have a fresh start on a domain. The banner will be shown again,
and no methods changing consent will be available until the visitor consents again.

**Example:**

```vue

<script setup>
const {withdrawConsent} = useCookieFirst();
withdrawConsent();
</script>
```

#### `updateConsent(categories: CookieFirstCategories)`

Update visitors consent categories and set it to the given value.

**Example:**

```vue

<script setup>
const {updateConsent} = useCookieFirst();
updateConsent({
  advertising: false,
  functional: true,
  necessary: true,
  performance: true
});
</script>
```

#### `acceptCategory(category: 'advertising' | 'functional' | 'necessary' | 'performance')`

Accept a single consent category.

**Example:**

```vue

<script setup>
const {acceptCategory} = useCookieFirst();
acceptCategory('advertising');
</script>
```

#### `acceptAllCategories()`

Accept all consent categories.

**Example:**

```vue

<script setup>
const {acceptAllCategories} = useCookieFirst();
acceptAllCategories();
</script>
```

#### `acceptPreselectedCategories()`

This function allows you to accept only the categories, which have been previously pre-selected in the domain settings
screen in CookieFirst admin panel.

**Example:**

```vue

<script setup>
const {acceptPreselectedCategories} = useCookieFirst();
acceptPreselectedCategories();
</script>
```

#### `declineAllCategories()`

This function allows you to accept only the necessary category and decline all other categories, with one line of code.
Although it may seem similar to the withdrawConsent() function, it doesn't erase the consent completely and doesn't show
the cookie banner. It updates the consent to have only the necessary cookies enabled.

**Example:**

```vue

<script setup>
const {declineAllCategories} = useCookieFirst();
declineAllCategories();
</script>
```

#### `declineCategory(category: 'advertising' | 'functional' | 'necessary' | 'performance')`

This function allows you to decline only one cookie category and preserve the rest of the consent as it was previously
saved.

**Example:**

```vue

<script setup>
const {declineCategory} = useCookieFirst();
declineCategory('advertising');
</script>
```

#### `acceptService(service: string | string [])`

This function allows you to accept specified services by their unique identifier. If consent policy option is set to
“category-based” and not “service-based”, the function will accept all categories of which this service is part.

**Example:**

```vue

<script setup>
const {acceptService} = useCookieFirst();
acceptService('google-analytics');

//or accept multiple services
acceptService(['google-analytics', 'google-tag-manager']);
</script>
```

#### `declineService(service: string | string [])`

This function allows you to decline one or multiple services and preserve the rest of the consent as it was previously
saved. If consent policy option is set to “category-based” and not “service-based”, the function will decline all
categories of which this service is part.

**Example:**

```vue

<script setup>
const {declineService} = useCookieFirst();
declineService('google-analytics');

//or decline multiple services
declineService(['google-analytics', 'google-tag-manager']);
</script>
```

#### `changeLanguage(language: string)`

This function allows you to change the language of the Cookie Preference Center.
The language must be a valid ISO 639-1 language code.

**Example:**

```vue

<script setup>
const {changeLanguage} = useCookieFirst();
changeLanguage('de');
</script>
```

## Components

This module comes with two components that you can use in your application.
They are already auto-imported and ready to use.

### CookieFirstPolicy

Renders your provided Cookie Policy.
You can find the Cookie Policy in your CookieFirst dashboard.

````vue

<template>
  <CookieFirstPolicy/>
</template>

<!-- with copyright slot /-->

<template>
  <CookieFirstPolicy>
    <template #copyright>
      Your custom copyright from CookieFirst
    </template>
  </CookieFirstPolicy>
</template>
````

### CookieFirstTable

Renders a table with all cookies that are used in your application.

```vue

<template>
  <CookieFirstTable/>
</template>

<!-- with copyright slots -->
<template>
  <CookieFirstTable>
    <template #copyright>
      Your custom copyright from CookieFirst
    </template>
  </CookieFirstTable>
</template>
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-cookie-first/latest.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-version-href]: https://npmjs.com/package/nuxt-cookie-first

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-cookie-first.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-downloads-href]: https://npmjs.com/package/nuxt-cookie-first

[license-src]: https://img.shields.io/npm/l/nuxt-cookie-first.svg?style=flat&colorA=18181B&colorB=28CF8D

[license-href]: https://npmjs.com/package/nuxt-cookie-first

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js

[nuxt-href]: https://nuxt.com
