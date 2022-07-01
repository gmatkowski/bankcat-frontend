<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
    @keydown="close"
    @click:outside="close"
  >

    <v-card :loading="isLoading">
      <v-card-title class="text-h5">
        Dodaj swoje wydatki
      </v-card-title>

      <validation-observer
        ref="observer"
        v-slot="{ invalid, handleSubmit }"
        slim
      >
        <v-form ref="form" :disabled="isLoading" @submit.prevent="handleSubmit(handle)">
          <v-card-text>
            <validation-provider
              v-slot="{ errors }"
              name="bank"
              rules="required"
            >
              <v-select
                v-model="form.bank"
                :error-messages="errors"
                :items="banks"
                label="Bank"
                item-value="id"
                item-text="name"
                prepend-icon="mdi-bank"
                required
              ></v-select>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="file"
              rules="required"
            >
              <v-file-input
                v-model="form.file"
                :error-messages="errors"
                :disabled="!accepted"
                name="plik"
                :accept="accepted"
                placeholder="Dodaj plik"
                prepend-icon="mdi-file"
                required
                label="Plik"
              ></v-file-input>
            </validation-provider>
          </v-card-text>

          <v-card-actions>

            <v-btn
              color="blue darken-1"
              text
              @click.prevent="close"
              :disabled="isLoading"
            >
              Zamknij
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              type="submit"
              :disabled="isLoading"
            >
              Dodaj
            </v-btn>
          </v-card-actions>

        </v-form>
      </validation-observer>

    </v-card>

  </v-dialog>
</template>
<script>
import ResponseErrorsMixins from "@/mixins/ResponseErrorsMixins";

export default {
  mixins: [ResponseErrorsMixins],
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      banks: [],
      form: {
        file: null,
        bank: null
      }
    }
  },
  computed: {
    accepted() {
      if (!this.form.bank) {
        return null
      }

      const bank = this.banks.find(b => b.id === this.form.bank)
      return bank.decoders.map(decoder => `.${decoder}`).join(', ');
    }
  },
  watch: {
    async dialog(dialog) {
      if (dialog && this.banks.length === 0) {
        await this.fetchBanks()
      }
    }
  },
  methods: {
    close(){
      this.$emit('close')
    },
    async fetchBanks() {
      const {data} = await this.$apiBank.available()
      this.banks = data.data
    },
    async handle() {
      this.isLoading = true

      try {
        let form = new FormData();
        form.append('bank', this.form.bank)
        form.append('file', this.form.file)

        await this.$apiExpense.store(form)

        this.$notifier.showMessage({
          content: 'Wydatki zostały dodane.',
          color: 'green',
          timeout: 5000
        })

        this.isLoading = false

        await this.$router.push({ name: 'expense' })

        this.close()
      }
      catch(e){
        this.handleErrors(e)
      }
    }
  }
}
</script>
