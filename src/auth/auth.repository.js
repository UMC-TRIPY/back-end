const { conn } = require("../../module/db_connect");
const { redisCli, redisClient } = require("../../module/redis_connect");
const mysqlConnection = conn();
const { promisify } = require("util");

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

//redis에서 email을 이용해 refresh token을 가져온다.
exports.getRefreshTokenInRedis = async (email) => {
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

exports.logout = async (token) => {
  return new Promise((resolve, reject) => {
    try {
      // 해당 값을 갖는 키를 찾아서 삭제
      redisClient.keys("*", (err, value) => {
        for (const key of value) {
          redisClient.get(key, (err, value) => {
            if (value === token && value !== undefined) {
              redisClient.del(key);
            }
          });
        }
      });
      resolve(true);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
