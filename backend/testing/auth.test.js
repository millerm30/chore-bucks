const dotenv = require("dotenv");
dotenv.config();
const { checkAndConnectDB } = require("../database/db");
const { pool } = require("../database/db");
const request = require("supertest");
const baseURL = "http://localhost:3010";

describe("Authorization Routes Test Suite", () => {
  // TODO: Arrange
  const express = require("express");
  const app = express();
  app.use("/api/auth", require("../routes/jwtAuth"));

  beforeAll(async () => {
    await checkAndConnectDB();
  });

  test("New user should be created, success", async () => {
    // TODO: Act
    const response = await request(baseURL)
      .post("/api/auth/register")
      .send({ name: "name", email: "email@mail.com", password: "password" });
    //TODO: Assert
    expect(response.statusCode).toBe(200);
  });

  test("User should loggin, success", async () => {
    // TODO: Act
    const response = await request(baseURL)
      .post("/api/auth/login")
      .send({ email: "email@mail.com", password: "password" });
    //TODO: Assert
    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await pool.query("DELETE FROM users WHERE user_email = $1", ["email@mail.com"]);
    await pool.end();
  });
});

