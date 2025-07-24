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
    const URL = useEuropeanCDN
      ? `https://consent-eu.cookiefirst.com/sites/${host}-${apiKey}/consent.js?`
      : `https://consent.cookiefirst.com/sites/${host}-${apiKey}/consent.js?`
    useHead({
      script: [
        {
          src: URL + concatAndEncodeURLParams({
            'stealth-mode': stealthMode,
            'silent-mode': silentMode,
            'language': language,
          }),
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
