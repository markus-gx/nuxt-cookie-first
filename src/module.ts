import {defineNuxtModule, createResolver, addImportsDir} from '@nuxt/kit'
import {Nuxt} from "@nuxt/schema";

// Module options TypeScript interface definition
export interface ModuleOptions {
  apiKey?: string
  stealthMode?: boolean,
  silentMode?: boolean
  language?: string, // 2-letter ISO 639-1 code
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-cookie-first',
    configKey: 'cookieFirst'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup (options: ModuleOptions, nuxt: Nuxt) {
    const resolver = createResolver(import.meta.url)

    if (!options.apiKey) {
      throw new Error('[nuxt-cookie-first] Please provide a valid API Key.')
    }

    nuxt.options.app.head.script?.push({
      src: 'https://consent.cookiefirst.com/banner.js?' + concatAndEncodeURLParams({
        'cookiefirst-key': options.apiKey,
        'stealth-mode': options.stealthMode,
        'silent-mode': options.silentMode,
        'language': options.language
      }),
      async: true
    })

    addImportsDir(resolver.resolve('./runtime/composables'))
    console.info('[🚀]nuxt-swell launched successfully.')
  }
})
const concatAndEncodeURLParams = (params: {[key: string]: any}) => {
  return Object.keys(params).filter(key => params[key]).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(String(params[key]))
  }).join('&')
}
