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

//Check if Database is connected
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database Connected");
  }
});

// Check if Tables are created and if they are return the tables and if not create them with the following code
pool.query(
  `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      if (res.rows.length === 0) {
      console.log("No Tables Found");
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
        } else {
          console.log("Tables Created");
        }
      }
    );
      } else {
        console.log("Tables Found");
        console.log(res.rows);
      }
    }
  }
);

module.exports = pool;
