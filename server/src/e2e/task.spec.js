import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../app.mjs";

const createUser = async (app) =>
  await request(app)
    .post("/api/auth/register")
    .send({
      email: "XNnJc@example.com",
      username: "test1234",
      password: "test1234",
    })
    .then((res) => {
      return request(app)
        .post("/api/auth/login")
        .send({
          email: "XNnJc@example.com",
          password: "test1234",
        })
        .set("Cookie", res.headers["set-cookie"]);
    });

describe("tasks", () => {
  let app;
  let task_id;

  beforeAll(async () => {
    mongoose
      .connect("mongodb://localhost:27017/todo_test_2")
      .then(console.log("Connected to MongoDB"))
      .catch((e) => console.log(e));

    app = createApp();
  });

  it("should get tasks", async () => {
    const response = await createUser(app).then((res) =>
      request(app)
        .get("/api/tasks?email=XNnJc@example.com")
        .set("Cookie", res.headers["set-cookie"])
    );
    expect(response.statusCode).toBe(200);
  });

  it("should create tasks", async () => {
    const response = await createUser(app).then((res) =>
      request(app)
        .post("/api/tasks")
        .send({
          email: "XNnJc@example.com",
          title: "test",
          isDone: false,
        })
        .set("Cookie", res.headers["set-cookie"])
        .then((res) => {
          task_id = res.body.task._id;
          return res;
        })
    );
    expect(response.statusCode).toBe(200);
  });

  it("should update task", async () => {
    const response = await createUser(app).then((res) =>
      request(app)
        .patch(`/api/tasks/${task_id}`)
        .send({
          title: "test123",
          isDone: true,
        })
        .set("Cookie", res.headers["set-cookie"])
    );
    expect(response.statusCode).toBe(201);
  });

  afterAll(async () => {
    console.log(task_id);
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
