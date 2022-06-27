<template>
  <v-container class="mt-10">
    <v-row>
      <v-col>
        <v-card elevation="2">
          <v-card-title class="d-flex">
            <span>Twoje wydatki</span>

            <div class="ml-6" style="width:300px;">
              <v-dialog
                ref="dialog"
                v-model="show_datepicker"
                persistent
                @click:outside="show_datepicker = false"
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateRangeText"
                    label="Zakres dat"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dates"
                  range
                  :first-day-of-week="1"
                  locale="pl"
                  :max="now"
                  show-current
                  show-adjacent-months
                >
                </v-date-picker>
              </v-dialog>
            </div>

          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="6">
                <v-data-table
                  :headers="headers"
                  :items="items"
                  :options.sync="options"
                  :server-items-length="total"
                  :loading="isLoading"
                  class="elevation-1"
                >
                  <template v-slot:item.name="{ item }">
                    {{ item.name | trimLength(30) }}
                  </template>

                  <template v-slot:item.amount="{ item }">
                    {{ item.amount | price }}
                  </template>

                  <template v-slot:item.date_at="{ item }">
                    {{ item.date_at | humanDate }}
                  </template>

                </v-data-table>
              </v-col>
              <v-col md="6">
                <VueApexCharts v-if="chartLoaded" type="donut" :options="chart.options"
                               :series="chart.series"></VueApexCharts>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ResponseErrorsMixins from "~/mixins/ResponseErrorsMixins"
import moment from "moment";

export default {
  mixins: [ResponseErrorsMixins],
  middleware: 'auth',
  data() {
    return {
      now: moment().format('YYYY-MM-DD'),
      dates: [this.$route.query.from,this.$route.query.to],
      show_datepicker: false,
      chartLoaded: false,
      total: 0,
      options: {},
      items: [],
      chart: {
        series: [],
        options: {
          labels: [],
          colors: [],
          chart: {
            type: 'donut',
          },
          tooltip: {
            y: {
              formatter: (value) => {
                return this.$options.filters.price(value)
              }
            }
          }
        },
      },
      headers: [
        {text: 'Nazwa', value: 'name', sortable: false},
        {text: 'Wartość', value: 'amount', sortable: false},
        {text: 'Kategoria', value: 'category.name', sortable: false},
        {text: 'Bank', value: 'bank.name', sortable: false},
        {text: 'Data', value: 'date_at', sortable: false}
      ],
    }
  },
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
    hasValidDates() {
      return this.dates.length === 2;
    }
  },
  watch: {
    dates: {
      async handler(dates) {
        if (this.hasValidDates) {
          this.show_datepicker = false
          await this.$router.push({
            name: this.$route.name,
            query: {
              from: dates[0],
              to: dates[1]
            }
          })
          await this.refetchAll()
        }
      },
      deep: true
    },
    options: {
      async handler() {
        await this.fetchTableData()
      },
      deep: true
    },
  },
  methods: {
    async refetchAll() {
      this.chartLoaded = false
      await this.fetchTableData()
      await this.fetchDonutData()
    },
    async fetchDonutData() {
      try {
        const {data} = await this.$apiExpense.donut(this.dates[0], this.dates[1])
        this.chart.series = data.series.map(s => s.amount)
        this.chart.options.labels = data.series.map(s => s.category)
        this.chart.options.colors = data.series.map(s => s.color)
      } catch (e) {
        console.log(e)
      }

      this.chartLoaded = true;
    },
    resetTable() {
      this.items = []
      this.total = 0
    },
    async refreshTable() {
      this.options.page = 1
      this.resetTable()
      await this.fetchTableData()
    },
    async fetchTableData() {
      try {
        this.resetTable()

        this.isLoading = true

        const {page, itemsPerPage} = this.options

        const {data} = await this.$apiExpense.my(page, itemsPerPage, this.dates[0], this.dates[1])

        this.isLoading = false

        this.items = await data.data
        this.total = data.meta.total
      } catch (e) {
        this.isLoading = false
      }
    },
    async syncDates() {
      this.dates = [
        moment().startOf('month').format('YYYY-MM-DD'),
        moment().endOf('month').format('YYYY-MM-DD')
      ]
    }
  },
  async beforeMount() {
    if (this.dates.filter(Boolean).length === 0) {
      await this.syncDates()
      return;
    }
    await this.fetchDonutData()
  }
}
</script>
