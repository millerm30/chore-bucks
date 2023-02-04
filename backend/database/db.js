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

const checkAndConnectDB = async () => {
  try {
    await pool.query("SELECT NOW()", (err, res) => {
      if (err) throw err;
      console.log("Database Connected");
    });
    const uuidExists = await pool.query(
      `SELECT EXISTS(SELECT * FROM pg_extension WHERE extname = 'uuid-ossp')`
    );
    if (!uuidExists.rows[0].exists) {
      await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    } else {
      console.log("uuid-ossp extension exists");
    }
    const tableExist = await pool.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    );
    const tableNames = [
      "users",
      "predefined_chores",
      "selected_chores",
      "wishes",
      "shopping_cart",
      "wallet",
    ];
    if (
      !tableNames.every((tableName) =>
        tableExist.rows.map((row) => row.table_name).includes(tableName)
      )
    ) {
      console.log("No Tables Found");
      await createTables();
      await checkTriggers();
      await checkFunctions();
    } else {
      console.log("Tables Found");
      console.log(tableExist.rows);
      console.log("Checking Triggers");
      await checkTriggers();
      console.log("Checking Functions");
      await checkFunctions();
    }
  } catch (err) {
    console.log(err);
  }
};

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
      )`
    );

    await pool.query(
      `CREATE TABLE IF NOT EXISTS predefined_chores (
        predefined_id uuid PRIMARY KEY DEFAULT 
        uuid_generate_v4(),
        chore_name VARCHAR(255) NOT NULL,
        user_id uuid,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      )`
    );

    await pool.query(
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
      )`
    );

    await pool.query(
      `CREATE TABLE IF NOT EXISTS wishes (
        wish_id uuid PRIMARY KEY DEFAULT 
        uuid_generate_v4(),
        wish_name VARCHAR(255) NOT NULL,
        wish_value INT NOT NULL,
        user_id uuid,
        completed BOOLEAN DEFAULT FALSE,
        date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      )`
    );

    await pool.query(
      `CREATE TABLE IF NOT EXISTS shopping_cart (
        item_id uuid PRIMARY KEY DEFAULT 
        uuid_generate_v4(),
        item_quantity INT NOT NULL DEFAULT 1,
        user_id uuid NOT NULL,
        wish_id uuid NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (wish_id) REFERENCES wishes (wish_id)
      )`
    );

    await pool.query(
      `CREATE TABLE IF NOT EXISTS wallet (
        wallet_id uuid PRIMARY KEY DEFAULT
        uuid_generate_v4(),
        user_id uuid NOT NULL,
        balance INT,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      )`
    );

    await pool.query(
      `ALTER table wallet ADD CONSTRAINT IF NOT EXISTS wallet_user_id_key UNIQUE (user_id)`
    );

    console.log("Tables created successfully");
  } catch (err) {
    console.log(err);
  }
};

const checkTriggers = async () => {
  try {
    const triggersExist = await pool.query(
      `SELECT trigger_name FROM information_schema.triggers WHERE trigger_schema = 'public'`
    );
    const triggerNames = ["set_date_completed_trigger", "delete_old_chores_trigger"];
    if (
      !triggerNames.every((triggerName) =>
        triggersExist.rows.map((row) => row.trigger_name).includes(triggerName)
      )
    ) {
      console.log("No Triggers Found");
      await createTriggers();
    } else {
      console.log("Triggers Found");
      console.log(triggersExist.rows);
    }
  } catch (err) {
    console.log(err);
  }
};

const checkFunctions = async () => {
  try {
    const functionsExist = await pool.query(
      `SELECT routine_name FROM information_schema.routines WHERE routine_schema = 'public'`
    );
    const functionNames = ["set_date_completed", "delete_old_chores"];
    if (
      !functionNames.every((functionName) =>
        functionsExist.rows
          .map((row) => row.routine_name)
          .includes(functionName)
      )
    ) {
      console.log("No Functions Found");
      await createFunctions();
    } else {
      console.log("Functions Found");
      console.log(functionsExist.rows);
    }
  } catch (err) {
    console.log(err);
  }
};

const createFunctions = async () => {
  try {
    await pool.query(
      `CREATE OR REPLACE FUNCTION set_date_completed() RETURNS TRIGGER AS $$
      BEGIN
        NEW.date_completed = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;`
    );

    await pool.query(
      `CREATE OR REPLACE FUNCTION delete_old_chores() RETURNS TRIGGER AS $$
      BEGIN
        DELETE FROM selected_chores WHERE date_added < NOW() - INTERVAL '90 days';
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;`
    );
    console.log("Functions Created");

  } catch (err) {
    console.log(err);
  }
};

const createTriggers = async () => {
  try {
    await pool.query(
      `CREATE TRIGGER set_date_completed_trigger
      BEFORE UPDATE ON selected_chores
      FOR EACH ROW
      EXECUTE PROCEDURE set_date_completed();`
    );

    await pool.query(
      `CREATE TRIGGER delete_old_chores_trigger
      AFTER INSERT ON selected_chores
      FOR EACH ROW
      EXECUTE PROCEDURE delete_old_chores();`
    );
    console.log("Triggers Created");

  } catch (err) {
    console.log(err);
  }
};

module.exports = { pool, checkAndConnectDB };
