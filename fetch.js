// Adds fetch() as a global.
require('isomorphic-fetch')

let offset = Math.floor(Math.random()*1000)

fetch('https://api.github.com/users?since=' + offset)
.then(res => res.json())
.then(data => {
  for (let item of data) {
    console.log(`${item.id}: ${item.login}`)
  }
  console.log(`Fetched ${data.length} results`)
})
