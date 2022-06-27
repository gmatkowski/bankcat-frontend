<template>
  <v-container>
    <v-card :loading="isLoading">
      <v-card-text class="pa-10">
        <div class="text-center text-h4">Trwa weryfikacja</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import ResponseErrorsMixins from "~/mixins/ResponseErrorsMixins";

export default {
  mixins: [ResponseErrorsMixins],
  auth: 'guest',
  data() {
    return {}
  },
  methods: {
    async check() {
      this.isLoading = true

      setTimeout(async () => {
        try {
          await this.$apiAuth.verify(
            this.$route.params.id,
            this.$route.params.token
          )
          this.isLoading = false

          this.$notifier.showMessage({
            content: 'Twoje konto zostało aktywowane, możesz się już zalogować',
            color: 'green',
            timeout: 10000
          })

          await this.$router.push({name: 'index'})
        } catch (e) {
          this.$notifier.showMessage({
            content: 'Link weryfikacyjny jest niepoprawny.',
            color: 'red',
            timeout: 10000
          })

          await this.$router.push({name: 'index'})
        }
      }, 2000)
    }
  },
  async mounted() {
    await this.check()
  }
}
</script>
