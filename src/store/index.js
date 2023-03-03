import Vue from "vue"
import Vuex from "vuex"
import { cloneDeep } from "lodash"

Vue.use(Vuex)

const initial = {
  codes: [],
  rates: [],
  from: "",
  to: "",
  amount: 0,
  fromRates: [],
}

const state = cloneDeep(initial)

const getters = {
  getCodes: (state) => state.codes,
  getRates: (state) => state.rates,
  getConvertFrom: (state) => state.from,
  getConvertTo: (state) => state.to,
  getAmount: (state) => state.amount,
  getFromRates: (state) => state.fromRates,
}

const actions = {
  setCodes: ({ commit }, codes) => {
    commit("storeCodes", codes)
  },
  setRates: ({ commit }, rates) => {
    commit("storeRates", rates)
  },
  setConvertFrom: ({ commit }, code) => {
    commit("convertFrom", code)
  },
  setConvertTo: ({ commit }, code) => {
    commit("convertTo", code)
  },
  setAmount: ({ commit }, amount) => {
    commit("amount", amount)
  },
  setFromRates: ({ commit }, rates) => {
    commit("storeFromRates", rates)
  },
  reset: ({ commit }) => {
    commit("reset")
  },
}

const mutations = {
  storeCodes: (state, codes) => {
    state.codes = codes
  },
  storeRates(state, rates) {
    state.rates = rates
  },
  convertFrom(state, code) {
    state.from = code
  },
  convertTo(state, code) {
    state.to = code
  },
  amount: (state, amount) => {
    state.amount = amount
  },
  storeFromRates: (state, rates) => {
    state.fromRates = rates
  },
  reset: (state) => {
    for (const key in state) {
      state[key] = cloneDeep(initial[key])
    }
  },
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})

export default store
