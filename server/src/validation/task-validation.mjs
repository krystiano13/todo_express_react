import { body } from "express-validator";

export const validateTitle = body("title")
  .exists()
  .withMessage("Title is required")
  .isString()
  .withMessage("Title must be a string");

export const validateEmail = body("email")
  .exists()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Invalid email");

export const validateIsDone = body("isDone")
  .exists()
  .withMessage("isDone is required")
  .isBoolean()
  .withMessage("isDone must be a boolean");
