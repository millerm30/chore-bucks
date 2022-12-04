const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

// Get list of predefined chores from database

router.get("/predefinedchores", async (req, res) => {
  try {
    const getPredefinedChores = await pool.query(
      "SELECT * FROM predefined_chores"
    )
    res.json(getPredefinedChores.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Add new chore to predefined chores table wtih the logged in user

router.post("/addpredefinedchore", authorization, async (req, res) => {
  try {
    const { chore_name } = req.body;
    const newChore = await pool.query(
      "INSERT INTO predefined_chores (chore_name, user_id) VALUES ($1, $2) RETURNING *",
      [chore_name, req.user]
    );
    res.json(newChore.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get list of predefined chores and the new chores added by the logged in user

router.get("/getallchores", authorization, async (req, res) => {
  const userId = req.user.id
  try {
    const getChores = await pool.query(
      "SELECT * FROM predefined_chores WHERE user_id = $1",
      [userId]
    );
    res.json(getChores.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Add new chore with the logged in user with the chore_name and chore_value

router.post("/addtodochore", authorization, async (req, res) => {
  try {
    const { chore_name, chore_value } = req.body;
    const newChore = await pool.query(
      "INSERT INTO chores (chore_name, chore_value, user_id) VALUES ($1, $2, $3) RETURNING *",
      [chore_name, chore_value, req.user]
    );
    res.json(newChore.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;