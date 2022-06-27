<template>
  <v-container class="mt-10">
    <v-row>
      <v-col offset-md="3" md="6">
        <v-card>
          <v-card-title>
            <template v-if="error.statusCode === 404">Strona nie została znaleziona</template>
            <template v-else>Wystąpił błąd</template>
          </v-card-title>
          <v-card-text>
            <NuxtLink :to="{ name: 'index' }">Strona główna</NuxtLink>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error' // you can set a custom layout for the error page
}
</script>
