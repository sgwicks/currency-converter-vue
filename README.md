# Currency Converter Vue

The app was built using TDD practices, writing tests before implementing functionality in order to confirm the logic of the tests. Tests were built using `@testing-library/vue` - I prefer this library for the emphasis on accessibility and user interaction over pure function testing, although it does lean more towards the integration side of testing rather than smaller, separate unit tests.

## currencySelect component

The `currencySelect` component was the first that I designed, and went through a few iterations.

Initially I designed this component to directly interact with the store, using `v-model` on a computed getter/setter value to access store getters and actions. In this case, it would take a prop "fromTo" in order to determine which store actions it was accessing.

After some thought, that seemed overly complex, and so I ended up moving the responsibility for "to" and "from" to the parent, allowing the select component to simply take a value and emit an input. Ultimately this makes the component more re-usable and less complex, at the cost of shifting the extra work of handling values to any parent that might consume it. It becomes a more general "select currency" component, rather than a "select currency to convert" component.

## currencyAmount component

After creating `currencySelect` it was obvious that the next step would be to create the only other input on the page, `currencyAmount`.

In a way this component is less re-usable - since its value is tied directly to the store, any update to this input will update any other instance of this input. Depending on the needs of a larger app, this may well work in favour, or this may be a massive fail.

In the interests of showing use of how I might use the store to communicate between components, I opted not to make this more open-ended, which would have ultimately made it a simple "number input component", but if I had decided to do so I would have done it in a similar way to `currencySelect`, with a `v-model` handling the `value` and `@input` props, and communicating with the store solely in the parent.

For validation, it seemed that using Vue's `v-model.number` and `type="number"` was enough. Although a user can _type_ any value, it will be reset to a number if it isn't one. Vue seems to have me covered here.

## currencyConverter component

The `currencyConverter` component is responsible for most of the computation here. It uses `currencySelect` for both "from" and "to" values and sets them in the store with `v-model`, though it can simply grab `amount` from the store thanks to `currencyAmount` being slightly more intelligent.

It uses a `mounted` event to get a currency daily rate, which it can use to map the available codes. I could have opted for a hardcoded list, but this gives us some leeway on the offchance codes change in future.

Setting the `convertFrom` value is what we use to grab the conversion rates, and then we can use the `convertTo` value as a lookup. The `convertedAmount` computed value has a couple of if statements to make sure we don't crash when we're not ready to compute yet. Otherwise, we always update instantly whenever any value changes.

## Styling

I used scoped styles to style each component, and media queries to handle a basic breakpoint at 600px screen width.

Most of the challenge came from deciding how I wanted the app to display. I wanted to keep the labels for accessibility. I opted to keep everything horizontal on wider screens, and vertical on narrower screens. The extra fluff text only shows on wider screens, where it makes sense, and disappears on narrow screens to declutter, in favour of bold-ing the labels to provide direction instead.

Basic responsiveness is handled by using flex, and a single media query to change flex-direction and centring on smaller screens.

Styles are scoped, which does lead to some duplication of the `label` styling. I wanted this styling to be local to the component (for re-usability) and it seemed small enough not to have too big of a performance impact, though I accept it could get out of control using a similar approach for a larger app.

I went back-and-forth on whether or not to hide the arrows on the number input, and ended up on the side of hiding them. I'm not sure if there's a general consensus on the accessibility of that option.
