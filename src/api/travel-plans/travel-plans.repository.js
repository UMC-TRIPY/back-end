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
