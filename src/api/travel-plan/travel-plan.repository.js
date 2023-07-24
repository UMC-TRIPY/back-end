const mysql = require("mysql2");
const connConfig = require("../../../database");

const createConnection = () => {
  return mysql.createConnection(connConfig);
};

exports.createTravelPlan = async (userId, departureDate, arrivalDate) => {
  const query =
    "INSERT INTO travelplan(user_index, departureDate, arrivalDate) VALUE(? , ? , ? )";

  try {
    const conn = createConnection();

    const result = await new Promise((resolve, reject) => {
      conn.query(query, [userId, departureDate, arrivalDate], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    conn.end();

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
    const conn = createConnection();

    const result = await new Promise((resolve, reject) => {
      conn.query(query, [cityId, travelPlanId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    conn.end();
  } catch (error) {
    throw error;
  }
};
