import mongoose from "mongoose";
import { createApp } from "./app.mjs";

const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/todo")
  .then(console.log("Connected to MongoDB"))
  .catch((e) => console.log(e));

const app = createApp();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
