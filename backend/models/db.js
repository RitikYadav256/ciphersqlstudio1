const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "2004",
  database: "testdb",
  port: 5432,
});

module.exports = pool;
