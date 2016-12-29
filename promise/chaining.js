/*

Demonstrate how to chain promises together. Note that it's not necessary for
each callback to return a Promise object.

*/

const http = require('http')
const fs = require('fs')

function getIpAddress() {
  return new Promise(resolve => {
    http.get('http://ipecho.net/plain', res => {
      res.on('readable', () => {
        res.setEncoding('utf8')
        resolve(res.read())
      })
    })
  })
}

function sleep(seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
  })
}

function getModifiedTime(path) {
  return new Promise(resolve => {
    fs.stat(path, (err, stats) => {
      resolve(stats.mtime)
    })
  })
}

// Source: https://www.sitepoint.com/currying-in-functional-javascript/
function curry(fn) {
  let parameters = Array.prototype.slice.call(arguments, 1)
  return function() {
    return fn.apply(this, parameters.concat(
      Array.prototype.slice.call(arguments, 0)
    ))
  }
}


getIpAddress()
.then(ipAddress => {
  console.log(`Your IP address is: ${ipAddress}`)
  console.log("Now it's time to sleep for a while")
  return sleep(3)
})
.then(() => {
  console.log('Woke up!')
  return 12345    // not a promise
})
.then(num => console.log(`Got a number from the previous promise: ${num}`))
// You can avoid defining a callback function by using curry.
.then(curry(getModifiedTime, 'chain_promises.js'))
.then(mtime => {
  console.log(`This file was last modified at: ${mtime}`)
})
