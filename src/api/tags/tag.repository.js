const { conn } = require("../../../module/db_connect");
const connection = conn();

exports.getTagByName = async (tagName) => {
  try {
    const query = `SELECT * FROM tag WHERE tag_name = ?`;

    const result = await new Promise((resolve, reject) => {
      connection.query(query, [tagName], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const formattedResults = rows.map((row) => ({ ...row }));
          resolve(formattedResults);
        }
      });
    });
    console.log(result);

    return result;
  } catch (err) {
    throw err;
  }
};

exports.createTag = async (tagName) => {
  try {
    const query = `INSERT INTO tag (tag_name) VALUES (?)`;

    const result = await new Promise((resolve, reject) => {
      console.log(query);
      connection.query(query, [tagName], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return result;
  } catch (err) {
    throw err;
  }
};
