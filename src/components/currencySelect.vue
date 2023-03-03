<template>
  <label>
    {{ label }}
    <select v-model="selected">
      <option disabled value="">Please Select</option>
      <option v-for="code in codes" :key="code">
        {{ code.toUpperCase() }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  name: "CurrencySelect",
  props: {
    label: {
      type: String,
      default: "Select Currency",
    },
    value: {
      required: true,
      type: String,
    },
  },
  computed: {
    codes() {
      return this.$store.getters.getCodes
    },
    selected: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val)
      },
    },
  },
}
</script>
