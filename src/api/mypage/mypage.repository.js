const mysqlConnection = require("../../../config/mysql.config");

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
        console.log(rows);
        resolve(rows);
      }
    );
  });
};
