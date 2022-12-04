const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

// Create a wish for the logged in user

router.post("/createwish", authorization, async (req, res) => {
  try {
    const { title, points } = req.body;
    const newWish = await pool.query(
      "INSERT INTO wishes (wish_name, wish_value, user_id) VALUES($1, $2, $3) RETURNING *",
      [title, points, req.user.id]
    );
    res.json(newWish.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all wishes for the logged in user

router.get("/getwishes", authorization, async (req, res) => {
  const userId = req.user.id
  try {
    const allWishes = await pool.query(
      "SELECT * FROM wishes WHERE user_id = $1",
      [userId]
    );
    res.json(allWishes.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a wish for the logged in user

router.delete("/deletewish/:id", authorization, async (req, res) => {
  try {
    const wish = req.params.id;
    const deleteWish = await pool.query(
      "DELETE FROM wishes WHERE wish_id = $1",
      [wish]
    );
    res.json("Wish was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;