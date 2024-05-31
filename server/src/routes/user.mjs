import { Router } from "express";
import { userNotLoggedIn } from "../middleware/user-status.mjs";
import passport from "passport";
import { handleErrors } from "../middleware/handle-errors.mjs";

//validators

import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../validation/user-validation.mjs";

//endpoints

import { userStatus, logIn } from "./endpoints/user-endpoints.mjs";

export const router = new Router();

router.get("/api/auth/status", userStatus);

router.post(
  "/api/auth/login",
  userNotLoggedIn,
  passport.authenticate("local"),
  logIn
);

router.post(
  "/api/auth/register",
  userNotLoggedIn,
  validateEmail,
  validateUsername,
  validatePassword,
  handleErrors
);
