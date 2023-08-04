const { conn } = require("../../module/db_connect");
const mysqlConnection = conn();

exports.findUserById = async (kakaoId, email) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `SELECT user_index FROM user WHERE kakaoId = ${kakaoId} AND email = '${email}'`,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

exports.signUp = async (kakaoId, email) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `INSERT INTO user(
            kakaoId,
            nickname,
            email,
            created_at
        ) VALUES (?, ?, ?, NOW())`,
      [kakaoId, "csy", email],
      (err, rows) => {
        if (err) reject(err);
        console.log(rows);
        resolve(rows);
      }
    );
  });
};
