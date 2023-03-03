import Vue from "vue"
import Vuex from "vuex"
import { cloneDeep } from "lodash"

Vue.use(Vuex)

const initial = {
  rates: null,
  from: null,
  to: null,
}

const state = cloneDeep(initial)

const getters = {
  getRates: (state) => state.rates,
  getConvertFrom: (state) => state.from,
  getConvertTo: (state) => state.to,
}

const actions = {
  setRates: ({ commit }, rates) => {
    commit("storeRates", rates)
  },
  setConvertFrom: ({ commit }, code) => {
    commit("convertFrom", code)
  },
  setConvertTo: ({ commit }, code) => {
    commit("convertTo", code)
  },
}

const mutations = {
  storeRates(state, rates) {
    state.rates = rates
  },
  convertFrom(state, code) {
    state.from = code
  },
  convertTo(state, code) {
    state.to = code
  },
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})

export default store
