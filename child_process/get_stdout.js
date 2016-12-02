/*

child_process.exec docs:
https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback

When you run this program normally, it will print something like
`Python 2.7.12`. If you run it while a Python 3 virtualenv is activated, it will
print something like `Python 3.5.2`.

*/

const {exec} = require('child_process')

exec('python --version', (error, stdout, stderr) => {
  if (stdout) console.log(stdout)
  if (stderr) console.log(stderr)
})

// exec('python count.py 3', (error, stdout, stderr) => {
//   console.log(stdout)
// })
