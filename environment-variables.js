let value = process.env.FOURSQUARE_PARAMS
// console.log(value)
let [clientId, clientSecret] = value.split(';')
console.log('Client ID:', clientId)
console.log('Client secret:', clientSecret)
