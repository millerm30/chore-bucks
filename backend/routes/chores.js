import express from 'express';
import { default as authorization } from "../middleware/authorization.js";
import { pool } from '../database/db.js';

const router = express.Router();

router.get("/predefinedchores", authorization, async (req, res) => {
  const userId = req.user.id;
  try {
    const getPredefinedChores = await pool.query(
      "SELECT * FROM predefined_chores WHERE user_id = $1 OR user_id IS NULL",
      [userId]
    );
    res.json(getPredefinedChores.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

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
    res.status(500).send("Server Error");
  }
});

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
        chore_value: chore.chore_value,
        completed: chore.completed,
      }
    });
    const getChoresResult = await Promise.all(getChoresMap);
    res.json(getChoresResult);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/addtodochore", authorization, async (req, res) => {
  const { predefined_id, points } = req.body;
  const userId = req.user.id;
  try {
    const newChore = await pool.query(
      "INSERT INTO selected_chores (predefined_id, user_id, chore_value) VALUES ($1, $2, $3) RETURNING *",
      [predefined_id, userId, points]
    );
    res.json(newChore.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

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
    res.status(500).send("Server Error");
  }
});

router.put("/completechore/:id", authorization, async (req, res) => {
  try {
    const chore = req.params.id;
    const userId = req.user.id;
    const completeChore = await pool.query(
      "UPDATE selected_chores SET completed = true WHERE selected_id = $1 AND user_id = $2",
      [chore, userId]
    );
    res.json(completeChore.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get('/choreviews', authorization, async (req, res) => {
  const userId = req.user.id;
  try {
    const getChoreViews = await pool.query(
    "SELECT predefined_chores.chore_name, selected_chores.chore_value, selected_chores.completed, selected_chores.date_completed, selected_chores.selected_id FROM selected_chores JOIN predefined_chores ON selected_chores.predefined_id = predefined_chores.predefined_id WHERE selected_chores.user_id = $1 AND selected_chores.completed = true",
      [userId]
    );
    const convertTime = getChoreViews.rows.map((chore) => {
      const date = new Date(chore.date_completed);
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      const convertTheDate = `${month} ${day}, ${year}`;
      const currentTime = date.toLocaleTimeString();
      const dateCompleted = `${convertTheDate} / ${currentTime}`;
      return {
        chore_name: chore.chore_name
        , chore_value: chore.chore_value
        , completed: chore.completed
        , date_completed: dateCompleted
        , selected_id: chore.selected_id
      }
    })
    res.json(convertTime);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

export default router;