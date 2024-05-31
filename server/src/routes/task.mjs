import { Router } from "express";
import { userLoggedIn } from "../middleware/user-status.mjs";
import { query } from "express-validator";
import {
  validateIsDone,
  validateTitle,
} from "../validation/task-validation.mjs";
import { isTaskExist, isTaskOwnerValid } from "../middleware/resolve-task.mjs";
import { handleErrors } from "../middleware/handle-errors.mjs";

//endpoints
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./endpoints/task-endpoints.mjs";

export const router = new Router();

router.get(
  "/api/tasks",
  userLoggedIn,
  query("email").exists().withMessage("Email is required"),
  handleErrors,
  getTasks
);

router.post(
  "/api/tasks",
  userLoggedIn,
  validateTitle,
  validateIsDone,
  handleErrors,
  createTask
);

router.patch(
  "/api/tasks/:id",
  userLoggedIn,
  validateTitle,
  validateIsDone,
  isTaskExist,
  isTaskOwnerValid,
  handleErrors,
  updateTask
);

router.delete(
  "/api/tasks/:id",
  userLoggedIn,
  isTaskExist,
  isTaskOwnerValid,
  deleteTask
);
