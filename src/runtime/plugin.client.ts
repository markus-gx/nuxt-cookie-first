import useCookieFirst from './composables/useCookieFirst'
import { defineNuxtPlugin, useHead, useRuntimeConfig, createError } from '#imports'
import type { CookieFirstOptions, ModuleOptions } from '../module'

const concatAndEncodeURLParams = (params: { [key: string]: unknown }) => {
  return Object.keys(params).filter(key => params[key]).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(String(params[key]))
  }).join('&')
}

const resolveConfiguration = (cookieFirst: ModuleOptions): CookieFirstOptions => {
  const currentHostname = window.location.hostname
  // Handle Multi-Domain Setup
  if (cookieFirst.sites && Array.isArray(cookieFirst.sites)) {
    const matchingConfig = cookieFirst.sites.find((cfg: CookieFirstOptions) => cfg.host === currentHostname)
    if (!matchingConfig) {
      throw createError(`[NuxtCookieFirst] No CookieFirst configuration found for the current hostname: ${currentHostname}`)
    }
    return matchingConfig
  }

  // Handle Single-Domain Setup
  const config = cookieFirst as ModuleOptions
  if (!config.host) {
    config.host = currentHostname
  }
  return config
}

export default defineNuxtPlugin(() => {
  const { public: { cookieFirst } } = useRuntimeConfig()
  const config = resolveConfiguration(cookieFirst)
  if (config.apiKey) {
    const baseURL = config.useEuropeanCDN
      ? 'https://consent-eu.cookiefirst.com'
      : 'https://consent.cookiefirst.com'
    const URL = config.host
      ? `${baseURL}/sites/${config.host}-${config.apiKey}/consent.js?`
      : `${baseURL}/banner.js?`
    const params = config.host
      ? { 'stealth-mode': config.stealthMode, 'silent-mode': config.silentMode, 'language': config.language }
      : { 'cookiefirst-key': config.apiKey, 'stealth-mode': config.stealthMode, 'silent-mode': config.silentMode, 'language': config.language }
    useHead({
      script: [
        {
          src: URL + concatAndEncodeURLParams(params),
          async: true,
        },
      ],
    })
  }

  if (config.resetTabIndex) {
    const { onLayerReady } = useCookieFirst()

    onLayerReady((layer) => {
      const elements = layer.querySelectorAll('.cookiefirst-root *')

      for (let i = 0; i < elements.length; i++) {
        if (elements[i].attributes.getNamedItem('tabindex')) {
          elements[i].attributes.getNamedItem('tabindex')!.value = '0'
        }
      }
    })
  }
})
