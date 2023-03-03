import { render } from "@testing-library/vue"
import userEvent from "@testing-library/user-event"

import store from "@/store"

import currencyAmount from "@/components/currencyAmount"

beforeEach(() => {
  store.dispatch("reset")
})

describe("currencyAmount", () => {
  test("Setting value updates store", async () => {
    const user = userEvent.setup()
    const { getByRole } = render(currencyAmount, { store })
    const input = getByRole("spinbutton", { name: "Select Amount" })

    await user.type(input, "32")

    expect(input.value).toBe("32")
    expect(store.getters.getAmount).toBe(32)
  })

  test("Only accepts numbers", async () => {
    const user = userEvent.setup()
    const { getByRole } = render(currencyAmount, { store })
    const input = getByRole("spinbutton", { name: "Select Amount" })

    expect(input.value).toBe("0")
    await user.type(input, "Brian")
    expect(input.value).toBe("0")
    expect(store.getters.getAmount).toBe(0)
  })
})
