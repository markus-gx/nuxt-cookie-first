import {defineNuxtModule, createResolver, addImportsDir, addComponentsDir, addPlugin, useLogger} from '@nuxt/kit'
import type {Nuxt} from "@nuxt/schema";
import defu from "defu";
import {resolve} from "path";
import {fileURLToPath} from "url";

// Module options TypeScript interface definition
export interface ModuleOptions {
  apiKey?: string
  stealthMode?: boolean,
  silentMode?: boolean
  language?: string, // 2-letter ISO 639-1 code
  resetTabIndex?: boolean
}

const logger = useLogger("nuxt-cookie-first");

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-cookie-first',
    configKey: 'cookieFirst'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options: ModuleOptions, nuxt: Nuxt) {
    const resolver = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    nuxt.options.runtimeConfig.public.cookieFirst = defu(nuxt.options.runtimeConfig.public.cookieFirst, options)

    if (nuxt.options.runtimeConfig.public.cookieFirst.apiKey) {
      nuxt.options.app.head.script?.push({
        src: 'https://consent.cookiefirst.com/banner.js?' + concatAndEncodeURLParams({
          'cookiefirst-key': nuxt.options.runtimeConfig.public.cookieFirst.apiKey,
          'stealth-mode': nuxt.options.runtimeConfig.public.cookieFirst.stealthMode,
          'silent-mode': nuxt.options.runtimeConfig.public.cookieFirst.silentMode,
          'language': nuxt.options.runtimeConfig.public.cookieFirst.language
        }),
        async: true
      })
    } else {
      logger.warn('Please provide a valid API Key.')
    }

    addImportsDir(resolver.resolve(runtimeDir, 'composables'))
    addComponentsDir({
      path: resolver.resolve(runtimeDir, 'components'),
      global: true,
      pathPrefix: false
    })
    addPlugin(resolve(runtimeDir, 'plugin'))

  }
})
const concatAndEncodeURLParams = (params: { [key: string]: any }) => {
  return Object.keys(params).filter(key => params[key]).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(String(params[key]))
  }).join('&')
}
