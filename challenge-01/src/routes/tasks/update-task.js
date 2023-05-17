
import { database } from "../../database/index.js"
import { buildRoutePath } from '../../utils/build-route-path.js'

const handler = (req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  const taskToBeUpdated = database.findById('tasks', id)

  if (!taskToBeUpdated) return res.writeHead(404).end(JSON.stringify({ message: `There is no task with id ${id}` }))
  if (!title && !description) return res.writeHead(400).end(JSON.stringify({ message: `You need to provided a title or description` }))

  const preparedData = {
    updated_at: new Date()
  }

  if (title) Object.assign(preparedData, { title })
  if (description) Object.assign(preparedData, { description })

  database.update('tasks', id, preparedData)

  return res.writeHead(204).end()
}

const updateTask = {
  method: 'PUT',
  path: buildRoutePath('/tasks/:id'),
  handler,
}

export { updateTask }
