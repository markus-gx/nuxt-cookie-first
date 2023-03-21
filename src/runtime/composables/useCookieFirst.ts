import {CookieFirst} from "../../types/CookieFirst";
import {NuxtCookieFirst} from "../../types/NuxtCookieFirst";
import {useState} from "#app";
import {watchEffect, computed} from "vue";
import {CookieFirstCategoryEvent} from "../../types/CookieFirstCategoryEvent";
import {CookieFirstServicesEvent} from "../../types/CookieFirstServicesEvent";
import {CookieFirstCategories} from "../../types/CookieFirstCategories";
import {CookieFirstServices} from "../../types/CookieFirstServices";
import {CookieFirstPanelTabs} from "../../types/CookieFirstPanelTabs";
export default function (): NuxtCookieFirst {
  const cookieFirst = useState<CookieFirst | null>('cookie-first', () => null)
  const cookieFirstCategories = useState<CookieFirstCategories | null>('cookie-first-categories', () => null)
  const cookieFirstServices = useState<CookieFirstServices | null>('cookie-first-services', () => null)
  //const acceptedCategories
  if(process.client){
    window.addEventListener('cf_init', () => {
      // @ts-ignore
      cookieFirst.value = window?.CookieFirst
    })
    window.addEventListener("cf_consent", (e: Event) => {
      const event = e as CookieFirstCategoryEvent
      cookieFirstCategories.value = event.detail
    })
    window.addEventListener("cf_services_consent", (e: Event) => {
      const event = e as CookieFirstServicesEvent
      cookieFirstServices.value = event.detail
    })
  }

  const init = (cb: (cookieFirst: CookieFirst) => void) => {
    watchEffect(() =>  {
      if(cookieFirst.value){
        cb(cookieFirst.value)
      }
      //TODO initialize consent categoreis and services change state
    })
  }

  const onConsentCategoryChange = (cb: (categories: CookieFirstCategories) => void) => {
    watchEffect(() => {
      if(cookieFirstCategories.value){
        cb(cookieFirstCategories.value)
      }
    })
  }
  //TODO add onServiceChange

  const openPanel = (tab?: CookieFirstPanelTabs) => {
    if(cookieFirst.value){
      cookieFirst.value.openPanel(tab)
    }
  }

  const closePanel = () => {
    if(cookieFirst.value){
      cookieFirst.value.closePanel()
    }
  }

  return {
    init,
    cookieFirst: computed(() => cookieFirst.value),
    onConsentCategoryChange,
    openPanel,
    closePanel
  }
}
