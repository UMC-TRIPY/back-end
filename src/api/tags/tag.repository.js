exports.getTagByName = async (tagName) => {
  try {
    const query = `SELECT * FROM tag WHERE tag_name = ${tagName}`;

    const result = await new Promise((resolve, reject) => {
      console.log(query);
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return result;
  } catch (err) {
    throw err;
  }
};

exports.createTag = async (tagName) => {
  try {
    const query = `INSERT INTO tag (tag_name) VALUES (${tagName})`;

    const result = await new Promise((resolve, reject) => {
      console.log(query);
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return result;
  } catch (err) {
    throw err;
  }
};
