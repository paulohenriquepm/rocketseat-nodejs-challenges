import http from 'node:http'

import { jsonMiddleware } from './middlewares/json.js'
import { routes } from './routes/index.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
  await jsonMiddleware(req, res)

  const { method, url } = req

  const route = routes.find(route => route.method === method && route.path.test(url))

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333, () => console.log('Server listing on 3333...'))
