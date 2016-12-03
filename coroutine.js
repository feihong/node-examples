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

function fetchStatusCode(url) {
  return new Promise(resolve => {
    http.get(url, res => {
      resolve(res.statusCode)
    })
  })
}

coroutine(function *() {
  console.log('Sleeping for 2 seconds')
  yield sleep(2)
  console.log('Woke up')
  console.log('Number:', yield getNumber())
  // This can actually take quite a bit of time.
  console.log('Response status code:', yield fetchStatusCode('http://youku.com'))
  yield sleep(2)
  console.log('Done!')
})
