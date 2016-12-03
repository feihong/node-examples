/*

Get the IP address, then sleep for 3 seconds, then get the modified time of
this file.

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

let sleep3 = sleep.bind(3)

getIpAddress().then(text => {
  console.log(text)
  return Promise.resolve()
})
.then(() => sleep(3))
.then(() => {
  console.log('Done sleeping')
  return Promise.resolve()
})
.then(() => getModifiedTime('chain_promises.js'))
.then(mtime => {
  console.log('Modified time:', mtime)
})
