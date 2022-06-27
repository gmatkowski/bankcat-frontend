<template>
  <v-container class="mt-10">
    <v-row>
      <v-col>
        <ChangeDataComponent/>
      </v-col>
      <v-col>
        <ChangePasswordComponent/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ChangeDataComponent from "@/components/user/ChangeDataComponent"
import ChangePasswordComponent from "@/components/user/ChangePasswordComponent"

export default {
  components: {
    ChangeDataComponent,
    ChangePasswordComponent
  }
}
</script>
