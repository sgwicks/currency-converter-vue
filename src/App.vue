<template>
  <div id="app">
    <currencySelect :value="'EUR'" />
    <currencyAmount />
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
  mounted() {
    getRates().then((res) => console.log(res.usd))
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
