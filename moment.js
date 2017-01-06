const moment = require('moment')

// Format a date object.
let now = moment()
console.log(now.format('YYYY-MM-DD'))

// Parse a date time string.
let dt = moment('2017-01-05T22:15')
console.log(dt)

// Print out just the time.
console.log(dt.format('h:mm A'))
