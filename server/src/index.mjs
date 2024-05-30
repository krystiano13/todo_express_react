import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/todo")
  .then(console.log("Connected to MongoDB"))
  .catch((e) => console.log(e));

const app = express();
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
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
