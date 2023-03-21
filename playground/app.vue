<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup>
const {init} = useCookieFirst()

init((cookieFirst) => {
  console.log("here in initiation", cookieFirst)
})
</script>
