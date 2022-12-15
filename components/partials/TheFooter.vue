<template>
   
  <v-footer padless shaped class="d-flex flex mt-auto" margin-top="50px">
    <v-card flat tile color="#5680E9" class="bg1" width="100%">
      <template v-if="!$auth.loggedIn">
      <v-card-text class="bg bold--text black--text">
          <p class="justify-content-center">
            <span class="me-3" style="font-size-adjust">Jesteśmy tu po to, aby ułatwić przeanalizowanie wydatków. Jeśli tu jesteś oznacza to, że chcesz zaoszczędzić, pokażemy na co wydajesz najwięcej, nie marnujmy czasu, zarejestruj się i działamy!</span>
            <v-btn :to="{ name: 'register' }" color="error" class="my-4 mr-4"  elevation="3">
              REJESTRACJA
            </v-btn>
          </p> 
      </v-card-text>
      </template>
      <v-divider class="bg"></v-divider>
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text">
        © {{ new Date().getFullYear() }} — Copyright: <strong>{{ title }}</strong>
      </v-card-text>
    </v-card>
  </v-footer>
 
</template>


<script>
  import {mapGetters} from "vuex";
  export default {
      computed:{
      ...mapGetters({
    title: 'base/title'
      }),
    },
    data: ()=>({
      icons: [
        'mdi-facebook',
        'mdi-youtube',
        'mdi-instagram',
        'mdi-twitter',
        
      ],
    })
  }
</script>

<style>
.bg{
  background-color: #84CEEB ;
}
.bg1{
  text-align: center;
}
</style>