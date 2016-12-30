/*
Unfortunately, this library currently doesn't work because it was using Google
Showtimes, which was discontinued on November 1, 2016.

https://github.com/erunion/showtimes/issues/47
*/

const Showtimes = require('showtimes')

function getTheaters(location) {
  return new Promise((resolve, reject) => {
    let api = new Showtimes(location, {})
    api.getTheaters((error, theaters) => {
      console.log(error, theaters)
      if (error) {
        reject(error)
      } else {
        resolve(theaters)
      }
    })
  })
}

getTheaters('41.967985,-87.688307')
.then(theaters => {
  console.log(theaters)
})
.cath(error => console.log(error))
