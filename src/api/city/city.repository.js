const { conn } = require("../../../module/db_connect");
const mysqlConnection = conn();

exports.getCityName = async (country) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `
        SELECT city_name_en 
        FROM city WHERE country_index = ?;
      `,
      [country],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};
