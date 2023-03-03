import { render, waitFor } from "@testing-library/vue"
import userEvent from "@testing-library/user-event"

import store from "@/store"
import { getRates } from "@/api/rates"
jest.mock("@/api/rates")

const mockGBPRates = {
  usd: {
    code: "USD",
    alphaCode: "USD",
    numericCode: "840",
    name: "U.S. Dollar",
    rate: 1.2056044480862,
    date: "Thu, 2 Mar 2023 11:55:01 GMT",
    inverseRate: 0.82945944798677,
  },
  eur: {
    code: "EUR",
    alphaCode: "EUR",
    numericCode: "978",
    name: "Euro",
    rate: 1.132456175138,
    date: "Thu, 2 Mar 2023 11:55:01 GMT",
    inverseRate: 0.88303637876154,
  },
  jpy: {
    code: "JPY",
    alphaCode: "JPY",
    numericCode: "392",
    name: "Japanese Yen",
    rate: 163.84863692601,
    date: "Thu, 2 Mar 2023 11:55:01 GMT",
    inverseRate: 0.0061031938913938,
  },
  aud: {
    code: "AUD",
    alphaCode: "AUD",
    numericCode: "036",
    name: "Australian Dollar",
    rate: 1.7860592335656,
    date: "Thu, 2 Mar 2023 11:55:01 GMT",
    inverseRate: 0.55989184524617,
  },
}

const mockEURRates = {
  usd: {
    code: "USD",
    alphaCode: "USD",
    numericCode: "840",
    name: "U.S. Dollar",
    rate: 1.0617774561038,
    date: "Fri, 3 Mar 2023 11:55:01 GMT",
    inverseRate: 0.94181694502113,
  },
  gbp: {
    code: "GBP",
    alphaCode: "GBP",
    numericCode: "826",
    name: "U.K. Pound Sterling",
    rate: 0.88699954277792,
    date: "Fri, 3 Mar 2023 11:55:01 GMT",
    inverseRate: 1.1273962970355,
  },
  jpy: {
    code: "JPY",
    alphaCode: "JPY",
    numericCode: "392",
    name: "Japanese Yen",
    rate: 144.95934193807,
    date: "Fri, 3 Mar 2023 11:55:01 GMT",
    inverseRate: 0.0068984860625761,
  },
  aud: {
    code: "AUD",
    alphaCode: "AUD",
    numericCode: "036",
    name: "Australian Dollar",
    rate: 1.5751022782784,
    date: "Fri, 3 Mar 2023 11:55:01 GMT",
    inverseRate: 0.63487940674748,
  },
}

getRates.mockImplementation(() => Promise.resolve(mockGBPRates))

import App from "@/App.vue"

describe("App", () => {
  test("Sends rates to store", () => {
    render(App, { store })
    waitFor(() => {
      expect(store.getters.getCodes).toEqual([
        "GBP",
        ...Object.keys(mockGBPRates),
      ])
    })
  })

  test("Displays a dropdown for from and to", async () => {
    const user = userEvent.setup()
    const { getByRole } = render(App, { store })
    await waitFor(() => {
      expect(store.getters.getCodes).toEqual([
        "GBP",
        ...Object.keys(mockGBPRates),
      ])
    })

    getRates.mockImplementationOnce(() => Promise.resolve(mockEURRates))

    const fromSelect = getByRole("combobox", { name: "From" })
    const toSelect = getByRole("combobox", { name: "To" })

    await user.selectOptions(fromSelect, "EUR")
    await user.selectOptions(toSelect, "USD")

    expect(store.getters.getConvertFrom).toBe("EUR")
    expect(store.getters.getRates).toEqual(mockEURRates)
    expect(store.getters.getConvertTo).toBe("USD")
  })

  test("Displays converted currency", async () => {
    const user = userEvent.setup()
    const { getByRole, getByText } = render(App, { store })
    await waitFor(() => {
      expect(store.getters.getCodes).toEqual([
        "GBP",
        ...Object.keys(mockGBPRates),
      ])
    })

    getRates.mockImplementationOnce(() => Promise.resolve(mockEURRates))

    const fromSelect = getByRole("combobox", { name: "From" })
    const toSelect = getByRole("combobox", { name: "To" })
    const amountInput = getByRole("spinbutton")

    await user.selectOptions(fromSelect, "EUR")
    await user.selectOptions(toSelect, "USD")
    await user.type(amountInput, "32")

    expect(store.getters.getConvertFrom).toBe("EUR")
    expect(store.getters.getConvertTo).toBe("USD")
    const conversion = 32 * 1.0617774561038

    getByText(conversion)
  })
})
