import { Router } from "express";
import { userLoggedIn } from "../middleware/user-status.mjs";
import { query, validationResult } from "express-validator";
import { Task } from "../database/schemas/task.mjs";
import {
  validateIsDone,
  validateTitle,
} from "../validation/task-validation.mjs";
import { isTaskExist, isTaskOwnerValid } from "../middleware/resolve-task.mjs";
import { handleErrors } from "../middleware/handle-errors.mjs";

export const router = new Router();

router.get(
  "/api/tasks",
  userLoggedIn,
  query("email").exists().withMessage("Email is required"),
  handleErrors,
  async (request, response) => {
    if (request.session.passport.user !== request.query.email) {
      return response.status(403).send({
        message: "Unauthorized access",
      });
    }

    const tasks = await Task.find({ email: request.query.email });
    return response.status(200).send({ tasks: tasks });
  }
);

router.post(
  "/api/tasks",
  userLoggedIn,
  validateTitle,
  validateIsDone,
  handleErrors,
  async (request, response) => {
    const task = new Task({
      title: request.session.passport.user,
      email: request.body.email,
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
);

router.patch(
  "/api/tasks/:id",
  userLoggedIn,
  validateTitle,
  validateIsDone,
  isTaskExist,
  isTaskOwnerValid,
  handleErrors,
  async (request, response) => {
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
);

router.delete(
  "/api/tasks/:id",
  userLoggedIn,
  isTaskExist,
  isTaskOwnerValid,
  async (request, response) => {
    if (!request.params.id) {
      return response.status(400).send({ error: "ID not found" });
    }
    try {
      await request.task.deleteOne();
      return response
        .status(201)
        .send({ message: "Task deleted successfully" });
    } catch (error) {
      return response.status(500).send({ message: "Internal server error" });
    }
  }
);
