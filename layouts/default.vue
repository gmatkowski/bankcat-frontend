<template>
  <v-app>
    <TheHeader/>
    <Nuxt/>
    <TheFooter/>
    <Snackbar />
  </v-app>
</template>
<script>
import TheHeader from "@/components/partials/TheHeader"
import TheFooter from "@/components/partials/TheFooter"
import Snackbar from "@/components/support/Snackbar"

export default {
  components: {
    TheHeader,
    TheFooter,
    Snackbar
  }
}
</script>
