import {CookieFirstPanelTabs} from "./CookieFirstPanelTabs";

export interface CookieFirst{
  acceptAllCategories: () => void;
  openPanel: (tab?: CookieFirstPanelTabs) => void;
  closePanel: () => void;
 }
