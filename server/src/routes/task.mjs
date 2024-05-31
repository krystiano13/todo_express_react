import { Router } from "express";
import { userLoggedIn } from "../middleware/user-status.mjs";
import { query, validationResult } from "express-validator";
import { Task } from "../database/schemas/task.mjs";
import {
  validateIsDone,
  validateTitle,
} from "../validation/task-validation.mjs";

export const router = new Router();

router.get(
  "/api/tasks",
  userLoggedIn,
  query("email").exists().withMessage("Email is required"),
  async (request, response) => {
    const result = validationResult(request);

    if (!result.isEmpty()) {
      return response.status(400).json({ errors: result.array() });
    }

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
  async (request, response) => {
    const result = validationResult(request);

    if (!result.isEmpty()) {
      return response.status(400).json({ errors: result.array() });
    }

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
  async (request, response) => {
    if (!request.params.id) {
      return response.status(400).send({ error: "ID not found" });
    }

    const result = validationResult(request);

    if (!result.isEmpty()) {
      return response.status(400).json({ errors: result.array() });
    }

    const task = await Task.findOne({ _id: request.params.id });

    if (!task) {
      return response.status(404).send({ error: "Task not found" });
    }

    if (request.session.passport.user !== task.email) {
      return response.status(403).send({
        message: "Unauthorized access",
      });
    }

    try {
      const updatedTask = await task.updateOne({
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
