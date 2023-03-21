<template>
  <div>
    Nuxt module playground!
    <button @click="openPanel()">
      Open Panel
    </button>
  </div>
</template>

<script setup>
import useCookieFirst from "../src/runtime/composables/useCookieFirst";

const {init, onConsentCategoryChange, openPanel} = useCookieFirst()

init((cookieFirst) => {
  console.log("here in initiation", cookieFirst)
})

onConsentCategoryChange((categories) => {
  console.log("here in onConsentCategoryChange", categories)
})
</script>
