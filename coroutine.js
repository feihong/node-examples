
// Coroutine function that returns a promise that resolves when the coroutine
// is finished. Accepts a generator function, and assumes that everything
// yielded from the generator function is a promise.
module.exports = function coroutine(generatorFunction) {
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
