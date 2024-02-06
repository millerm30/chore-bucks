import express from 'express';
import { pool } from '../database/db.js';
import bcrypt from 'bcryptjs';
import { jwtGenerator } from "../utils/jwtGenerator.js";
import { default as validInfo } from "../middleware/validinfo.js";
import { default as authorization } from "../middleware/authorization.js";

const router = express.Router();

router.post("/register", validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE LOWER(user_email) = $1", [
      email.toLowerCase(),
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email.toLowerCase(), bcryptPassword]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Email incorrect or not registered");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("Password is incorrect");
    }

    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/logout", (req, res) => {
  try {
    localStorage.removeItem("token");
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

export default router;
