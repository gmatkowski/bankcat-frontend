<template>
  <v-card elevation="2" :loading="isLoading">
    <v-card-title>Dane użytkownika</v-card-title>
    <v-card-text>
      <validation-observer
        ref="observer"
        v-slot="{ invalid, handleSubmit }"
        slim
      >
        <v-form ref="form" :disabled="isLoading" @submit.prevent="handleSubmit(handle)">

          <validation-provider
            v-slot="{ errors }"
            name="first_name"
            rules="required|min:3"
          >
            <v-text-field
              v-model="form.first_name"
              :error-messages="errors"
              label="Imię"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="last_name"
            rules="required|min:3"
          >
            <v-text-field
              v-model="form.last_name"
              :error-messages="errors"
              label="Nazwisko"
              required
            ></v-text-field>
          </validation-provider>

          <v-btn
            type="submit"
            color="blue"
            dark
            block
          >
            Zapisz
          </v-btn>
        </v-form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>
<script>
import ResponseErrorsMixins from "~/mixins/ResponseErrorsMixins";

export default {
  mixins: [ResponseErrorsMixins],
  data() {
    return {
      form: {
        first_name: this.$auth.user.first_name,
        last_name: this.$auth.user.last_name
      }
    }
  },
  methods: {
    async handle() {
      this.isLoading = true
      try {
        await this.$apiUser.update(this.form)
        await this.$auth.fetchUser();
        this.isLoading = false

        this.$notifier.showMessage({
          content: 'Zapisano',
          color: 'green'
        })

      } catch (e) {
        this.handleErrors(e)
      }
    },
  },
}
</script>
