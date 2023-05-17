import { completeTask } from "./complete-task.js"
import { createTask } from "./create-task.js"
import { deleteTask } from "./delete-task.js"
import { listTasks } from "./list-tasks.js"
import { updateTask } from "./update-task.js"

const tasksRoutes = [
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask
]

export { tasksRoutes }
