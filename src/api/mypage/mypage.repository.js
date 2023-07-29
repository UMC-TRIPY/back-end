// const mysqlConnection = require("../../../module/db_connect");
const { conn } = require("../../../module/db_connect");
const mysqlConnection = conn();
//친구 요청 API 쿼리
exports.insertFriendRequest = (user_idx, friend_idx) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `INSERT INTO friend (from_user_index, to_user_index, are_we_friend, created_at)
    VALUES (${user_idx}, ${friend_idx}, 0, NOW());
    `,
      (err, rows) => {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
};

//friend 테이블에서 친구 요청(are_we_friend = 0)을 삭제한다.
exports.deleteFriendRequest = (user_idx, friend_idx) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `DELETE FROM friend
      WHERE from_user_index = ${user_idx} AND to_user_index = ${friend_idx} AND are_we_friend = 0;
      `,
      (err, rows) => {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
};

//친구 요청 수락 API 쿼리
exports.updateFriendRequest = (user_idx, friend_idx) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `UPDATE friend
      SET are_we_friend = 1
      WHERE from_user_index = ${friend_idx} AND to_user_index = ${user_idx} AND are_we_friend = 0;
      `,
      (err, rows) => {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
};

//친구 요청 거절 API
exports.rejectFriendRequest = (user_idx, friend_idx) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `DELETE FROM friend
      WHERE from_user_index = ${friend_idx} AND to_user_index = ${user_idx} AND are_we_friend = 0;
      `,
      (err, rows) => {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
};

//내가 보낸 친구 요청 조회 API
exports.getFriendRequestList = (user_idx) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `SELECT to_user_index
      FROM friend
      WHERE from_user_index = ${user_idx} AND are_we_friend = 0;
      `,
      (err, rows) => {
        if (err) reject(err);
        //쿼리 결과물을 한 배열에 담는다.
        const result = rows.map((row) => row.to_user_index);
        resolve(result);
      }
    );
  });
};

//내가 받은 친구 요청 목록 조회 API
exports.getFriendRequestRecieveList = (user_idx) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `SELECT from_user_index
      FROM friend
      WHERE to_user_index = ${user_idx} AND are_we_friend = 0;
      `,
      (err, rows) => {
        if (err) reject(err);
        //쿼리 결과물을 한 배열에 담는다.
        const result = rows.map((row) => row.from_user_index);
        resolve(result);
      }
    );
  });
};

exports.userSearch = (keyword) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `SELECT user_index
        FROM user
        WHERE nickname LIKE '${keyword}%' OR email LIKE '${keyword}%';
        `,
      (err, rows) => {
        if (err) reject(err);
        try {
          const result = rows.map((row) => row.user_index);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};

exports.friendSearch = (user_idx, keyword) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `SELECT DISTINCT
        CASE
            WHEN f.from_user_index = ${user_idx} THEN f.to_user_index
            WHEN f.to_user_index = ${user_idx} THEN f.from_user_index
        END AS user_index
      FROM friend f
       JOIN user u ON ((f.from_user_index = u.user_index OR f.to_user_index = u.user_index) AND f.from_user_index IS NOT NULL)
      WHERE (u.nickname LIKE '${keyword}%' OR u.email LIKE '${keyword}%')
      AND f.are_we_friend = 1;
      `,
      (err, rows) => {
        if (err) reject(err);
        try {
          const filteredRows = rows.filter((row) => row.user_index !== null);
          const result = filteredRows.map((row) => row.user_index);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};

//현재 접속중인 유저의 access token을 이용해 userId를 가져와야한다, userId를 1로 가정
//반대로 userId를 통해 유저 정보를 확인할 api도 필요하다.
exports.userFriendList = (user_idx) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `SELECT DISTINCT
      CASE
          WHEN from_user_index = ${user_idx} THEN to_user_index
          WHEN to_user_index = ${user_idx} THEN from_user_index
      END AS user_index
  FROM friend
  WHERE (from_user_index = ${user_idx} OR to_user_index = ${user_idx}) AND are_we_friend = 1;
  `,
      (err, rows) => {
        if (err) reject(err);
        console.log(rows);
        try {
          const friendList = rows.map((row) => row.user_index);
          resolve(friendList);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      }
    );
  });
};

//친구 차단 API 쿼리
exports.breakFriend = (user_idx, friend_idx) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `UPDATE friend
    SET isblocked = 1
    WHERE (from_user_index = ${user_idx} AND to_user_index = ${friend_idx}) OR (from_user_index = ${friend_idx} AND to_user_index = ${user_idx});
    `,
      (err, rows) => {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
};

//친구 끊기 쿼리 -> friend 테이블에서 행 삭제
exports.unFriend = (user_idx, friend_idx) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `DELETE FROM friend
      WHERE ((from_user_index = ${user_idx} AND to_user_index = ${friend_idx})
        OR (from_user_index = ${friend_idx} AND to_user_index = ${user_idx}))
      AND are_we_friend = 1 AND isblocked = 0;
      `,
      (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      }
    );
  });
};
// 유저 정보 조회 API
exports.getUserByInfoId = (kakaoId) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `
                  SELECT nickname, email, nationality, profileImg 
                  FROM user  
                  WHERE kakaoId = ${kakaoId}`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// 유저 탈퇴 API
exports.deleteUser = (kakaoId) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `
                  DELETE
                  FROM user
                  WHERE kakaoId = ${kakaoId}`,

      (err, result) => {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
};

//profile 이미지 등록 API
exports.saveProfileImage = (kakaoId, profileImg) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `UPDATE user 
   SET profileImg = ? 
   WHERE kakaoId = ?`,
      [profileImg, kakaoId],
      (err, result) => {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
};

//Profile 이미지 삭제 API
exports.deleteProfileImage = (kakaoId) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `UPDATE user 
           SET profileImg = NULL
           WHERE kakaoId = ${kakaoId}
           `,
      (err, result) => {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
};

// 국적 등록 API
exports.saveNationality = (kakaoId, nationality) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `
                  UPDATE user 
                  SET nationality = ? 
                  WHERE kakaoId = ?`,
      [nationality, kakaoId],
      (err, result) => {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
};

//국적 수정 API
exports.updateNationality = (kakaoId, nationality) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `UPDATE user
           SET nationality = ?
           WHERE kakaoId = ?
           `,
      [nationality, kakaoId],
      (err, result) => {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
};

//국적 삭제 API
exports.deleteNationality = (kakaoId) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `UPDATE user
           SET nationality = NULL
           WHERE kakaoId = ${kakaoId}
           `,
      (err, result) => {
        if (err) reject(err);

        resolve(true);
      }
    );
  });
};
