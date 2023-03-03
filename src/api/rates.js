export const getRates = async (val = "GBP") => {
  const res = await fetch(`http://www.floatrates.com/daily/${val}.json`)
  const rates = await res.json()
  return rates
}
