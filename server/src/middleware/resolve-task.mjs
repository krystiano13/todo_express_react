import { Task } from "../database/schemas/task.mjs";

export async function isTaskExist(request, response, next) {
  const task = await Task.findOne({ _id: request.params.id });

  if (!task) {
    return response.status(404).send({ error: "Task not found" });
  }

  next();
}

export async function isTaskOwnerValid(request, response, next) {
  const task = await Task.findOne({ _id: request.params.id });

  if (request.session.passport.user !== task.email) {
    return response.status(403).send({
      message: "Unauthorized access",
    });
  }

  request.task = task;

  next();
}
