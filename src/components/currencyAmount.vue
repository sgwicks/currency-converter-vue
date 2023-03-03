<template>
  <label>
    Select Amount
    <input v-model.number="amount" type="number" />
  </label>
</template>

<script>
export default {
  name: "currencyAmount",
  computed: {
    amount: {
      get() {
        return this.$store.getters.getAmount
      },
      set(val) {
        this.$store.dispatch("setAmount", Math.abs(val))
      },
    },
  },
}
</script>
