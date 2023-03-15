const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();
const { checkAndConnectDB } = require("../database/db");
const request = require("supertest");
const baseURL = "http://localhost:3010";

describe("Wishes Routes Test Suite", () => {
  // TODO: Arrange
  const express = require("express");
  const app = express();
  app.use("/api/auth", require("../routes/jwtAuth"));
  //app.use("/api/wishes", wishes);
  let pool;

  beforeAll(async () => {
    await checkAndConnectDB();
    // pool = new Pool({
    //     host: process.env.HOST,
    //     database: process.env.DATABASE,
    //     user: process.env.USER,
    //     password: process.env.PASSWORD,
    //     port: process.env.PORT,
    //   });
    // await pool.query("SELECT NOW()", (err, res) => {
    //     if (err) throw err;
    //     console.log("Database Connected");
    //   });
  });

  test("test name here, success", async () => {
    // TODO: Act
    const response = await request(baseURL)
      .post("/api/auth/register")
      .send({ name: "name", email: "email@mail.com", password: "password" });
    //TODO: Assert
    expect(response).toBe("pickles");
  });
});
