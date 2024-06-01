import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import { router as userRouter } from "./routes/user.mjs";
import { router as taskRouter } from "./routes/task.mjs";
import "./auth/local-strategy.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      preflightContinue: true,
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.use(express.json());
  app.use(
    session({
      secret: "keyboard cat",
      httpOnly: false,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000 * 60,
      },
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(userRouter);
  app.use(taskRouter);

  return app;
}
