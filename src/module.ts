import {defineNuxtModule, createResolver, addImportsDir, addComponentsDir, addPlugin} from '@nuxt/kit'
import type {Nuxt} from "@nuxt/schema";
import defu from "defu";
import {resolve} from "path";
import {fileURLToPath} from "url";
import {addCustomTab} from "@nuxt/devtools-kit";

// Module options TypeScript interface definition
export interface ModuleOptions {
  apiKey?: string
  stealthMode?: boolean,
  silentMode?: boolean
  language?: string, // 2-letter ISO 639-1 code
  resetTabIndex?: boolean
}

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

    addImportsDir(resolver.resolve(runtimeDir, 'composables'))
    addComponentsDir({
      path: resolver.resolve(runtimeDir, 'components'),
      global: true,
      pathPrefix: false
    })
    addPlugin(resolve(runtimeDir, 'plugin.client'))
    addCustomTab({
      name: 'cookie-first',
      title: 'CookieFirst',
      icon: 'material-symbols:cookie',
      view: {
        type: 'iframe',
        src: '/',
      }
    })
  }
})
