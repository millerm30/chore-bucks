const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

//Create Postgre Database Connection
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

//Create Tables if not exist
pool.query(
  `CREATE TABLE IF NOT EXISTS users (
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
  )`,
  (err, res) => {
    if (err) {
      console.log(err);
    }
  }
);

pool.query(
  `CREATE TABLE IF NOT EXISTS predefined_chores (
    predefined_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    chore_name VARCHAR(255) NOT NULL,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
  )`,
  (err, res) => {
    if (err) {
      console.log(err);
    }
  }
);

pool.query(
  `CREATE TABLE IF NOT EXISTS selected_chores (
    selected_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_id uuid NOT NULL,
    chore_value INT NOT NULL,
    predefined_id uuid NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (predefined_id) REFERENCES predefined_chores (predefined_id)
  )`,
  (err, res) => {
    if (err) {
      console.log(err);
    }
  }
);

pool.query(
  `CREATE TABLE IF NOT EXISTS wishes (
    wish_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    wish_name VARCHAR(255) NOT NULL,
    wish_value INT NOT NULL,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
  )`,
  (err, res) => {
    if (err) {
      console.log(err);
    }
  }
);

pool.query(
  `CREATE TABLE IF NOT EXISTS shopping_cart (
    cart_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    item_quantity INT NOT NULL,
    user_id uuid NOT NULL,
    wish_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (wish_id) REFERENCES wishes (wish_id)
  )`,
  (err, res) => {
    if (err) {
      console.log(err);
    }
  }
);

pool.query(
  `CREATE TABLE IF NOT EXISTS wallet (
    wallet_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_id uuid NOT NULL,
    balance INT,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
  )`,
  (err, res) => {
    if (err) {
      console.log(err);
    }
  }
);

module.exports = pool;
