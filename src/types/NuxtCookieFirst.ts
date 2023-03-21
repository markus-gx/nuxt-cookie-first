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
}
