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

    const filteredResult = result.map(({ _timer, _object, ...rest }) => rest);

    console.log(filteredResult);
    return filteredResult;
  } catch (error) {
    throw error;
  }
};

exports.createTravelPlan = async (travelPlanId, cityId) => {
  const query = "INSERT INTO travelplan(city_index, plan_index) VALUE(? , ? )";

  try {
    const conn = createConnection();

    const result = await new Promise((resolve, reject) => {
      conn.query(query, [travelPlanId, cityId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    conn.end();

    const filteredResult = result.map(({ _timer, _object, ...rest }) => rest);

    console.log(filteredResult);
    return filteredResult;
  } catch (error) {
    throw error;
  }
};
