import dotenv from 'dotenv';
dotenv.config();
import { pool, checkAndConnectDB } from '../database/db.js';
import request from "supertest";
const baseURL = "http://localhost:3010";

describe("Wallet Routes Test Suite", () => {
  // TODO: Arrange
  let token;
  let userId;

  beforeAll(async () => {
    await checkAndConnectDB();
    const user = await request(baseURL)
      .post("/api/auth/register")
      .send({ name: "Test User", email: "testuser@mail.com", password: "password" });
    userId = user.body.user_id;
    const loginResponse = await request(baseURL)
      .post("/api/auth/login")
      .send({ email: "testuser@mail.com", password: "password" });
    token = loginResponse.body.token;
  });

  test("PUT /api/wallet/addbalance", async () => {
    const response = await request(baseURL)
      .put("/api/wallet/addbalance")
      .set("token", token)
      .send({ chore_value: 123, user_id: userId });
    expect(response.statusCode).toBe(200);
    expect(response.body[0].balance).toBe(123);
  });

  test("GET /api/wallet/getbalance", async () => {
    const response = await request(baseURL)
      .get("/api/wallet/getbalance")
      .set("token", token)
      .send({ user_id: userId });
    expect(response.statusCode).toBe(200);
    expect(response.body[0].balance).toBe(123);
  });

  afterAll(async () => {
    await pool.query("DELETE FROM wallet WHERE balance = $1", [123]);
    await pool.query("DELETE FROM users WHERE user_email = $1", ["testuser@mail.com",]);
    await pool.end();
  });

});