const pathlib = require('path')
const jsonServer = require('json-server')
const Koa = require('koa')

const server = jsonServer.create()
const router = jsonServer.router(pathlib.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

const port = 8000

// Don't load middlewares unless you want that friendly JSON Server intro page.
// server.use(middlewares)

// Add custom route before json-server router.
server.get('/hello/', (req, res) => {
  res.send('Hello there!')
})

// Serve the APIs, e.g. /api/posts/1.
server.use('/api', router)

// Koa middleware serves all other routes.
const koa = new Koa()
koa.use(async (ctx, next) => {
  console.log(`Inside Koa: ${ctx.url}`)
  ctx.body = `<h1>Hello from Koa</h1> Path: <code>${ctx.url}</code>`
})
server.use(koa.callback())


server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`)
})
