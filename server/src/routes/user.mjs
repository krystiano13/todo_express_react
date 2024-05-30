import { Router } from "express";
import { User } from "../database/schemas/user.mjs";
import { body, validationResult } from "express-validator";

export const router = new Router();

const validateEmail = body("email")
  .isEmail()
  .withMessage("invalid Email")
  .exists()
  .withMessage("Email is required");

const validateUsername = body("username")
  .exists()
  .withMessage("Username is required")
  .isString()
  .withMessage("Username must be a string")
  .isLength({ min: 6, max: 32 })
  .withMessage("Username must be between 6 and 32 characters");

const validatePassword = body("password")
  .exists()
  .withMessage("Password is required")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters");

router.post(
  "/api/auth/register",
  validateEmail,
  validateUsername,
  validatePassword,
  (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.status(400).json({ errors: result.array() });
    }
    return response.status(200).send("hello");
  }
);
