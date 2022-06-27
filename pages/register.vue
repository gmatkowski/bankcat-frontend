<template>
  <v-container class="mt-10">
    <v-row>
      <v-col offset-md="2" md="8">
        <v-card elevation="2" :loading="isLoading">
          <v-card-title>Rejestracja</v-card-title>
          <v-card-text>
            <validation-observer
              ref="observer"
              v-slot="{ invalid, handleSubmit }"
              slim
            >
              <v-form ref="form" :disabled="isLoading" @submit.prevent="handleSubmit(handle)">
                <validation-provider
                  v-slot="{ errors }"
                  class="d-flex"
                  tag="div"
                  vid="email"
                  name="adres email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="form.email"
                    name="email"
                    class="flex-grow-1 mr-md-2"
                    label="Adres email"
                    :error-messages="errors"
                    persistent-hint
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  class="d-flex"
                  tag="div"
                  vid="first_name"
                  name="imię"
                  rules="required"
                >
                  <v-text-field
                    v-model="form.first_name"
                    :error-messages="errors"
                    label="Imię"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  class="d-flex"
                  tag="div"
                  vid="last_name"
                  name="nazwisko"
                  rules="required"
                >
                  <v-text-field
                    v-model="form.last_name"
                    :error-messages="errors"
                    label="Nazwisko"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  tag="div"
                  vid="password"
                  name="hasło"
                  rules="required|min:8|password:@password_confirmation"
                >
                  <v-text-field
                    v-model="form.password"
                    :error-messages="errors"
                    name="password"
                    label="Hasło"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  tag="div"
                  vid="password_confirmation"
                  name="powtórz hasło"
                  rules="required|min:8"
                >
                  <v-text-field
                    v-model="form.password_confirmation"
                    :error-messages="errors"
                    name="password_confirmation"
                    label="Powtórz hasło"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </validation-provider>

                <v-btn
                  type="submit"
                  color="blue"
                  dark
                  block
                  class="mt-2"
                >
                  Zarejestruj się
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
      showPassword: false,
      form: {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password_confirmation: ''
      },
      error: null,
    }
  },
  methods: {
    async handle() {
      this.isLoading = true
      try {
        await this.$apiAuth.register(this.form)
        this.isLoading = false

        this.$notifier.showMessage({
          content: 'Twoje konto zostało zarejestrowane, zweryfikuj swój adres email.',
          color: 'green',
          timeout: 10000
        })

        await this.$router.push({name: 'index'})

      } catch (e) {
        this.handleErrors(e)
      }
    },
  },
}
</script>
