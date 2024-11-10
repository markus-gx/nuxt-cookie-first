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
      ? 'https://consent-eu.cookiefirst.com/banner.js?'
      : 'https://consent.cookiefirst.com/banner.js?'
    useHead({
      script: [
        {
          src: URL + concatAndEncodeURLParams({
            'cookiefirst-key': apiKey,
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
