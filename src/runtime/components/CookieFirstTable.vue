<template>
  <section>
    <div id="cookiefirst-cookies-table" />
    <slot name="copyright">
      This cookie table has been created and updated by the <a href="https://cookiefirst.com/consent-management-platform/">Consent Management - CookieFirst</a>.
    </slot>
  </section>
</template>

<script setup lang="ts">
import useCookieFirst from '../composables/useCookieFirst'

const { renderEmbeds } = useCookieFirst()
renderEmbeds()
</script>
