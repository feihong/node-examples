const pathlib = require('path')
const jsonServer = require('json-server')
const Koa = require('koa')

const server = jsonServer.create()
const router = jsonServer.router(pathlib.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

const port = 8000

server.use(middlewares)

// Add custom route before json-server router.
server.get('/hello/', (req, res) => {
  res.send('Hello there!')
})

// Add Koa middleware before json-server router.
const koa = new Koa()
koa.use(async (ctx, next) => {
  console.log(`Inside Koa: ${ctx.url}`)
  ctx.body = 'Hello from Koa'
})
server.use('/koa', koa.callback())

// Serve the APIs, e.g. /api/posts/1.
server.use('/api', router)


server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`)
})
