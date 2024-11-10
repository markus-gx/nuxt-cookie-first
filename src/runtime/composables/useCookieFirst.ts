import { watchEffect, computed } from 'vue'
import type { NuxtCookieFirst } from '../types/NuxtCookieFirst'
import type { CookieFirst } from '../types/CookieFirst'
import type { CookieFirstCategories, CookieFirstCategoriesType } from '../types/CookieFirstCategories'
import type { CookieFirstServices } from '../types/CookieFirstServices'
import type { CookieFirstCategoryEvent } from '../types/CookieFirstCategoryEvent'
import type { CookieFirstServicesEvent } from '../types/CookieFirstServicesEvent'
import type { CookieFirstPanelTabs } from '../types/CookieFirstPanelTabs'
import type { CookieFirstLayerReadyEvent } from '../types/CookieFirstLayerReadyEvent'
import { useState } from '#app'

export default function (): NuxtCookieFirst {
  const cookieFirst = useState<CookieFirst | null>('cookie-first', () => null)
  const cookieFirstCategories = useState<CookieFirstCategories | null>('cookie-first-categories', () => null)
  const cookieFirstServices = useState<CookieFirstServices | null>('cookie-first-services', () => null)
  const cookieFirstLayer = useState<HTMLElement | null>('cookie-first-layer', () => null)
  // const acceptedCategories
  if (import.meta.client) {
    window.addEventListener('cf_init', () => {
      cookieFirst.value = window?.CookieFirst
      cookieFirstServices.value = cookieFirst.value?.acceptedServices
      cookieFirstCategories.value = cookieFirst.value?.consent
    })
    window.addEventListener('cf_consent', (e: Event) => {
      const event = e as CookieFirstCategoryEvent
      cookieFirstCategories.value = event.detail
    })
    window.addEventListener('cf_services_consent', (e: Event) => {
      const event = e as CookieFirstServicesEvent
      cookieFirstServices.value = event.detail
    })
    window.addEventListener('cf_layer_ready', (e: Event) => {
      const event = e as CookieFirstLayerReadyEvent
      cookieFirstLayer.value = event.detail
    })
  }

  const init = (cb: (cookieFirst: CookieFirst) => void) => {
    watchEffect(() => {
      if (cookieFirst.value) {
        cb(cookieFirst.value)
        cookieFirstCategories.value = cookieFirst.value?.consent
        cookieFirstServices.value = cookieFirst.value?.acceptedServices
      }
    })
  }

  const onConsentCategoryChange = (cb: (categories: CookieFirstCategories) => void) => {
    watchEffect(() => {
      if (cookieFirstCategories.value) {
        cb(cookieFirstCategories.value)
      }
    })
  }

  const onConsentServiceChange = (cb: (services: CookieFirstServices) => void) => {
    watchEffect(() => {
      if (cookieFirstServices.value) {
        cb(cookieFirstServices.value)
      }
    })
  }

  const onLayerReady = (cb: (layer: HTMLElement) => void) => {
    watchEffect(() => {
      if (cookieFirstLayer.value) {
        cb(cookieFirstLayer.value)
      }
    })
  }

  const openPanel = (tab?: CookieFirstPanelTabs) => {
    if (cookieFirst.value) {
      cookieFirst.value.openPanel(tab)
    }
  }

  const closePanel = () => {
    if (cookieFirst.value) {
      cookieFirst.value.closePanel()
    }
  }

  const withdrawConsent = () => {
    if (cookieFirst.value) {
      cookieFirst.value.withdrawConsent()
    }
  }

  const updateConsent = (categories: CookieFirstCategories) => {
    if (cookieFirst.value) {
      cookieFirst.value.updateConsent(categories)
    }
  }

  const acceptCategory = (category: CookieFirstCategoriesType) => {
    if (cookieFirst.value) {
      cookieFirst.value.acceptCategory(category)
    }
  }

  const acceptAllCategories = () => {
    if (cookieFirst.value) {
      cookieFirst.value.acceptAllCategories()
    }
  }

  const acceptPreselectedCategories = () => {
    if (cookieFirst.value) {
      cookieFirst.value.acceptPreselectedCategories()
    }
  }

  const declineAllCategories = () => {
    if (cookieFirst.value) {
      cookieFirst.value.declineAllCategories()
    }
  }

  const declineCategory = (category: CookieFirstCategoriesType) => {
    if (cookieFirst.value) {
      cookieFirst.value.declineCategory(category)
    }
  }

  const acceptService = (service: string | string[]) => {
    if (cookieFirst.value) {
      cookieFirst.value.acceptService(service)
    }
  }

  const declineService = (service: string | string[]) => {
    if (cookieFirst.value) {
      cookieFirst.value.declineService(service)
    }
  }

  const changeLanguage = (language: string) => {
    if (cookieFirst.value) {
      cookieFirst.value.changeLanguage(language)
    }
  }

  const renderEmbeds = () => {
    if (cookieFirst.value) {
      cookieFirst.value.renderEmbeds()
    }
  }

  return {
    init,
    cookieFirst: computed(() => cookieFirst.value),
    categories: computed(() => cookieFirstCategories.value),
    services: computed(() => cookieFirstServices.value),
    onConsentCategoryChange,
    onConsentServiceChange,
    onLayerReady,
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
    changeLanguage,
    renderEmbeds,
  }
}
