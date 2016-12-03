const url = require('url')
const http = require('http')

let options = url.parse('http://baidu.com')
options.method = 'HEAD'
// options.method = 'GET'

let req = http.request(options, res => {
  console.log(res.statusCode)
  res.on('readable', () => {
    res.setEncoding('utf8')
    // Will output null since the response body is empty for HEAD requests
    console.log(res.read())
  })
})
req.end()
