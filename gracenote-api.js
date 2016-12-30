require('isomorphic-fetch')
const moment = require('moment')
const qs = require('querystring')


function getTheaters(zipcode) {
  let params = {
    zip: zipcode,
    api_key: process.env.GRACENOTE_API_KEY
  }
  let url = 'http://data.tmsapi.com/v1.1/theatres?' + qs.stringify(params)
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

getTheaters(60625)
.then(data => console.log(data))
.catch(err => console.log(err))
