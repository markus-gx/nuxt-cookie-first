import {CookieFirstPanelTabs} from "./CookieFirstPanelTabs";
import {CookieFirstCategories} from "./CookieFirstCategories";
import {CookieFirstServices} from "./CookieFirstServices";

export interface CookieFirst{
  acceptAllCategories: () => void;
  openPanel: (tab?: CookieFirstPanelTabs) => void;
  closePanel: () => void;
  consent: CookieFirstCategories | null
  acceptedServices: CookieFirstServices | null
 }
