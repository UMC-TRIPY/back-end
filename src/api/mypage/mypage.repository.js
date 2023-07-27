const mysqlConnection = require("../../../config/mysql.config");

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
        const result = rows.map((row) => row.user_index);
        resolve(result);
      }
    );
  });
};

exports.friendSearch = (keyword) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `SELECT user_index
        FROM friend
        WHERE nickname LIKE '${keyword}%' OR email LIKE '${keyword}%';
        `,
      (err, rows) => {
        if (err) reject(err);
        const result = rows.map((row) => row.user_index);
        resolve(result);
      }
    );
  });
};

//현재 접속중인 유저의 access token을 이용해 userId를 가져와야한다, userId를 1로 가정
//반대로 userId를 통해 유저 정보를 확인할 api도 필요하다.
exports.userFriendList = (userId) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `SELECT DISTINCT
      CASE
          WHEN from_user_index = 1 THEN to_user_index
          WHEN to_user_index = 1 THEN from_user_index
      END AS user_index
  FROM friend
  WHERE (from_user_index = 1 OR to_user_index = 1) AND are_we_friend = 1;
  `,
      (err, rows) => {
        if (err) reject(err);
        const friendList = rows.map((row) => row.user_index);
        resolve(friendList);
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
