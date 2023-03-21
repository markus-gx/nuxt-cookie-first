import {CookieFirst} from "./CookieFirst";

export interface NuxtCookieFirst{
  init: (cb: (cookieFirst: CookieFirst) => void) => void;
  cookieFirst: ComputedRef<CookieFirst | null>;
}
