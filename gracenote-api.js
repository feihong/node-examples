const fs = require('fs')
const axios = require('axios')
const moment = require('moment')
const baseUrl = 'http://data.tmsapi.com/v1.1/movies'
const api_key = process.env.GRACENOTE_API_KEY


function getShowings(lat, lng) {
  let params = {
    startDate: moment().format('YYYY-MM-DD'),
    lat,
    lng,
    api_key
  }
  let url = baseUrl + '/showings'
  return axios.get(url, {params}).then(res => {
      fs.writeFile('response.json', JSON.stringify(res.data, null, 2), () => null)
      return res.data
  })
}

function getTheaters(zip) {
  let params = {
    zip,
    api_key
  }
  let url = baseUrl + '/theatres'
  return axios.get(url, {params})
  .then(res => res.data)
  .catch(err => {
    let res = err.response
    return Promise.reject(`Received status code ${res.status} (${res.statusText}): ${res.headers['x-error-detail-header']}`)
  })
}

// Unfortunately, the free plan does not give you access to the theaters endpoint.
// getTheaters(60625)
// .then(data => console.log(data))
// .catch(err => console.log(err))

getShowings(41.967985, -87.688307)
.then(movies => {
  // console.log(data))
  for (let movie of movies) {
    console.log(movie.title)
    console.log(movie.releaseYear)
    console.log(movie.genres ? movie.genres.join(', ') : 'N/A')
    console.log('=============')
  }
})
