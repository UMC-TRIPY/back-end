// const mysql = require("mysql2");
const { conn } = require("../../../module/db_connect");
const connection = conn();

exports.findLandmarkByLandmarkNameQuery = async (nameQuery, city_index) => {
  const likeQuery = "%" + nameQuery + "%";

  let query = "SELECT * FROM landmark WHERE city_index = ?";

  if (nameQuery) {
    query =
      "SELECT * FROM landmark WHERE city_index = ? AND landmark_name LIKE ?";
  }
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(query, [city_index, likeQuery], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const filteredResult = result.map(({ _timer, _object, ...rest }) => rest);

    return filteredResult;
  } catch (error) {
    throw error;
  }
};

exports.getPopularLandmark = async (city_index) => {
  const query = "SELECT * FROM landmark WHERE city_index = ? AND ispopular = ?";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(query, [city_index, 1], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const filteredResult = result.map(({ _timer, _object, ...rest }) => rest);

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

//인기 게시글 10개 조회
exports.getPopularPosts = async () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT post_index,post_title,view,thumbs,t.country_name FROM post p INNER JOIN city c ON p.city_index = c.city_index INNER JOIN country t ON c.country_index = t.country_index ORDER BY p.thumbs DESC LIMIT 10`,

      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};
