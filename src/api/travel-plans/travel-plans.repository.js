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

//내 여행 목록 조회 API
exports.getUserTravelPlan = (uid) => {
  return new Promise((resolve, reject) => {
      connection.query(
                  `
                  SELECT DISTINCT
                  city_name, departureDate,arrivalDate
                  FROM
                  travelplan a1
                  LEFT JOIN city_plan b1 ON a1.plan_index = b1.plan_index
                  LEFT JOIN city c1 ON b1.city_index = c1.city_index
                  WHERE
                  a1.user_index = ${uid}

                  UNION

                  SELECT DISTINCT
                  city_name, departureDate, arrivalDate
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
exports.getFriendTravelPlan = (uid) => {
  console.log("getFriendTravelPlan function called with uid:", uid);
  return new Promise((resolve, reject) => {
      connection.query(
                  `
                  SELECT 
                  CASE WHEN c.to_user_index = a.user_index THEN c.from_user_index ELSE c.to_user_index END AS result
                  FROM travelplan a
                  LEFT JOIN plan_friend b ON a.plan_index = b.plan_index
                  JOIN friend c ON b.relation_index = c.relation_index
                  WHERE a.user_index = ${uid} AND c.are_we_friend = 1
              `,
      (err,result) => {
      if(err){
            console.log("Error executing query:", err);
           reject(err);
       }else {
          console.log("Query result:", result);
          resolve(result);
      }
      }
      );
  });
}; 

//일정에 친구 초대 기능 API
exports.postFriendTravelPlan = (pid,rid) => {
  return new Promise((resolve, reject) => {
      connection.query(
                  `
                  INSERT INTO plan_friend(plan_index, relation_index)
                  VALUE(?,?)
                  `,
                  [pid, rid],
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

//상세 일정 추가 기능 API
exports.postUserDetailedPlan = (pid, plan_date, plan_color, plan_title, start_time, end_time, plan_place, plan_budget, plan_memo, plan_image, plan_file) =>{
  return new Promise((resolve, reject) => {
    connection.query(
                `
                INSERT INTO timeplan(traveplan_index, plan_date, plan_color, plan_title, start_time, end_time, plan_place, plan_budget, plan_memo, plan_image, plan_file)
                VALUE(?,?,?,?,?,?,?,?,?,?,?)
                `,
                [pid, plan_date, plan_color, plan_title, start_time, end_time, plan_place, plan_budget, plan_memo, plan_image, plan_file],
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
exports.putUserDetailedPlan = (tid, plan_date, plan_color, plan_title, start_time, end_time, plan_place, plan_budget, plan_memo, plan_image, plan_file) =>{
  return new Promise((resolve, reject) => {
    connection.query(
                `
                UPDATE timeplan
                SET  plan_date = ?, plan_color = ?, plan_title = ?, start_time = ?, end_time = ?, plan_place = ?, plan_budget = ?, plan_memo = ?, plan_image = ?, plan_file = ?
                WHERE timeplan_index = ?
                `,
      [ plan_date, plan_color, plan_title, start_time, end_time, plan_place, plan_budget, plan_memo, plan_image, plan_file, tid],
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
               SELECT plan_color, plan_date, start_time, end_time, plan_title, plan_memo
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
               SELECT plan_date, plan_color, plan_title, start_time, end_time, plan_place, plan_budget, plan_memo, plan_image, plan_file
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