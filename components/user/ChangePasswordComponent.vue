<template>
  <v-card elevation="2" :loading="isLoading">
    <v-card-title>Zmiana hasła</v-card-title>
    <v-card-text>
      <validation-observer
        ref="observer"
        v-slot="{ invalid, handleSubmit }"
        slim
      >
        <v-form ref="form" :disabled="isLoading" @submit.prevent="handleSubmit(handle)">

          <validation-provider
            v-slot="{ errors }"
            tag="div"
            vid="current_password"
            name="aktualne hasło"
            rules="required|min:8"
          >
            <v-text-field
              v-model="form.current_password"
              :error-messages="errors"
              name="current_password"
              label="Aktualne hasło"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
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
          >
            Zmień hasło
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
        current_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    async handle() {
      this.isLoading = true
      try {
        await this.$apiUser.changePassword(
          this.form.current_password,
          this.form.password,
          this.form.password_confirmation
        )
        this.isLoading = false

        this.$notifier.showMessage({
          content: 'Hasło zostało zmienione',
          color: 'green'
        })

      } catch (e) {
        this.handleErrors(e)
      }
    },
  },
}
</script>
