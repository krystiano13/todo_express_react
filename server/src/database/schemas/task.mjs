import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  isDone: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
  },
});

export const Task = mongoose.model("Task", TaskSchema);
