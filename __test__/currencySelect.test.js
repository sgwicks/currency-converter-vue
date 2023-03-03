import { render, waitFor } from "@testing-library/vue"
import userEvent from "@testing-library/user-event"

import currencySelect from "@/components/currencySelect.vue"

import store from "@/store"

const mockRates = {
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

describe("currencySelect", () => {
  test("Displays label prop", () => {
    const { getByRole } = render(currencySelect, {
      store,
      props: {
        label: "From",
        value: "",
      },
    })
    getByRole("combobox", { name: "From" })
  })

  test("Select Currency From", async () => {
    const user = userEvent.setup()
    const { getByRole, emitted } = render(
      currencySelect,
      { store, props: { value: "" } },
      (vue, store) => {
        store.dispatch("setRates", mockRates)
      }
    )
    const dropdown = getByRole("combobox")

    await user.selectOptions(dropdown, "EUR")
    expect(dropdown.value).toBe("EUR")
    await waitFor(() => {
      expect(emitted().selected).toEqual([["EUR"]])
    })
  })
})
