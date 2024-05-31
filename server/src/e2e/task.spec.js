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
    );
    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
