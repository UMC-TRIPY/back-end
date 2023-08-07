const { conn } = require("../../../module/db_connect");
const connection = conn();

exports.createBagMaterials = async (bagIndex, materialIndex) => {
  const query =
    "INSERT INTO bag_materials(bag_index, materials_index) VALUE(? , ? )";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(query, [bagIndex, materialIndex], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
