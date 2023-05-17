
import { database } from "../../database/index.js"
import { buildRoutePath } from '../../utils/build-route-path.js'

const handler = (req, res) => {
  const { id } = req.params

  const taskToBeUpdated = database.findById('tasks', id)

  if (!taskToBeUpdated) return res.writeHead(404).end(JSON.stringify({ message: `There is no task with id ${id}` }))

  const currentDate = new Date()

  const preparedData = {
    completed_at: currentDate,
    updated_at: currentDate
  }

  database.update('tasks', id, preparedData)

  return res.writeHead(204).end()
}

const completeTask = {
  method: 'PATCH',
  path: buildRoutePath('/tasks/:id/complete'),
  handler,
}

export { completeTask }
