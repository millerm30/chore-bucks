const router = require('express').Router();
const authorization = require('../middleware/authorization');
const pool = require('../database/db');

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
    res.status(500).send('Server Error');
  }
});

// Add chore bucks to the logged in user's balance in the database

router.put('/addbalance', authorization, async (req, res) => {
  const userId = req.user.id;
  const { chore_value } = req.body;
  try {
    const addBalance = await pool.query(
      'INSERT INTO wallet (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = wallet.balance + $2 RETURNING *',
      [userId, chore_value]
    );
    res.json(addBalance.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;