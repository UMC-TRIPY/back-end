const { conn } = require("../../../module/db_connect");
const mysqlConnection = conn();

exports.getMaterialsByCountry = async (country) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `
        SELECT cm.material_description, m.materials_name
        FROM country_material cm
        JOIN materials m ON cm.materials_index = m.materials_index
        WHERE cm.country_index = ?;
      `,
      [country],
      (err, rows) => {
        if (err) reject(err);

        resolve(rows);
      }
    );
  });
};
