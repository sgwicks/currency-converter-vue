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

<style scoped>
label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

input {
  /** To account for how padding works differently in input vs. select */
  width: 98px;
  padding: 5px;
  margin: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
