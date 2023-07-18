const mysqlConnection = require("../../../config/mysql.config");

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

exports.userEmail = (email) => {
  return new Promise((resolve, rejcet) => {
    mysqlConnection.query(``, (err, rows) => {
      if (err) rejcet(err);
      resolve(rows);
    });
    //query
  });
};
exports.userNickname = (nickname) => {
  return new Promise((resolve, rejcet) => {
    //query
    if (err) rejcet(err);
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
