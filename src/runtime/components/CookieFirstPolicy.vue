<template>
  <section>
    <div id="cookiefirst-policy-page" />
    <slot name="copyright">
      This cookie policy has been created and updated by <a href="https://cookiefirst.com/consent-management-platform/">Consent Management Platform - CookieFirst</a>.
    </slot>
  </section>
</template>

<script setup lang="ts">
import useCookieFirst from '../composables/useCookieFirst'

const { renderEmbeds } = useCookieFirst()
renderEmbeds()
</script>
