const mysql = require("mysql12");
require("dotenv").config;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "employee_db",
});

module.exports = db;
