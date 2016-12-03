const http = require('http')

function coroutine(fn) {
  function run(gen, resolve, value) {
    let result = gen.next(value)
    if (result.done) {
      resolve()
    } else {
      let promise = result.value
      promise.then(value => setImmediate(run, gen, resolve, value))
    }
  }
  return new Promise(resolve => {
    let gen = fn()
    run(gen, resolve)
  })
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

  console.log('Start counting inside coroutine...')
  yield coroutine(function *() {
    for (let i=1; i < 6; i++) {
      console.log(i)
      yield sleep(1)
    }
  })
  console.log('Done!')
})
