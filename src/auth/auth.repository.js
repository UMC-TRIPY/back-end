const { conn } = require("../../module/db_connect");
const { redisClient } = require("../../module/redis_connect");
const mysqlConnection = conn();

exports.findUserByKakaoId = async (kakaoId, email) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `SELECT user_index,email,nickname,profileImg FROM user WHERE kakaoId = ${kakaoId} AND email = '${email}'`,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

exports.findUserByGoogleId = async (googleId, email) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `SELECT user_index,email,nickname,profileImg FROM user WHERE googleId =${googleId} AND email ='${email}'`,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

exports.signUpWithKakao = async (kakaoId, email) => {
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
          `SELECT user_index,email,nickname,profileImg FROM user WHERE email = '${email}' AND kakaoId=${kakaoId}`,
          (err, rows) => {
            if (err) reject(err);

            resolve(rows);
          }
        );
      }
    );
  });
};

exports.signUpWithGoogle = async (googleId, email) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `INSERT INTO user(
            googleId,
            nickname,
            email,
            created_at
        ) VALUES (?, ?, ?, NOW())`,
      [googleId, "csyy", email],
      (err, rows) => {
        if (err) reject(err);
        mysqlConnection.query(
          `SELECT user_index,email,nickname,profileImg FROM user WHERE email = '${email}' AND googleId=${googleId}`,
          (err, rows) => {
            if (err) reject(err);
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
      let env = false;
      redisClient.keys("*", (err, value) => {
        for (const key of value) {
          redisClient.get(key, (err, value) => {
            if (value === token && value !== undefined) {
              redisClient.del(key);
              env = true;
            }
          });
        }
      });
      if (!env) console.log("refresh token이 일치하지 않음");
      resolve(true);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

exports.setNickname = async (user_index, nickname) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `UPDATE user SET nickname = "${nickname}" WHERE user_index = ${user_index}`,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};
