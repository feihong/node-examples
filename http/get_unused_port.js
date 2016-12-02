const http = require('http')

let server = http.createServer()
server.listen(0)
server.on('listening', () => {
  console.log('Port:', server.address().port)
  server.close()
})
