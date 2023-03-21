import {CookieFirst} from "./CookieFirst";
import {ComputedRef} from "vue";
import {CookieFirstCategories, CookieFirstCategoriesType} from "./CookieFirstCategories";
import {CookieFirstPanelTabs} from "./CookieFirstPanelTabs";
import {CookieFirstServices} from "./CookieFirstServices";

export interface NuxtCookieFirst{
  /**
   * This function will be called when the CookieFirst object is ready
   * @param cb The callback function
   */
  init: (cb: (cookieFirst: CookieFirst) => void) => void;
  /**
   * The CookieFirst object
   */
  cookieFirst: ComputedRef<CookieFirst | null>;
  categories: ComputedRef<CookieFirstCategories | null>;
  services: ComputedRef<CookieFirstServices | null>;
  /**
   * Is triggered when the consent categories change
   * @param cb
   */
  onConsentCategoryChange: (cb: (categories: CookieFirstCategories) => void) => void;
  /**
   * Is triggered when the consent services change
   * @param cb
   */
  onConsentServiceChange: (cb: (services: CookieFirstServices) => void) => void;

  /**
   * Opens the Cookie Preference Center if not currently open.
   * @param tab The tab to open. If not provided, the last opened tab will be used.
   */
  openPanel: (tab?: CookieFirstPanelTabs) => void;
  /**
   * Closes the Cookie Preference Center if currently open.
   */
  closePanel: () => void;
  /**
   * Consent withdraw function will clear the visitor's consent and log such change in our consent log.
   * After this action is performed, website will reload to allow visitor's to have a fresh start on a domain.
   * Banner will be shown again and no methods changing consent will be available until visitor consents again.
   */
  withdrawConsent: () => void;
  /**
   * Update visitors consent categories and set it to the given value.
   * @param categories
   */
  updateConsent: (categories: CookieFirstCategories) => void;
  /**
   * Accept a single consent category
   * @param category
   */
  acceptCategory:(category: CookieFirstCategoriesType) => void;
  /**
   * Accept all consent categories
   */
  acceptAllCategories: () => void;
  /**
   * This function allows you to accept only the categories, which have been previously pre-selected in the domain settings screen in CookieFirst admin panel.
   */
  acceptPreselectedCategories: () => void;
  /**
   * This function allows you to accept only the necessary category and decline all other categories, with one line of code.
   * Although it may seem similar to the withdrawConsent() function, it doesn't erase the consent completely and doesn't show the cookie banner.
   * It updates the consent to have only the necessary cookies enabled.
   */
  declineAllCategories: () => void;
  /**
   * This function allows you to decline only one cookie category and preserve the rest of the consent as it was previously saved.
   * @param category
   */
  declineCategory: (category: CookieFirstCategoriesType) => void;
  /**
   * This function allows you to accept specified services by their unique identifier.
   * If consent policy option is set to "category-based" and not "service-based", the function will accept all categories of which this service is part.
   * @param service
   */
  acceptService: (service: string | string[]) => void;
  /**
   * This function allows you to decline one or multiple services and preserve the rest of the consent as it was previously saved.
   * If consent policy option is set to "category-based" and not "service-based", the function will decline all categories of which this service is part.
   * @param service
   */
  declineService: (service: string | string[]) => void;
  /**
   * This function allows you to change the language of the Cookie Preference Center.
   * @param language - 2-letter ISO 639-1 language code e.g 'en'
   */
  changeLanguage: (language: string) => void;
  /**
   * This function allows you to render all embeds on the page.
   */
  renderEmbeds: () => void;
}
