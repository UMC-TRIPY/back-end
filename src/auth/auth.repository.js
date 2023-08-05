const { conn } = require("../../module/db_connect");
const { redisCli, redisClient } = require("../../module/redis_connect");
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
        mysqlConnection.query(
          `SELECT user_index FROM user WHERE email = ${email} AND kakaoId=${kakaoId}`,
          (err, rows) => {
            if (err) reject(err);
            console.log(rows);
            resolve(rows);
          }
        );
      }
    );
  });
};

//RefreshToken을 redis에 저장
exports.saveRefreshTokenInRedis = async (email, refreshToken) => {
  return new Promise((resolve, reject) => {
    try {
      redisClient.set(email, refreshToken);
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

exports.getRefreshToekInRedis = async (email) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(email);
      const refreshToken = redisClient.get(email);
      console.log("getRefreshTokenInRedis 함수", refreshToken);
      resolve(refreshToken);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
