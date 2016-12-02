const shttp = require('socks5-http-client');
const http = require('http')
const url = require('url')

const URL = 'http://ipecho.net/plain'

http.get(URL, (res) => {
  res.on('readable', () => {
    res.setEncoding('utf8')
    console.log('Actual IP address:', res.read())
  })
})

let options = url.parse(URL)
options.socksPort = 15600

shttp.get(options, function(res) {
    res.setEncoding('utf8');
    res.on('readable', function() {
        console.log('Proxy IP address:', res.read())
    });
});
