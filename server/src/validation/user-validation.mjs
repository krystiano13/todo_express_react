import { body } from "express-validator";

export const validateEmail = body("email")
  .isEmail()
  .withMessage("invalid Email")
  .exists()
  .withMessage("Email is required");

export const validateUsername = body("username")
  .exists()
  .withMessage("Username is required")
  .isString()
  .withMessage("Username must be a string")
  .isLength({ min: 6, max: 32 })
  .withMessage("Username must be between 6 and 32 characters");

export const validatePassword = body("password")
  .exists()
  .withMessage("Password is required")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters");
