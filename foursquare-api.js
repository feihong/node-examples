require('isomorphic-fetch')
const qs = require('querystring')

let [client_id, client_secret] = process.env.FOURSQUARE_PARAMS.split(';')
let params = {
  client_id,
  client_secret,
  v: '20161230',
  sortByDistance: 1,
  query: 'movie theater',
  ll: '41.967985,-87.688307',
}
let url = 'https://api.foursquare.com/v2/venues/search?' + qs.stringify(params)
// console.log(url)
fetch(url)
.then(res => res.json())
.then(data => {
  let venues = data.response.venues

  // printVenue(venues[0])
  for (let venue of venues) {
    printVenue(venue)
    console.log('===============')
  }
})

function printVenue(v) {
  console.log(v.name)
  console.log(v.location.address)
  let categories = v.categories.map(c => c.name)
  console.log(categories.join(','))
}
