import express from 'express';
import { default as authorization } from "../middleware/authorization.js";
import { pool } from '../database/db.js';

const router = express.Router();

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user.id]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
