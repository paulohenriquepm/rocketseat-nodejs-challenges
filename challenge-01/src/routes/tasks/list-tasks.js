import { database } from "../../database/index.js"
import { buildRoutePath } from '../../utils/build-route-path.js'

const handler = (req, res) => {
  const { search } = req.query

  const tasks = database.select('tasks', {
    title: search,
    description: search
  })

  return res.end(JSON.stringify(tasks))
}

const listTasks = {
  method: 'GET',
  path: buildRoutePath('/tasks'),
  handler,
}

export { listTasks }
