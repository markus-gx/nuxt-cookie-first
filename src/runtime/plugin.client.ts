import useCookieFirst from './composables/useCookieFirst'
import { defineNuxtPlugin, useHead, useRuntimeConfig } from '#imports'

const concatAndEncodeURLParams = (params: { [key: string]: unknown }) => {
  return Object.keys(params).filter(key => params[key]).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(String(params[key]))
  }).join('&')
}

export default defineNuxtPlugin(() => {
  const {
    public: {
      cookieFirst: {
        apiKey,
        host,
        stealthMode,
        silentMode,
        language,
        resetTabIndex,
        useEuropeanCDN,
      },
    },
  } = useRuntimeConfig()

  if (apiKey) {
    const baseURL = useEuropeanCDN
      ? 'https://consent-eu.cookiefirst.com'
      : 'https://consent.cookiefirst.com'
    const URL = host
      ? `${baseURL}/sites/${host}-${apiKey}/consent.js?`
      : `${baseURL}/banner.js?`
    const params = host
      ? { 'stealth-mode': stealthMode, 'silent-mode': silentMode, 'language': language }
      : { 'cookiefirst-key': apiKey, 'stealth-mode': stealthMode, 'silent-mode': silentMode, 'language': language }

    if (!host) {
      // If no host is provided, we assume the user uses the legacy/deprecated version of CookieFirst.
      console.warn('⚠️ DEPRECATED: The "host" option is not provided. The legacy version will be used but will be removed in the next major release (v1.1.0).')
      console.warn('⚠️ MIGRATION: Update your configuration to include the "host" parameter to use the latest CookieFirst version.')
      console.warn('📝 For more information, please refer to: https://github.com/markus-gx/nuxt-cookie-first/pull/10#issuecomment-3057687300')
    }
    useHead({
      script: [
        {
          src: URL + concatAndEncodeURLParams(params),
          async: true,
        },
      ],
    })
  }

  if (resetTabIndex) {
    const { onLayerReady } = useCookieFirst()

    onLayerReady((layer) => {
      const elements = layer.querySelectorAll('.cookiefirst-root *')

      for (let i = 0; i < elements.length; i++) {
        if (elements[i].attributes.getNamedItem('tabindex')) {
          elements[i].attributes.getNamedItem('tabindex')!.value = '0'
        }
      }
    })
  }
})
