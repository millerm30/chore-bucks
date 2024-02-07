import dotenv from 'dotenv';
dotenv.config();
import { pool, checkAndConnectDB } from '../database/db.js';
import request from "supertest";
const baseURL = "http://localhost:3010";

describe("Wishes Routes Test Suite", () => {
  // TODO: Arrange
  let token;
  let createWishId;

  beforeAll(async () => {
    await checkAndConnectDB();
    const user = await request(baseURL)
      .post("/api/auth/register")
      .send({ name: "Test User", email: "testuser@mail.com", password: "password" });
    const loginResponse = await request(baseURL)
      .post("/api/auth/login")
      .send({ email: "testuser@mail.com", password: "password" });
    token = loginResponse.body.token;
  });

  test("POST /api/wishes/createwish should create a new wish for the logged in user", async () => {
    const response = await request(baseURL)
      .post("/api/wishes/createwish")
      .send({ title: "Test Wish", points: 10 })
      .set("token", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.wish_name).toBe("Test Wish");
    expect(response.body.wish_value).toBe(10);
    createWishId = response.body.wish_id;
  });

  test("GET /api/wishes/getwishes should return all wishes for the logged in user", async () => {
    const response = await request(baseURL)
      .get("/api/wishes/getwishes")
      .set("token", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].wish_name).toBe("Test Wish");
    expect(response.body[0].wish_value).toBe(10);
  });

  test("DELETE /api/wishes/deletewish/:id should delete a wish", async () => {
    const response = await request(baseURL)
      .delete(`/api/wishes/deletewish/${createWishId}`)
      .set("token", token);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("Wish was deleted!");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM wishes WHERE wish_name= $1", ["Test Wish"]);
    await pool.query("DELETE FROM users WHERE user_email = $1", ["testuser@mail.com"]);
    await pool.end();
  });
});