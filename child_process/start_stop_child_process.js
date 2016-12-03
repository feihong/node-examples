/*

On Linux, if you do not specify a shell, you will get /bin/sh by default, and
in that case, sending SIGINT to the child process will NOT cause it to stop.

*/

const {exec} = require('child_process')

let options = {
  shell: '/bin/bash'
}
proc = exec('python count.py', options)
console.log(proc.constructor.name)

proc.stdout.pipe(process.stdout)

// Send interrupt signal after 4 seconds.
setTimeout(() => {
  console.log('Sending SIGINT to child process...')
  proc.kill('SIGINT')
}, 4000)
