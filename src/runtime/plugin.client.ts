import { defineNuxtPlugin, useHead, useRuntimeConfig } from '#imports';
import useCookieFirst from "./composables/useCookieFirst";

const concatAndEncodeURLParams = (params: { [key: string]: any }) => {
  return Object.keys(params).filter(key => params[key]).map(key => {
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
        resetTabIndex
      }
    }
  } = useRuntimeConfig();

  if (apiKey) {
    useHead({
      script: [
        {
          src: 'https://consent.cookiefirst.com/banner.js?' + concatAndEncodeURLParams({
            'cookiefirst-key': apiKey,
            'stealth-mode': stealthMode,
            'silent-mode': silentMode,
            'language': language
          }),
          async: true
        }
      ]
    })
  }

  if(resetTabIndex) {
    const {onLayerReady} = useCookieFirst()

    onLayerReady((layer) => {
      const elements = layer.querySelectorAll('.cookiefirst-root *');

      for (let i = 0; i < elements.length; i++) {
        if(elements[i].attributes.getNamedItem("tabindex")){
          elements[i].attributes.getNamedItem("tabindex")!.value = "0"
        }
      }
    })
  }
})
