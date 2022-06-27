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

          <v-btn :to="{ name: 'profile-edit' }" color="black" depressed rounded class="mr-2">
            <v-icon class="mr-2">
              mdi-account
            </v-icon>
            {{ $auth.user.first_name }}
          </v-btn>

          <v-btn @click.prevent="expense.dialog.show = true" color="green" depressed rounded class="mr-2">
            <v-icon class="mr-2">
              mdi-cash-plus
            </v-icon>
            Dodaj wydatki
          </v-btn>

          <v-btn :to="{ name: 'expense' }" color="orange" depressed rounded class="mr-2">
            <v-icon class="mr-2">
              mdi-finance
            </v-icon>
            Twoje wydatki
          </v-btn>

          <v-btn @click.prevent="$auth.logout()" color="white" text rounded class="mr-2">
            Wyloguj
          </v-btn>
        </template>
      </div>

      <CreateDialog :dialog.sync="expense.dialog.show" @close="closeExpenseDialog" />

    </v-app-bar>
  </div>
</template>
<script>
import CreateDialog from "~/components/expense/CreateDialog";
import {mapGetters} from "vuex";

export default {
  components: {
    CreateDialog
  },
  data(){
    return {
      expense: {
        dialog: {
          show: false
        }
      }
    }
  },
  methods: {
    closeExpenseDialog(){
      this.expense.dialog.show = false
    }
  },
  computed: {
    ...mapGetters({
      title: 'base/title'
    }),
  },
}
</script>
