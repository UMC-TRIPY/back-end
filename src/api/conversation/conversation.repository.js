const { conn } = require("../../../module/db_connect");
const mysqlConnection = conn();

exports.getConversationByCountry = async (country) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `
        SELECT conver_korean,country_translation
        FROM conversation WHERE country_index = ?;
      `,
      [country],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};
