const router = require("express").Router();
const pool = require("../database/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, async (req, res) => {
  try {
    //Destructure req.body (name, email, password)
    const { name, email, password } = req.body;

    //Check if user doesn't exist (if user exists, throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists");
    }

    //Bcrypt the user's password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //Enter the new user inside our database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    //Generating our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    //Destructure the req.body
    const { email, password } = req.body;

    //Check if user doesn't exist (if not, throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Email incorrect or not registered");
    }

    //Check if incoming password is the same as the database password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("Password is incorrect");
    }

    //Give them the jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
