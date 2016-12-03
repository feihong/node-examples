const http = require('http')

function coroutine(fn) {
  function run(gen, value) {
    let result = gen.next(value)
    if (!result.done) {
      let promise = result.value
      promise.then(value => setImmediate(run, gen, value))
    }
  }
  let gen = fn()
  run(gen)
}

function sleep(secs) {
  return new Promise(resolve => setTimeout(resolve, secs * 1000))
}

function getNumber() {
  return new Promise(resolve => setTimeout(resolve, 1000, Math.random()))
}

function fetchText(url) {
  return new Promise(resolve => {
    http.get('http://baidu.com', res => {
      res.on('readable', () => {
        res.setEncoding('utf8')
        resolve(res.read())
      })
    })
  })
}

coroutine(function*() {
  console.log('Sleeping for 2 seconds')
  yield sleep(2)
  console.log('Woke up')
  let num = yield getNumber()
  console.log('Number:', num)
  yield sleep(1)
  console.log('Done!')
})
