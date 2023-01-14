const router = require('express').Router();
const authorization = require('../middleware/authorization');
const pool = require('../database/db');
const nodemailer = require("nodemailer");
const shared = require("shared");
const path = require("path");
const { Pool } = require('pg');

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CONTACT_EMAIL,
    pass: process.env.CONTACT_PASSWORD,
  },
});

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

router.post('/addtoshoppingcart', authorization, async (req, res) => {
  const userId = req.user.id;
  const { wish_id } = req.body;
  try {
    const addToCart = await pool.query(
      'INSERT INTO shopping_cart (user_id, wish_id) VALUES($1, $2) RETURNING *',
      [userId, wish_id]
    );
    res.json(addToCart.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

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

router.get('/getcarttotal', authorization, async (req, res) => {
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
    const total = getCartResult.reduce((acc, cur) => {
      return acc + cur.wish_value;
    }, 0);
    res.json(total);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/checkout', authorization, async (req, res) => {
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
    const total = getCartResult.reduce((acc, cur) => {
      return acc + cur.wish_value;
    }, 0);
    const getBalance = await pool.query(
      'SELECT * FROM wallet WHERE user_id = $1',
      [userId]
    );
    const userBalance = getBalance.rows[0].balance;
    if (total > userBalance) {
      res.json(false);
    } else {
      const newBalance = userBalance - total;
      await pool.query('BEGIN');
      try {
        const updateBalance = await pool.query(
          "UPDATE wallet SET balance = $1 WHERE user_id = $2",
          [newBalance, userId]
        );
        const clearCart = await pool.query(
          "DELETE FROM shopping_cart WHERE user_id = $1",
          [userId]
        );
        await pool.query('COMMIT');
      } catch (err) {
        await pool.query('ROLLBACK');
        throw err;
      }
      const getWishes = await pool.query(
        'SELECT * FROM wishes WHERE user_id = $1',
        [userId]
      );
      const getWishesMap = getWishes.rows.map(async (wish) => {
        const updateWishes = await pool.query(
          'UPDATE wishes SET completed = $1 WHERE wish_id = $2',
          [false, wish.wish_id]
        );
      });
      
      const email = await pool.query(
        'SELECT * FROM users WHERE user_id = $1',
        [userId]
      );
      const emailResult = email.rows[0].user_email, userName = email.rows[0].user_name;
      const mailOptions = {
        from: process.env.CONTACT_EMAIL,
        to: emailResult,
        subject: "Wish List Purchase",
        html: `
        <style>
          body {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
          }
        </style>
        <div style="max-width:600px;margin:0 auto;padding:20px;box-sizing:border-box">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
            <img src="cid:logo" alt="Logo">
          </div>
          <div>
            <h1 style="font-size:22px;margin:0">Wish List Purchase</h1>
          </div>
          <div style="margin-bottom:20px">
            <p style="margin:0;font-size:14px;color:#777">Receipt Number: ${Math.floor(Math.random() * 1000000000)}</p>
            <p style="margin:0;font-size:14px;color:#777">Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <div style="margin-bottom:20px">
            ${getCartResult
              .map(
                (wish) =>
                  `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                    <p style="margin:0;font-size:14px">${wish.wish_name} | $${wish.wish_value}</p>
                  </div>`
              )
              .join("")}
          </div>
          <hr>
          <p style="font-size:18px;font-weight:bold">Total: $${total}</p>
          <hr>
          <p>Thank you for your purchase ${userName}!</p>
          <p>Here is your new balance: $${newBalance}</p>
          <p>Provide your receipt to your parents to order your wishlist!</p>
        </div>
        `,
        attachments: [
          {
            filename: "chorebucks.png",
            path: path.join(__dirname, "../../shared/chorebucks.png"),
            cid: "logo",
          },
        ],
      };
      contactEmail.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.json(true);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

