const {exec} = require('child_process')

proc = exec('python count.py')
console.log(proc.constructor.name)

proc.stdout.pipe(process.stdout)

// Send interrupt signal after 4 seconds.
setTimeout(() => {
  console.log('Sending SIGINT to child process...')
  proc.kill('SIGINT')
}, 4000)
