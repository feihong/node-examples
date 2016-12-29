/*
Show that promise chaining takes priority over setImmediate().

Note that calling setImmediate() once in the middle of the chain will allow the
first setImmediate() callback to run before the chain finishes.
*/

setImmediate(() => {
  // You won't see this until the rest of the program has completed.
  console.log('Inside setImmediate callback')
})

let promise = Promise.resolve(1)
for (let i=2; i < 1000; i++) {
  promise = promise.then(value => {
    console.log(value)
    // if (i === 970) {
    //   return new Promise(resolve => setImmediate(resolve, i))
    // }
    return i
  })
}
promise.then(value => {
  console.log(`Final value ${value}`)
})
