const qs = require('querystring')

let [client_id, client_secret] = process.env.FOURSQUARE_PARAMS.split(';')
let data = {client_id, client_secret}
console.log(qs.stringify(data))
