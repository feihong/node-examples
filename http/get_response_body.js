const http = require('http')

const url = 'http://ipecho.net/plain'
let req = http.get(url, (res) => {
  console.log('Status code:', res.statusCode)

  let body = []

  res.on('data', chunk => {
    body.push(chunk)
  })
  res.on('end', () => {
    console.log('Response body:', body.join(''))
  })
})
