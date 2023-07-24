const mysql = require("mysql2");
const conn = require("../../../module/db_connect");

exports.findLandmarkByLandmarkNameQuery = async (nameQuery) => {
  const likeQuery = "%" + nameQuery + "%";
  const query = "SELECT * FROM landmark WHERE landmark_name LIKE ?";

  try {
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

exports.getPopularLandmark = async () => {
  const query = "SELECT * FROM landmark WHERE ispopular = ?";

  try {
    const result = await new Promise((resolve, reject) => {
      conn.query(query, [1], (err, result) => {
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
