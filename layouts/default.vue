<template>
  <v-app>
    <TheHeader/>
    <Nuxt/>
    <TheFooter/>
  </v-app>
</template>
<script>
import TheHeader from "@/components/partials/TheHeader"
import TheFooter from "@/components/partials/TheFooter"

export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>
