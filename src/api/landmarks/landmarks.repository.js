const mysql = require("mysql2");
const connConfig = require("../../../database");

const createConnection = () => {
  return mysql.createConnection(connConfig);
};

exports.findLandmarkByLandmarkNameQuery = async (nameQuery) => {
  const likeQuery = "%" + nameQuery + "%";
  const query = "SELECT * FROM landmark WHERE landmark_name LIKE ?";

  try {
    const conn = createConnection();

    const result = await new Promise((resolve, reject) => {
      conn.query(query, [likeQuery], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    conn.end();

    const filteredResult = result.map(({ _timer, _object, ...rest }) => rest);

    console.log(filteredResult);
    return filteredResult;
  } catch (error) {
    throw error;
  }
};
