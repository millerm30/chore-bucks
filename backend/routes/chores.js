const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../database/db");

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
    const { choreName } = req.body;
    const userId = req.user.id
    const newChore = await pool.query(
      "INSERT INTO predefined_chores (chore_name, user_id) VALUES ($1, $2) RETURNING *",
      [choreName, userId]
    );
    res.json(newChore.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get list of predefined chores and the new chores added by the logged in user

router.get("/getallchores", authorization, async (req, res) => {
  const userId = req.user.id;
  try {
    const getChores = await pool.query(
      "SELECT * FROM selected_chores WHERE user_id = $1",
      [userId]
    );
    const getChoresMap = getChores.rows.map(async (chore) => {
      const getPredefinedChores = await pool.query(
        "SELECT * FROM predefined_chores WHERE predefined_id = $1", 
        [chore.predefined_id]
      );
      return {
        selected_id: chore.selected_id,
        chore_name: getPredefinedChores.rows[0].chore_name,
        chore_value: chore.chore_value
      }
    });
    const getChoresResult = await Promise.all(getChoresMap);
    res.json(getChoresResult);
  } catch (err) {
    console.error(err.message);
  }
});

// Add a predefined chore with the userId and the user inputed chore value to the new selected_chores table

router.post("/addtodochore", authorization, async (req, res) => {
  const { chore_name, points } = req.body;
  const userId = req.user.id;
  try {
    const newChore = await pool.query(
      "INSERT INTO selected_chores (predefined_id, user_id, chore_value) VALUES ($1, $2, $3) RETURNING *",
      [chore_name, userId, points]
    );
    res.json(newChore.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Remove a chore from the selected_chores table

router.delete("/deletechore/:id", authorization, async (req, res) => {
  try {
    const chore = req.params.id;
    const userId = req.user.id;
    const removeChore = await pool.query(
      "DELETE FROM selected_chores WHERE selected_id = $1 AND user_id = $2",
      [chore, userId]
    );
    res.json(removeChore.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;