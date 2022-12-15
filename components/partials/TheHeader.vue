<template>
  <div class="align-center">
    <v-app-bar color="#84CEEB" height="100px" x-large expand>
      <v-container class="d-flex align-content-center flex-wrap">
        <v-toolbar-title class="d-flex" dark>
          <v-btn :to="{ name: 'index' }" plain >
            <img src="/bankcat_logo.png" width="40px" height="40px" class="mr-2"><img>
            {{ title }}
          </v-btn>
        </v-toolbar-title>
        
      </v-container>
      <v-spacer></v-spacer>
        
      <div class="align-center d-none d-sm-flex">
        <template v-if="!$auth.loggedIn">
          <v-btn :to="{ name: 'login' }" color="white" text rounded class="my-4 mr-4" elevation="9" outlined large>
            Logowanie
          </v-btn>
          <v-btn :to="{ name: 'register' }" color="white" text rounded class="my-4 mr-4"  elevation="9" outlined large>
            Rejestracja
          </v-btn>
        </template>
        <template v-if="$auth.loggedIn">

          <v-btn :to="{ name: 'profile-edit' }" color="red" depressed rounded class="mr-2">
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

<style>
.header-color{
  /*background-image: radial-gradient(circle at 50% 250.71%, #f9fb64 0, #e6f85d 16.67%, #d2f558 33.33%, #bcf253 50%, #a5ef50 66.67%, #8ceb50 83.33%, #6fe853 100%);*/
}
</style>
