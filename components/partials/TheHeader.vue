<template>
  <div>
    <v-app-bar color="blue accent-4" dark>
      <v-toolbar-title class="d-flex">
        <v-btn :to="{ name: 'index' }" plain>
          <v-icon color="white" dark class="mr-3">
            mdi-bank-transfer
          </v-icon>
          {{ title }}
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="align-center d-none d-sm-flex">
        <template v-if="!$auth.loggedIn">
          <v-btn :to="{ name: 'login' }" color="white" text rounded class="my-2">
            Logowanie
          </v-btn>
          <v-btn :to="{ name: 'register' }" color="white" text rounded class="my-2">
            Rejestracja
          </v-btn>
        </template>
        <template v-if="$auth.loggedIn">
          <v-btn @click.prevent="$auth.logout()" color="white" text rounded class="my-2">
            Wyloguj
          </v-btn>
        </template>
      </div>

    </v-app-bar>
  </div>
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
