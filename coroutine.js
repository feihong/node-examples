const http = require('http')

// Coroutine function that returns a promise that resolves when the coroutine
// is finished. Accepts a generator function, and assumes that everything
// yielded from the generator function is a promise.
function coroutine(generatorFunction) {
  let gen = generatorFunction()
  return new Promise(resolve => {
    // Handle every single value yielded by the generator function.
    function step(value) {
      let result = gen.next(value)
      if (result.done) {
        // Generator is done, so handle its return value.
        resolve(result.value)
      } else {
        // Generator is not done, so result.value is a promise.
        let promise = result.value
        // When the promise is done, run this function again.
        promise.then(newValue => step(newValue))
      }
    }
    step(undefined)
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

  // This can actually take quite a bit of time. Should yield 302.
  console.log('Response status code:', yield fetchStatusCode('http://youku.com'))

  console.log('Start counting inside coroutine...')
  let result = yield coroutine(function *() {
    for (let i=1; i < 6; i++) {
      console.log(i)
      yield sleep(1)
    }
    return 424242
  })
  console.log(`The "return value" from the coroutine was ${result}`)
  console.log('Done!')
})
