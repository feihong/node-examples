
function* getRandomHanzi(n) {
  for (let i=0; i < n; i++) {
    let n = randInt(0x4e00, 0x9fff)
    yield `${n} ${String.fromCharCode(n)}`
  }
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randInt(min, max) {
  let diff = max - min
  return Math.floor(Math.random() * diff + min + 1)
}

console.log('For loop:')
for (let c of getRandomHanzi(10)) {
  console.log(c)
}

console.log('Using generator.next():')
let gen = getRandomHanzi(5)
while (true) {
  let pair = gen.next()
  if (pair.done) {
    break
  } else {
    console.log(pair.value)
  }
}
