<template>
  <v-container class="mt-10">
    <v-row>
      <v-col offset-md="2" md="8">
        <v-card elevation="2" :loading="isLoading">
          <v-card-title>Reset hasła</v-card-title>
          <v-card-text>
            <validation-observer
              ref="observer"
              v-slot="{ invalid, handleSubmit }"
              slim
            >
              <v-form ref="form" :disabled="isLoading" @submit.prevent="handleSubmit(handle)">
                <validation-provider
                  v-slot="{ errors }"
                  name="email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="form.email"
                    :error-messages="errors"
                    label="E-mail"
                    required
                  ></v-text-field>
                </validation-provider>

                <v-btn
                  type="submit"
                  color="blue"
                  dark
                  block
                  class="mt-2"
                >
                  Resetuj hasło
                </v-btn>
              </v-form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ResponseErrorsMixins from "@/mixins/ResponseErrorsMixins";

export default {
  mixins: [ResponseErrorsMixins],
  middleware: ['auth'],
  auth: 'guest',
  data() {
    return {
      form: {
        email: '',
      },
      error: null,
    }
  },
  methods: {
    async handle() {
      this.isLoading = true
      try {
        await this.$apiAuth.forgotten(this.form.email)
        await this.$router.push( {name: 'index' } )

        this.$notifier.showMessage({
          content: 'Jeżeli znaleźliśmy Twoje konto to na podany adres email wysłana została wiadomość zmieniająca Twoje hasło. Sprawdź skrzynkę pocztową.',
          color: 'green',
          timeout: 10000
        })

        this.isLoading = false
      } catch (e) {
        this.handleErrors(e)
      }
    },
  },
}
</script>
