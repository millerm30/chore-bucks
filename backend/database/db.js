const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database Connected");
  }
});

pool.query(
  `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      const tableNames = ["users", "predefined_chores", "selected_chores", "wishes", "shopping_cart", "wallet"];
      if (!tableNames.every(tableName => res.rows.map(row => row.table_name).includes(tableName)))
      {
      console.log("No Tables Found");
      createTables();
    } else {
      console.log("Tables Found");
      console.log(res.rows);
    }
  }
});

const createTables = async () => {
  try {  
      await pool.query(
        `CREATE TABLE IF NOT EXISTS users (
        user_id uuid PRIMARY KEY DEFAULT 
        uuid_generate_v4(),
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        user_password VARCHAR(255) NOT NULL,
        date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      );

    pool.query(
      `CREATE TABLE IF NOT EXISTS predefined_chores (
        predefined_id uuid PRIMARY KEY DEFAULT 
        uuid_generate_v4(),
        chore_name VARCHAR(255) NOT NULL,
        user_id uuid,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      )`,
    );

    pool.query(
      `CREATE TABLE IF NOT EXISTS selected_chores (
        selected_id uuid PRIMARY KEY DEFAULT 
        uuid_generate_v4(),
        user_id uuid NOT NULL,
        chore_value INT NOT NULL,
        predefined_id uuid NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        date_completed TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (predefined_id) REFERENCES predefined_chores (predefined_id)
      )`,
    );

    pool.query(
      `CREATE TABLE IF NOT EXISTS wishes (
        wish_id uuid PRIMARY KEY DEFAULT 
        uuid_generate_v4(),
        wish_name VARCHAR(255) NOT NULL,
        wish_value INT NOT NULL,
        user_id uuid,
        completed BOOLEAN DEFAULT FALSE,
        date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      )`,
    );

    pool.query(
      `CREATE TABLE IF NOT EXISTS shopping_cart (
        item_id uuid PRIMARY KEY DEFAULT 
        uuid_generate_v4(),
        item_quantity INT NOT NULL DEFAULT 1,
        user_id uuid NOT NULL,
        wish_id uuid NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (wish_id) REFERENCES wishes (wish_id)
      )`,
    );

    pool.query(
      `CREATE TABLE IF NOT EXISTS wallet (
        wallet_id uuid PRIMARY KEY DEFAULT
        uuid_generate_v4(),
        user_id uuid NOT NULL,
        balance INT,
        CONSTRAINT wallet_user_id_key UNIQUE (user_id),
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      )`,
    );
    console.log("Tables Created");
  } catch (err) {
    console.log(err);
  }
};

module.exports = pool;
