import {CookieFirst} from "./CookieFirst";
import {ComputedRef} from "vue";
import {CookieFirstCategories} from "./CookieFirstCategories";
import {CookieFirstPanelTabs} from "./CookieFirstPanelTabs";

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
  onConsentCategoryChange: (cb: (categories: CookieFirstCategories) => void) => void;

  /**
   * Opens the Cookie Preference Center if not currently open.
   * @param tab The tab to open. If not provided, the last opened tab will be used.
   */
  openPanel: (tab?: CookieFirstPanelTabs) => void;
  closePanel: () => void;
}
