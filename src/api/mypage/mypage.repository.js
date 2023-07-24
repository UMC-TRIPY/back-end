const mysqlConnection = require("../../../config/database");

// 유저 정보 조회 API
exports.getUserByInfoId = (kakaoId) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(
                    `
                    SELECT nickname, email, nationality, profileImg 
                    FROM user  
                    WHERE kakaoId = ${kakaoId}`,
        (err,result) => {
        if(err){
             reject(err);
         }else {
            resolve(result);
        }
        }
        );
    });
};
    
// 유저 탈퇴 API
exports.deleteUser = (kakaoId) =>{
    return new Promise((resolve, reject) =>{
        mysqlConnection.query(
                    `
                    DELETE
                    FROM user
                    WHERE kakaoId = ${kakaoId}`,

        (err,result) => {
        if(err) reject(err);
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
     WHERE kakaoId = ?`,[profileImg,kakaoId],
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
        if(err) reject(err);
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
                    WHERE kakaoId = ?`,[nationality,kakaoId],
     (err, result) => {
      if (err) reject(err);
      resolve(true);
            }
         );
    });
 };

 //국적 수정 API
exports.updateNationality = (kakaoId,nationality) =>{
    return new Promise((resolve, reject) => {
        mysqlConnection.query(
            `UPDATE user
             SET nationality = ?
             WHERE kakaoId = ?
             `,[nationality,kakaoId],
    (err, result) => {
    if(err) reject(err);
    resolve(true);
        }
        );
    });
};


 //국적 삭제 API
exports.deleteNationality = (kakaoId) =>{
    return new Promise((resolve, reject) => {
        mysqlConnection.query(
            `UPDATE user
             SET nationality = NULL
             WHERE kakaoId = ${kakaoId}
             `,
    (err, result) => {
        if(err) reject(err);
    
    resolve(true);
        }
        );
    });
};



