const router = require('express').Router();
const authorization = require('../middleware/authorization');
const pool = require('../database/db');

// Get list of shopping cart items from the database

router.get('/getcart', authorization, async (req, res) => {
  const userId = req.user.id;
  try {
    const getCart = await pool.query(
      'SELECT * FROM shopping_cart WHERE user_id = $1',
      [userId]
    );
    const getCartMap = getCart.rows.map(async (wish) => {
      const getCartList = await pool.query(
        'SELECT * FROM wishes WHERE wish_id = $1',
        [wish.wish_id]
      );
      return {
        wish_id: wish.wish_id,
        wish_name: getCartList.rows[0].wish_name,
        wish_value: getCartList.rows[0].wish_value,
      }
    });
    const getCartResult = await Promise.all(getCartMap);
    res.json(getCartResult);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add the wish to the shopping cart table in the database
// This function needs work to be completed.
router.post('/addtoshoppingcart', authorization, async (req, res) => {
  const userId = req.user.id;
  const { item, points } = req.body;
  try {
    const addToCart = await pool.query(
      'INSERT INTO shopping_cart (user_id, item, points) VALUES($1, $2, $3) RETURNING *',
      [userId, item, points]
    );
    res.json(addToCart.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Remove an item from the shopping cart in the database

router.delete('/removefromcart/:id', authorization, async (req, res) => {
  try {
    const wish = req.params.id;
    const userId = req.user.id;
    const removeFromCart = await pool.query(
      'DELETE FROM shopping_cart WHERE user_id = $1 AND wish_id = $2',
      [userId, wish]
    );
    res.json(removeFromCart.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

