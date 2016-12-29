const http = require('http')
const coroutine = require('./coroutine')


function getPage(url) {
  return new Promise((resolve, reject) => {
    let req = http.get(url, res => {
      res.on('readable', () => {
        res.setEncoding('utf8')
        resolve(res.read())
      })
    })
    req.on('error', err => reject(err))
  })
}

coroutine(function *() {
  try {
    let text = yield getPage('http://ipecho.ne/plain')
    console.log('IP address:', text)
  } catch (err) {
    console.log('Error caught inside generator function!')
    console.log('Code:', err.code)
    console.log('Host:', err.host)
  }
})
