const { conn } = require("../../../module/db_connect");
const mysqlConnection = conn();

exports.getCurrency = async (country) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `
        SELECT currencyKo,currencyEn
        FROM currency WHERE country_index = ?;
      `,
      [country],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};
