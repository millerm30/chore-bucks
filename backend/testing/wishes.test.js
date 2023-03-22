const dotenv = require("dotenv");
dotenv.config();
const { checkAndConnectDB } = require("../database/db");
const { pool } = require("../database/db");
const request = require("supertest");
const baseURL = "http://localhost:3010";

describe("Wishes Routes Test Suite", () => {
  // TODO: Arrange
  let token;

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
  });

  afterAll(async () => {
    await pool.query("DELETE FROM wishes WHERE wish_name= $1", ["Test Wish"]);
    await pool.query("DELETE FROM users WHERE user_email = $1", ["testuser@mail.com"]);
    await pool.end();
  });
});