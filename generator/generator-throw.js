

function *genFunc() {
  yield 1
  try {
    yield 2
  } catch (err) {
    console.log(`Error caught inside generator function: ${err}`)
  }
  yield 3
  yield 4
}

let gen = genFunc()
console.log(gen.next())
console.log(gen.next())
// This is the only safe point to throw an error into the generator. Any earlier
// or later and the exception will not be caught inside the generator and the
// program will crash.
let result = gen.throw(new Error('A random error occurred'))
console.log(result)
console.log(gen.next())
