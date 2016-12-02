const http = require('http')

const url = 'http://ipecho.net/plain'
let req = http.get(url, (res) => {
  console.log('Status code:', res.statusCode)

  res.on('readable', () => {
    res.setEncoding('utf8')
    console.log(res.read())
  })
})
