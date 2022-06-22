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
                >
                  Zaloguj się
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
import ResponseErrorsMixins from "~/mixins/ResponseErrorsMixins";

export default {
  mixins: [ResponseErrorsMixins],
  auth: 'guest',
  data() {
    return {
      isLoading: false,
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
