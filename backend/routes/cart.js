const router = require('express').Router();
const authorization = require('../middleware/authorization');
const pool = require('../db');

// Get list of shopping cart items from the database

router.get('/getcart', authorization, async (req, res) => {
  const userId = req.user.id;
  try {
    const getCart = await pool.query(
      'SELECT * FROM shopping_cart WHERE user_id = $1',
      [userId]
    );
    res.json(getCart.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Add an item to the shopping cart in the database

router.post('/addtocart', authorization, async (req, res) => {
  const userId = req.user.id;
  const { item } = req.body;
  try {
    const addToCart = await pool.query(
      'INSERT INTO shopping_cart (user_id, item) VALUES ($1, $2)',
      [userId, item]
    );
    res.json(addToCart.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Remove an item from the shopping cart in the database

router.post('/removefromcart', authorization, async (req, res) => {
  const userId = req.user.id;
  const { item } = req.body;
  try {
    const removeFromCart = await pool.query(
      'DELETE FROM shopping_cart WHERE user_id = $1 AND item = $2',
      [userId, item]
    );
    res.json(removeFromCart.rows);
  } catch (err) {
    console.error(err.message);
  }
});

moldule.exports = router;

