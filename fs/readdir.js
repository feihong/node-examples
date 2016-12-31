const fs = require('fs')

fs.readdir('.', (err, files) => {
  for (let name of files) {
    if (!/^\./.test(name)) {
      console.log(name)
    }
  }
})
