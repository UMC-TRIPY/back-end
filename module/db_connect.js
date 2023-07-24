const db = require('mysql');
const config = require('../module/db_info');

module.exports.conn= function(){
  const conn = db.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database

  });
  conn.connect(function(err) {
    if (err) {
      console.error('에러 connect:' + err.stack);
      return;
    }
    console.log('Mysql DB Connect완료! ID : ' + conn.threadId);
  });
  return conn;
  }