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

module.exports = pool;
