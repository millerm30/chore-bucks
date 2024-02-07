import dotenv from 'dotenv';
import { pool, checkAndConnectDB } from '../database/db.js';
import request from "supertest";
import express from 'express';
import jwtAuth from '../routes/jwtAuth';
const baseURL = "http://localhost:3010";
dotenv.config();


describe("Authorization Routes Test Suite", () => {
  // TODO: Arrange
  const app = express();
  app.use("/api/auth", jwtAuth);
  let token;

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
    expect(response.body.token).toBeTruthy();
    token = response.body.token;
  });

  afterAll(async () => {
    await pool.query("DELETE FROM users WHERE user_email = $1", ["email@mail.com"]);
    await pool.end();
  });
});

