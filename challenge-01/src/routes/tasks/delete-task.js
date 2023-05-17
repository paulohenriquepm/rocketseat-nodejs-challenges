
import { database } from "../../database/index.js"
import { buildRoutePath } from '../../utils/build-route-path.js'

const handler = (req, res) => {
  const { id } = req.params

  const taskToBeUpdated = database.findById('tasks', id)

  if (!taskToBeUpdated) return res.writeHead(404).end(JSON.stringify({ message: `There is no task with id ${id}` }))

  database.delete('tasks', id)

  return res.writeHead(204).end()
}

const deleteTask = {
  method: 'DELETE',
  path: buildRoutePath('/tasks/:id'),
  handler,
}

export { deleteTask }
