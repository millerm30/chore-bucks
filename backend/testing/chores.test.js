import dotenv from 'dotenv';
dotenv.config();
import { pool, checkAndConnectDB } from '../database/db.js';
import request from "supertest";
const baseURL = "http://localhost:3010";

describe("Choures Routes Test Suite", () => {
  //TODO: ARRANGE
  let token;
  let predefinedChoreId;
  let selectedChoreId;

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

  test("POST /api/chores/addpredefinedchore should create a new predefined chore for the logged in user", async () => {
    const newChore = await request(baseURL)
      .post("/api/chores/addpredefinedchore")
      .set("token", token)
      .send({ choreName: "Test Chore" });
    expect(newChore.status).toBe(200);
    expect(newChore.body.chore_name).toBe("Test Chore");
    predefinedChoreId = newChore.body.predefined_id;
  });

  test("POST /api/chores/addtodochore should create a new todo chore for the logged in user", async () => {
    const todoChoreAdd = await request(baseURL)
      .post("/api/chores/addtodochore")
      .set("token", token)
      .send({ predefined_id: predefinedChoreId, points: 10 });
    expect(todoChoreAdd.status).toBe(200);
    expect(todoChoreAdd.body.chore_value).toBe(10);
    selectedChoreId = todoChoreAdd.body.selected_id;
  });

  afterAll(async () => {
    await pool.query("DELETE FROM selected_chores WHERE selected_id = $1", [selectedChoreId])
    await pool.query("DELETE FROM predefined_chores WHERE chore_name= $1", ["Test Chore"]);
    await pool.query("DELETE FROM users WHERE user_email = $1", ["testuser@mail.com",]);
    await pool.end();
  });
});