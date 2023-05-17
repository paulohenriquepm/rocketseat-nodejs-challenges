import { randomUUID } from 'node:crypto'

import { database } from "../../database/index.js"
import { buildRoutePath } from '../../utils/build-route-path.js'

const handler = (req, res) => {
  const { title, description } = req.body

  if (!title) return res.writeHead(400).end(JSON.stringify({ message: 'Missing required title field' }))
  if (!description) return res.writeHead(400).end(JSON.stringify({ message: 'Missing required description field' }))

  const currentDate = new Date()

  const task = {
    id: randomUUID(),
    title,
    description,
    completed_at: null,
    created_at: currentDate,
    updated_at: currentDate
  }

  database.insert('tasks', task)

  return res.writeHead(201).end()
}

const createTask = {
  method: 'POST',
  path: buildRoutePath('/tasks'),
  handler,
}

export { createTask }
