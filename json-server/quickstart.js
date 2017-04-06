const pathlib = require('path')
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router(pathlib.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

const port = 8000

server.use(middlewares)

// Add custom route before json-server router.
server.get('/hello/', (req, res) => {
  res.send('Hello there!')
})

server.use('/api', router)


server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`)
})
