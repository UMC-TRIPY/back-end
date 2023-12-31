const mysql = require("mysql2");

const { conn } = require("../../../module/db_connect");
const connection = conn();


//내 여행 목록 조회 API
exports.getUserTravelPlan = (uid) => {
    return new Promise((resolve, reject) => {
        connection.query(
                    `
                    SELECT DISTINCT
                    city_name, departureDate, arrivalDate, a1.plan_index
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

// 내 여행 가방 불러오기 API
exports.getUserBag = (uid) =>{
    return new Promise((resolve,reject) =>{
        connection.query(
                    `
                    SELECT
                    bag_name, departureDate, arrivalDate,
                    CONCAT(
                        DATEDIFF(tp.arrivalDate, tp.departureDate) ,
                        '박 ',
                        DATEDIFF(tp.arrivalDate, tp.departureDate) +1,
                        '일'
                    ) AS stay_duration
                    FROM
                    bag b
                    JOIN
                    travelplan tp ON b.user_index = tp.user_index AND b.plan_index = tp.plan_index
                    WHERE
                    b.user_index = ?`,
                    [uid],
        (err, result) => {
             if(err){
                 reject(err);
             }else{
                 resolve(result);
            }
        }
     );
 }); 
};



// 내 여행가방 만들기 API
exports.createBag = (uid,pid,bagname) => {
    return new Promise((resolve,reject) =>{
        connection.query(
                    `
                    INSERT INTO bag(user_index, plan_index, bag_name)
                    VALUE(?,?,?) `,
                    [uid,pid,bagname],
        (err, result) => {
            if(err){
                reject(err);
            }else{
                resolve(result.insertId);
            }
        }
        );
    });
};

//여행 가방 리스트와 가방 내 준비물 불러오기 API
exports.getUserBagMaterial = (pid) =>{
    return new Promise((resolve,reject) =>{
        connection.query(
                    `
                    SELECT
                    bag_name, materials_name
                    FROM bag b
                    LEFT JOIN bag_materials bm ON bm.bag_index = b.bag_index
                    LEFT JOIN materials m ON m.materials_index = bm.materials_index
                    WHERE plan_index = ${pid}; `,
        (err,result) =>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        }
        );
    });
};

//여행지별 준비물 불러오기 API(준비물+설명)
exports.getCountryMaterial = (cname) =>{
    return new Promise((resolve,reject) =>{console.log(cname)
        connection.query(
                    `
                    select * from country_material inner join country c on country_material.country_index = c.country_index where c.country_name = ?
                    `,
                    [cname],
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

//여행지별 준비물 불러오기 API(준비물+설명)
exports.getCountryMaterialName = (cname) =>{
    return new Promise((resolve,reject) =>{console.log(cname)
        connection.query(
                    `
                    select country_material.materials_index, m.materials_name from country_material inner join materials m
                    on country_material.materials_index = m.materials_index inner join country c on country_material.country_index = c.country_index where c.country_name = ?
                    `,
                    [cname],
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

//여행지별 날씨 불러오기 API


//가방 내부에 메모 작성 API
exports.createBagMemo = (bid,memo) =>{
    return new Promise((resolve,reject) =>{
        connection.query(
                    `
                    UPDATE bag
                    SET bag_memo = ?
                    WHERE bag_index = ?
                    `,
                    [ memo, bid],
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

//가방 내부에 준비물 추가 API
exports.createBagMaterial = (bid, material) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `
            INSERT INTO materials (materials_name)
            VALUES (?);
            `,
            [material],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const newMaterialsIndex = result.insertId;
                    connection.query(
                        `
                        INSERT INTO bag_materials (bag_index, materials_index)
                        VALUES (?, ?);
                        `,
                        [bid, newMaterialsIndex],
                        (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                }
            }
        );
    });
};

//가방 준비물 이름 수정  API
exports.updateBagMaterial = (mid,material) =>{
    return new Promise((resolve,reject) =>{
        connection.query(
                    `
                    UPDATE materials
                    SET materials_name = ?
                    WHERE materials_index = ?
                    `,
                    [ material, mid],
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

// 가방 준비물 삭제 API
exports.deleteBagMaterial = (bid, mid) =>{
    return new Promise((resolve,reject) =>{
        connection.query(
                    `
                    DELETE 
                    FROM bag_materials
                    WHERE bag_index = ? and materials_index = ?
                    `,
                    [bid, mid],
        (err,result) => {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        }
        );
    });
}; // 제약조건 바꿔야함

//가방 준비물 체크박스 기능 API
exports.MaterialCheck = (bid,mid) =>{
    return new Promise((resolve,reject) =>{
        connection.query(
                    `
                    UPDATE bag_materials
                    SET check_box = 
                    CASE WHEN check_box =1 THEN 0 ELSE 1 END
                    WHERE bag_index =? and materials_index = ?
                    `,
                    [bid,mid],
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



//일정에 해당하는 가방 리스트 불러오기 API
exports.getUserPlanBag = (pid) =>{
    return new Promise((resolve,reject) =>{
        connection.query(
                    `
                    SELECT bag_index, user_index, bag_name
                    FROM bag
                    WHERE plan_index = ?
                    `,
                    [pid],
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

//가방에 해당하는 준비물 모두 불러오기 API
exports.UserBagMaterial = (bid) =>{
    return new Promise((resolve,reject) =>{
        connection.query(
                    `
                    SELECT materials_name, m.materials_index, bm.check_box
                    FROM materials m
                    LEFT JOIN bag_materials bm ON m.materials_index = bm.materials_index
                    LEFT JOIN bag b ON b.bag_index = bm.bag_index
                    WHERE b.bag_index = ?`,
                    [bid],
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


//가방 메모 불러오기 API
exports.UserBagMemo = (bid) =>{
    return new Promise((resolve,reject) =>{
        connection.query(
                    `
                    SELECT bag_memo
                    FROM bag
                    WHERE bag_index = ?`,
                    [bid],
            (err,result) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            }         
        );
    });
};