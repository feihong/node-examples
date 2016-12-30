require('isomorphic-fetch')
const moment = require('moment')
const qs = require('querystring')
const baseUrl = 'http://data.tmsapi.com/v1.1/movies'
const api_key = process.env.GRACENOTE_API_KEY


function getShowings(lat, lng) {
  let params = {
    startDate: moment().format('YYYY-MM-DD'),
    lat,
    lng,
    api_key
  }
  let url = baseUrl + '/showings?' + qs.stringify(params)
  console.log(url)
  return fetch(url)
  .then(res => {
    if (res.status == 200) {
      return res.json()
    } else {
      return Promise.reject(`Received status code ${res.status}: ${res.headers.get('x-error-detail-header')}`)
    }
  })
}

function getTheaters(zip) {
  let params = {
    zip,
    api_key
  }
  let url = baseUrl + '/theatres?' + qs.stringify(params)
  console.log(url)
  return fetch(url)
  .then(res => {
    if (res.status == 200) {
      return res.json()
    } else {
      return Promise.reject(`Received status code ${res.status}: ${res.headers.get('x-error-detail-header')}`)
    }
  })
}

// Unfortunately, the free plan does not give you access to the theaters endpoint.
// getTheaters(60625)
// .then(data => console.log(data))
// .catch(err => console.log(err))

getShowings(41.967985, -87.688307)
.then(data => {
  // console.log(data))
  for (let movie of data) {
    console.log(movie.title)
    console.log(movie.releaseYear)
    console.log(movie.genres.join(', '))
    console.log('=============')
  }
})
