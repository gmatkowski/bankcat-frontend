<template>
  <v-footer padless fixed>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>{{ title }}</strong>
    </v-col>
  </v-footer>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      title: 'base/title'
    }),
  },
}
</script>
