export const getRates = () => fetch('http://www.floatrates.com/daily/gbp.json').then(res => res.json()).then(res => res)
