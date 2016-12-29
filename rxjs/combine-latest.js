const Rx = require('rxjs/Rx')

function randInt(min, max) {
  let diff = max - min
  return Math.floor(Math.random() * diff + min + 1)
}

function getHanzi() {
  let n = randInt(0x4e00, 0x9fff)
  return String.fromCharCode(n)
}

let charStream = Rx.Observable.timer(1000, 3000).map(() => getHanzi())
// charStream.subscribe(x => console.log(x))
let countStream = Rx.Observable.timer(0, 1000).map(i => i + 1)
// countStream.subscribe(x => console.log(x))

let combinedStream = Rx.Observable.combineLatest(countStream, charStream)
combinedStream.subscribe(x => console.log(x))
