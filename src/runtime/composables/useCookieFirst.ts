import {CookieFirst} from "../../types/CookieFirst";
import {NuxtCookieFirst} from "../../types/NuxtCookieFirst";
import {useState} from "#app";
import {watchEffect, computed} from "vue";
import {CookieFirstCategoryEvent} from "../../types/CookieFirstCategoryEvent";
import {CookieFirstServicesEvent} from "../../types/CookieFirstServicesEvent";
import {
  CookieFirstCategories,
  CookieFirstCategoriesType
} from "../../types/CookieFirstCategories";
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
        cookieFirstCategories.value = cookieFirst.value?.consent
        cookieFirstServices.value = cookieFirst.value?.acceptedServices
      }
    })
  }

  const onConsentCategoryChange = (cb: (categories: CookieFirstCategories) => void) => {
    watchEffect(() => {
      if(cookieFirstCategories.value){
        cb(cookieFirstCategories.value)
      }
    })
  }

  const onConsentServiceChange = (cb: (services: CookieFirstServices) => void) => {
    watchEffect(() => {
      if(cookieFirstServices.value){
        cb(cookieFirstServices.value)
      }
    })
  }

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

  const withdrawConsent = () => {
    if(cookieFirst.value){
      cookieFirst.value.withdrawConsent()
    }
  }

  const updateConsent = (categories: CookieFirstCategories) => {
    if(cookieFirst.value){
      cookieFirst.value.updateConsent(categories)
    }
  }

  const acceptCategory = (category: CookieFirstCategoriesType) => {
    if(cookieFirst.value){
      cookieFirst.value.acceptCategory(category)
    }
  }

  const acceptAllCategories = () => {
    if(cookieFirst.value){
      cookieFirst.value.acceptAllCategories()
    }
  }

  const acceptPreselectedCategories = () => {
    if(cookieFirst.value){
      cookieFirst.value.acceptPreselectedCategories()
    }
  }

  const declineAllCategories = () => {
    if(cookieFirst.value){
      cookieFirst.value.declineAllCategories()
    }
  }

  const declineCategory = (category: CookieFirstCategoriesType) => {
    if(cookieFirst.value){
      cookieFirst.value.declineCategory(category)
    }
  }

  const acceptService = (service: string | string[]) => {
    if(cookieFirst.value){
      cookieFirst.value.acceptService(service)
    }
  }

  const declineService = (service: string | string[]) => {
    if(cookieFirst.value){
      cookieFirst.value.declineService(service)
    }
  }

  const changeLanguage = (language: string) => {
    if(cookieFirst.value){
      cookieFirst.value.changeLanguage(language)
    }
  }

  return {
    init,
    cookieFirst: computed(() => cookieFirst.value),
    onConsentCategoryChange,
    onConsentServiceChange,
    openPanel,
    closePanel,
    withdrawConsent,
    updateConsent,
    acceptCategory,
    acceptAllCategories,
    acceptPreselectedCategories,
    declineAllCategories,
    declineCategory,
    acceptService,
    declineService,
    changeLanguage
  }
}
