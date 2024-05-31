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

  it("should log in, return 200 and show logged in status", async () => {
    const response_1 = await request(app)
      .post("/api/auth/login")
      .send({
        email: "XNnJc@example.com",
        password: "test1234",
      })
      .then((res) => {
        return request(app)
          .get("/api/auth/status")
          .set("Cookie", res.headers["set-cookie"]);
      });

    expect(response_1.statusCode).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
