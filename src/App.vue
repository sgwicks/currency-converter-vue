<template>
  <div id="app">
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
      if (this.convertFrom === this.convertTo) return this.amount
      const rates = this.$store.getters.getRates
      return (rates[this.convertTo.toLowerCase()].rate * this.amount).toFixed(2)
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
/* These styles come with vue-cli */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/** These are from W3 Schools: hide number input arrows */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/** These are my styles */
.converter {
  display: flex;
  margin-inline: auto;
  flex-wrap: wrap;
  width: 550px;
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
  justify-self: center;
}

label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

input,
select {
  width: 110px;
  padding: 5px;
  margin: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input {
  /** To account for how padding works differently in input vs. select */
  width: 98px;
}

@media screen and (max-width: 600px) {
  .converter {
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }
  label {
    align-items: center;
    font-weight: 600;
  }
  p:not(.total) {
    display: none;
  }
}
</style>
