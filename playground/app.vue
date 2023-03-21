<template>
  <div>
    Nuxt module playground!
    <div>
      <button @click="openPanel()">
        Open Panel
      </button>
    </div>
    <div>
      <button @click="changeLang">
        Change lang to en and open panel
      </button>
    </div>
    <CookieFirstPolicy />
    <CookieFirstTable />
  </div>
</template>

<script setup>
import useCookieFirst from "../src/runtime/composables/useCookieFirst";

const {init, onConsentCategoryChange, openPanel, changeLanguage} = useCookieFirst()

init((cookieFirst) => {
  console.log("here in initiation", cookieFirst)
})

onConsentCategoryChange((categories) => {
  console.log("here in onConsentCategoryChange", categories)
})

const changeLang = () => {
  changeLanguage("en")
  openPanel()
}
</script>
