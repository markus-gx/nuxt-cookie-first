import type { CookieFirstPanelTabs } from './CookieFirstPanelTabs'
import type { CookieFirstCategories, CookieFirstCategoriesType } from './CookieFirstCategories'
import type { CookieFirstServices } from './CookieFirstServices'

export interface CookieFirst {
  openPanel: (tab?: CookieFirstPanelTabs) => void
  closePanel: () => void
  consent: CookieFirstCategories | null
  acceptedServices: CookieFirstServices | null
  withdrawConsent: () => void
  updateConsent: (categories: CookieFirstCategories) => void
  acceptCategory: (category: CookieFirstCategoriesType) => void
  acceptAllCategories: () => void
  acceptPreselectedCategories: () => void
  declineAllCategories: () => void
  declineCategory: (category: CookieFirstCategoriesType) => void
  acceptService: (service: string | string[]) => void
  declineService: (service: string | string[]) => void
  changeLanguage: (language: string) => void
  renderEmbeds(): void
}
