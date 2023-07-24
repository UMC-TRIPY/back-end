const conn = require("../../../module/db_connect");
const connection = conn();

exports.getMaterials = async () => {
  const query = "SELECT * FROM materials";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const filteredResult = result.map(({ _timer, _object, ...rest }) => rest);

    console.log(filteredResult);
    return filteredResult;
  } catch (error) {
    throw error;
  }
};
