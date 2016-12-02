const axios = require('axios')

axios.get('http://ipecho.net/plain')
  .then(response => {
    console.log('Status code:', response.status)
    console.log('Response body:', response.data)
  })
