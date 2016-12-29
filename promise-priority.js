/*
Show that promise chaining takes priority over setImmediate().

*/

setImmediate(() => {
  console.log('Inside setImmediate callback')
})

Promise.resolve(1)
.then(value => {
  console.log(value)
  return 2
})
.then(value => {
  console.log(value)
  return 3
})
.then(value => {
  console.log(value)
  return 42
})
.then(value => {
  console.log(`Final value ${value}`)
})
