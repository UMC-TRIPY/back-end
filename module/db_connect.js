const mysql = require("mysql");
const config = require("../module/db_info");

const conn = function () {
  const connection = mysql.createConnection({
    host: config.real.host,
    port: config.real.port,
    user: config.real.user,
    password: config.real.password,
    database: config.real.database,
  });

  connection.connect(function (err) {
    if (err) {
      console.error("에러 connect:" + err.stack);
      return;
    }
    console.log("Mysql DB Connect완료! ID : " + connection.threadId);
  });

  return connection;
};

module.exports = { conn };