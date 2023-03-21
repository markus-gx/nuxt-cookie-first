import {useNuxtApp} from "nuxt/app";
import {CookieFirst} from "../../types/CookieFirst";
import {NuxtCookieFirst} from "../../types/NuxtCookieFirst";

export default function (): NuxtCookieFirst {
  const cookieFirst = useState<CookieFirst | null>('cookie-first', () => null)
  if(process.client){
    window.addEventListener('cf_init', () => {
      // @ts-ignore
      cookieFirst.value = window?.CookieFirst
    })
  }

  const init = (cb: (cookieFirst: CookieFirst) => void) => {
    watchEffect(() =>  {
      if(cookieFirst.value){
        cb(cookieFirst.value)
      }
    })
  }
  return {
    init,
    cookieFirst: computed(() => cookieFirst.value)
  }
}
