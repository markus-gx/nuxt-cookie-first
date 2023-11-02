import {defineNuxtPlugin, useRuntimeConfig} from "#imports";
import useCookieFirst from "./composables/useCookieFirst";

export default defineNuxtPlugin(() => {
  const resetTabIndex = useRuntimeConfig().public.cookieFirst.resetTabIndex
  if(!resetTabIndex) return;
  const {onLayerReady} = useCookieFirst()
  onLayerReady((layer) => {
    const elements = layer.querySelectorAll('.cookiefirst-root *');

    for (let i = 0; i < elements.length; i++) {
      if(elements[i].attributes.getNamedItem("tabindex")){
        elements[i].attributes.getNamedItem("tabindex")!.value = "0"
      }
    }
  })
})
