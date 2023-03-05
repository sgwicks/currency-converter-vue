<template>
  <div class="converter">
    <currencyAmount />
    <currencySelect v-model="convertFrom" label="Convert From" />
    <p>in</p>
    <currencySelect v-model="convertTo" label="Convert To" />
    <p>is</p>
    <p class="total">
      {{ convertedAmount }}
    </p>
  </div>
</template>

<script>
import currencySelect from "./currencySelect.vue"
import currencyAmount from "./currencyAmount.vue"
import { getRates } from "../api/rates"

export default {
  name: "currencyConverter",
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
      // Don't attempt convert if we don't have all the information yet
      if (!this.amount || !this.convertFrom.length || !this.convertTo.length)
        return 0

      // If both values are the same, the amount is the amount
      if (this.convertFrom === this.convertTo) return this.amount

      // Use "From" as a dictionary to look up "To"
      const rates = this.$store.getters.getRates
      return (rates[this.convertTo.toLowerCase()].rate * this.amount).toFixed(2)
    },
  },
  async mounted() {
    const rates = await getRates("GBP")
    const codes = Object.keys(rates)
    // Since GBP doesn't exist on the GBP conversion rates
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

<style scoped>
.converter {
  display: flex;
  margin-inline: auto;
  flex-wrap: wrap;
  width: 525px;
  max-width: 100%;
  gap: 15px;
}

p {
  margin: 0;
  font-size: 150%;
  line-height: 0.8;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

p.total {
  flex-grow: 1;
}

@media screen and (max-width: 600px) {
  .converter {
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }
  /* Keep this query here because we might not want to style component like this in other places */
  .converter label {
    align-items: center;
    font-weight: 600;
  }
  p:not(.total) {
    display: none;
  }
}
</style>
