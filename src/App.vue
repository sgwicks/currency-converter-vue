<template>
  <div id="app">
    <h1>Currency Converter</h1>
    <currencyConverter />
  </div>
</template>

<script>
import currencyConverter from "./components/currencyConverter.vue"

export default {
  name: "App",
  components: {
    currencyConverter,
  },
}
</script>

<style>
/* Not sure I make use of this anywhere, but just in case */
* {
  box-sizing: border-box;
}

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
</style>
