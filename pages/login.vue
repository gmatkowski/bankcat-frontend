<template>
  <v-container class="mt-10">
    <v-row>
      <v-col offset-md="2" md="8">
        <v-card elevation="2" :loading="isLoading">
          <v-card-title>Logowanie</v-card-title>
          <v-card-text>
            <validation-observer
              ref="observer"
              v-slot="{ invalid, handleSubmit }"
              slim
            >
              <v-form ref="form" :disabled="isLoading" @submit.prevent="handleSubmit(handle)">
                <validation-provider
                  v-slot="{ errors }"
                  name="username"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="form.username"
                    :error-messages="errors"
                    label="E-mail"
                    required
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="password"
                  rules="required|min:8"
                >
                  <v-text-field
                    v-model="form.password"
                    :error-messages="errors"
                    type="password"
                    label="Hasło"
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
                  Zaloguj się
                </v-btn>
              </v-form>

              <div class="text-center text-decoration-underline mt-5">
                <v-btn :to="{ name: 'forgotten-password' }" x-small text>Nie pamiętam hasła</v-btn>
              </div>

            </validation-observer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ResponseErrorsMixins from "~/mixins/ResponseErrorsMixins";

export default {
  mixins: [ResponseErrorsMixins],
  middleware: ['auth'],
  auth: 'guest',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      error: null,
    }
  },
  methods: {
    async handle() {
      this.isLoading = true
      try {
        await this.$auth.loginWith('laravelPassportPassword', {data: this.form})
        await this.$router.push( {name: 'index' } )
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        const {response} = e

        if (response.status === 400) {
          this.$refs[this.observerRef].setErrors({
            username: ['Nieprawidłowe logowanie']
          })
        } else {
          this.handleErrors(e)
        }
      }
    },
  },
}
</script>
