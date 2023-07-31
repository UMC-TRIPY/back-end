const mysql = require("mysql");
const config = require("../module/db_info");

const conn = function () {
  const connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
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
