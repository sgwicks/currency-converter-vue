<template>
  <div id="app">
    <currencySelect v-model="convertFrom" label="From" />
    <currencyAmount />
    <currencySelect v-model="convertTo" label="To" />
    <div>
      {{ convertedAmount }}
    </div>
  </div>
</template>

<script>
import currencySelect from "./components/currencySelect.vue"
import currencyAmount from "./components/currencyAmount.vue"
import { getRates } from "./api/rates"

export default {
  name: "App",
  components: {
    currencySelect,
    currencyAmount,
  },
  computed: {
    convertFrom: {
      get() {
        return this.$store.getters.getConvertFrom
      },
      set(val) {
        this.$store.dispatch("setConvertFrom", val)
        this.getFromRates(val)
      },
    },
    convertTo: {
      get() {
        return this.$store.getters.getConvertTo
      },
      set(val) {
        this.$store.dispatch("setConvertTo", val)
      },
    },
    amount() {
      return this.$store.getters.getAmount
    },
    convertedAmount() {
      if (!this.amount || !this.convertFrom.length || !this.convertTo.length)
        return 0
      const rates = this.$store.getters.getRates
      return rates[this.convertTo.toLowerCase()].rate * this.amount
    },
  },
  async mounted() {
    const rates = await getRates("GBP")
    const codes = Object.keys(rates)
    this.$store.dispatch("setCodes", ["GBP", ...codes])
  },
  methods: {
    async getFromRates(val) {
      const rates = await getRates(val)
      this.$store.dispatch("setRates", rates)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
