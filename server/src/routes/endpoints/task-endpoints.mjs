import { Task } from "../../database/schemas/task.mjs";

export async function getTasks(request, response) {
  if (request.session.passport.user !== request.query.email) {
    return response.status(403).send({
      message: "Unauthorized access",
    });
  }

  const tasks = await Task.find({ email: request.query.email });
  return response.status(200).send({ tasks: tasks });
}

export async function createTask(request, response) {
  const task = new Task({
    title: request.body.title,
    email: request.session.passport.user,
    isDone: request.body.isDone,
  });

  try {
    const saveTask = await task.save();
    return response
      .status(200)
      .send({ message: "Task created successfully", task: saveTask });
  } catch (error) {
    return response.status(500).send({ message: "Internal server error" });
  }
}

export async function updateTask(request, response) {
  if (!request.params.id) {
    return response.status(400).send({ error: "ID not found" });
  }

  try {
    const updatedTask = await request.task.updateOne({
      title: request.body.title,
      isDone: request.body.isDone,
    });
    return response
      .status(201)
      .send({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    return response.status(500).send({ message: "Internal server error" });
  }
}

export async function deleteTask(request, response) {
  if (!request.params.id) {
    return response.status(400).send({ error: "ID not found" });
  }
  try {
    await request.task.deleteOne();
    return response.status(201).send({ message: "Task deleted successfully" });
  } catch (error) {
    return response.status(500).send({ message: "Internal server error" });
  }
}
