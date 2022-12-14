const router = require('express').Router();
const authorization = require('../middleware/authorization');
const pool = require('../db');

// Get the chore bucks balance for the logged in user from the database

router.get('/getbalance', authorization, async (req, res) => {
  const userId = req.user.id;
  try {
    const getBalance = await pool.query(
      'SELECT * FROM wallet WHERE user_id = $1',
      [userId]
    );
    res.json(getBalance.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Add chore bucks to the logged in user's balance in the database

router.post('/addbalance', authorization, async (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;
  try {
    const addBalance = await pool.query(
      'UPDATE wallet SET balance = balance + $1 WHERE user_id = $2',
      [amount, userId]
    );
    res.json(addBalance.rows);
  } catch (err) {
    console.error(err.message);
  }
});

moldule.exports = router;