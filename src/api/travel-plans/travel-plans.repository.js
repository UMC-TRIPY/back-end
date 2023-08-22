const mysql = require("mysql2");

const { conn } = require("../../../module/db_connect");
const connection = conn();

exports.createTravelPlan = async (userId, departureDate, arrivalDate) => {
  const query =
    "INSERT INTO travelplan(user_index, departureDate, arrivalDate) VALUE(? , ? , ? )";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(
        query,
        [userId, departureDate, arrivalDate],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    const { _timer, _object, ...rest } = result;

    const createdTravelPlanId = rest.insertId;
    return createdTravelPlanId;
  } catch (error) {
    throw error;
  }
};

exports.createCityPlan = async (travelPlanId, cityId) => {
  const query = "INSERT INTO city_plan(city_index, plan_index) VALUE(? , ? )";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(query, [cityId, travelPlanId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

//여행 등록 API
exports.postTravelPlan = async (uid, departureDate, arrivalDate, cityname) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `
      INSERT INTO travelplan(user_index, departureDate, arrivalDate)
      VALUE (?, ?, ?);
      `,
      [uid, departureDate, arrivalDate],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          const planIndex = result.insertId; // travelplan이 생성한 plan_index

          // city_plan에 데이터 삽입
          connection.query(
            `
            INSERT INTO city_plan(city_index, plan_index)
            VALUES (
            (SELECT city_index FROM city WHERE city_name = ?),?);
            `,
            [cityname, planIndex], // 수정된 부분
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(planIndex);
              }
            }
          );
        }
      }
    );
  });
};

//내가 생성한 여행 목록 조회 API
exports.UserMadeTravelPlan = (uid) => {
  return new Promise((resolve, reject) => {
    connection.query(
                  `
                  SELECT
                  city_name, departureDate,arrivalDate, a1.plan_index
                  FROM
                  travelplan a1
                  LEFT JOIN city_plan b1 ON a1.plan_index = b1.plan_index
                  LEFT JOIN city c1 ON b1.city_index = c1.city_index
                  WHERE
                  a1.user_index = ?;
                  `,
                  [uid],
                  (err,result) => {
                    if(err){
                      reject(err);
                    }else{
                      resolve(result);
                    }
                  }
    );
  });
};

//내 여행 목록 조회 API
exports.getUserTravelPlan = (uid) => {
  return new Promise((resolve, reject) => {
      connection.query(
                  `
                  SELECT DISTINCT
                  city_name, departureDate,arrivalDate, a1.plan_index
                  FROM
                  travelplan a1
                  LEFT JOIN city_plan b1 ON a1.plan_index = b1.plan_index
                  LEFT JOIN city c1 ON b1.city_index = c1.city_index
                  WHERE
                  a1.user_index = ${uid}

                  UNION

                  SELECT DISTINCT
                  city_name, departureDate, arrivalDate, a2.plan_index AS friend_plan_index
                  FROM
                  friend f
                  JOIN plan_friend pf ON f.relation_index = pf.relation_index
                  LEFT JOIN travelplan a2 ON pf.plan_index = a2.plan_index
                  LEFT JOIN city_plan b2 ON a2.plan_index = b2.plan_index
                  LEFT JOIN city c2 ON b2.city_index = c2.city_index
                  WHERE
                  f.from_user_index = ${uid} OR f.to_user_index = ${uid};
                  `,
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

//일정 공유 중인 친구 조회 API
exports.getFriendTravelPlan = (uid,pid) => {
  return new Promise((resolve, reject) => {
      connection.query(
                  `
                  SELECT 
                  CASE WHEN c.to_user_index = ${uid} THEN c.from_user_index ELSE c.to_user_index END AS result
                  FROM (
                  SELECT f.from_user_index, f.to_user_index
                  FROM friend f
                  INNER JOIN plan_friend pf ON f.relation_index = pf.relation_index
                  WHERE pf.plan_index = ${pid} AND f.are_we_friend = 1) c;
              `,
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

//일정에 친구 초대 기능 API
exports.postFriendTravelPlan = (pid, uid1,uid2) => {
  return new Promise((resolve, reject) => {
      connection.query(
          `
          INSERT INTO plan_friend (plan_index, relation_index)
          SELECT ?, f.relation_index
          FROM friend f
          WHERE ((f.from_user_index = ? AND f.to_user_index = ?)
          OR (f.from_user_index = ? AND f.to_user_index = ?))
          AND f.are_we_friend = 1 AND f.isblocked = 0
            `,
            [pid, uid1, uid2, uid2, uid1],
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

//상세 일정 추가 기능 API
exports.postUserDetailedPlan = (pid, plan_date, plan_color, plan_lineColor, plan_title, plan_column, start_time, plan_halfHour , plan_place, plan_budget, plan_memo, plan_image, plan_file) =>{
  return new Promise((resolve, reject) => {
    connection.query(
                `
                INSERT INTO timeplan(traveplan_index, plan_date, plan_color, plan_lineColor, plan_title, plan_column, start_time, plan_halfHour , plan_place, plan_budget, plan_memo, plan_image, plan_file)
                VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?)
                `,
                [pid, plan_date, plan_color, plan_lineColor, plan_title, plan_column, start_time, plan_halfHour , plan_place, plan_budget, plan_memo, plan_image, plan_file],
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

//상세 일정 수정 기능 API
exports.putUserDetailedPlan = (tid, plan_date, plan_color, plan_lineColor, plan_title, plan_column, start_time, plan_halfHour , plan_place, plan_budget, plan_memo, plan_image, plan_file) =>{
  return new Promise((resolve, reject) => {
    connection.query(
                `
                UPDATE timeplan
                SET  plan_date = ?, plan_color = ?,plan_lineColor =?, plan_title = ?, plan_column =?, start_time = ?, plan_halfHour =? , plan_place = ?, plan_budget = ?, plan_memo = ?, plan_image = ?, plan_file = ?
                WHERE timeplan_index = ?
                `,
      [ plan_date, plan_color, plan_lineColor, plan_title, plan_column, start_time, plan_halfHour, plan_place, plan_budget, plan_memo, plan_image, plan_file, tid],
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

//상세 일정 삭제 기능 API
exports.deleteUserDetailedPlan = (tid) =>{
  return new Promise((resolve, reject) => {
    connection.query(
               `
               DELETE
               FROM timeplan
               WHERE timeplan_index = ?
               `,
               [tid],
    (err,result) => {
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    }
    );
  });
};

//모든 상세 일정 조회 API
exports.getUserAllTravelPlan = (pid) =>{
  return new Promise((resolve, reject) => {
    connection.query(
               `
               SELECT plan_date, plan_color,plan_lineColor, start_time, plan_halfHour, plan_title, plan_memo
               FROM timeplan
               WHERE traveplan_index = ${pid}
               `,
    (err,result) => {
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    }
    );
  });
};

//상세 일정 조회 기능(하나) API
exports.getUserOneTravelPlan = (tid) =>{
  return new Promise((resolve, reject) => {
    connection.query(
               `
               SELECT plan_date, plan_color,plan_lineColor, plan_title, start_time, plan_halfHour, plan_place, plan_budget, plan_memo, plan_image, plan_file
               FROM timeplan
               WHERE timeplan_index = ${tid}
               `,
    (err,result) => {
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    }
    );
  });
};