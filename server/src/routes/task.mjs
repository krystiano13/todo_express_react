import { Router } from "express";
import { userLoggedIn } from "../middleware/user-status.mjs";
import { query, validationResult } from "express-validator";
import { Task } from "../database/schemas/task.mjs";

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
    '/api/tasks',
    userLoggedIn,
    async (request, response) => {
        const task = new Task({
            title: request.body.title,
            email: request.body.email,
            isDone: request.body.isDone
        });
    }
);
