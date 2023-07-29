// const mysql = require("mysql2");
const { conn } = require("../../../module/db_connect");
const connection = conn();

exports.findLandmarkByLandmarkNameQuery = async (nameQuery) => {
  const likeQuery = "%" + nameQuery + "%";
  const query = "SELECT * FROM landmark WHERE landmark_name LIKE ?";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(query, [likeQuery], (err, result) => {
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
      connection.query(query, [1], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    console.log(result);

    const filteredResult = result.map(({ _timer, _object, ...rest }) => rest);

    console.log(filteredResult);
    return filteredResult;
  } catch (error) {
    throw error;
  }
};

//수정필요
exports.filteringSearchQuery = async (continent, country, city) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM landmark WHERE 1=1";

    // 매개변수가 있는 경우 해당 조건을 쿼리에 추가
    if (continent) {
      query += ` AND continent = '${continent}'`;
    }
    if (country) {
      query += ` AND country = '${country}'`;
    }
    if (city) {
      query += ` AND city = '${city}'`;
    }

    // 쿼리를 실행
    connection.query(query, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};
