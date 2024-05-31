import { Router } from "express";
import { User } from "../database/schemas/user.mjs";
import { validationResult } from "express-validator";
import { hashPassword } from "../auth/hash.mjs";
import { userNotLoggedIn } from "../middleware/user-status.mjs";
import passport from "passport";
import { handleErrors } from "../middleware/handle-errors.mjs";

import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../validation/user-validation.mjs";

export const router = new Router();

router.get("/api/auth/status", (request, response) => {
  return request.user ? response.sendStatus(200) : response.sendStatus(401);
});

router.post(
  "/api/auth/login",
  userNotLoggedIn,
  passport.authenticate("local"),
  (request, response) => {
    return response.status(200).send({ message: "Logged In" });
  }
);

router.post(
  "/api/auth/register",
  userNotLoggedIn,
  validateEmail,
  validateUsername,
  validatePassword,
  handleErrors,
  async (request, response) => {
    const existingUser = await User.findOne({ email: request.body.email });
    if (existingUser) {
      return response.status(400).send({
        message: "User already exists",
      });
    }

    const user = new User({
      email: request.body.email,
      username: request.body.username,
      password: hashPassword(request.body.password),
    });

    try {
      const saveUser = await user.save();
      return response.status(200).send({
        user: saveUser.email,
        message: "User created successfully",
      });
    } catch (e) {
      return response.status(500).send({
        message: "Internal server error",
      });
    }
  }
);
