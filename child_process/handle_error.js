/*

If the child process fails, print the error.

*/

const {exec} = require('child_process')

proc = exec('python count.py abc', (error, stdout, stderr) => {
  if (error) {
    console.log('Error:', error)
  }
  console.log(stdout)
})
