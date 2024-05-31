import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../app.mjs";

describe("users", () => {
  let app;

  beforeAll(() => {
    mongoose
      .connect("mongodb://localhost:27017/todo_test")
      .then(console.log("Connected to MongoDB"))
      .catch((e) => console.log(e));

    app = createApp();
  });

  it("should create new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "XNnJc@example.com",
      username: "test1234",
      password: "test1234",
    });

    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase;
    await mongoose.connection.close();
  });
});
