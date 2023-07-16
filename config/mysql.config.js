const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const mysqlConfig = {
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: "3306",
};

const mysqlConnection = mysql.createConnection(mysqlConfig);
mysqlConnection.connect((err) => {
  if (err) throw err;
});

module.exports = mysqlConnection;
