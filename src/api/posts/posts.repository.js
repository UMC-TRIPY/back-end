const conn = require("../../../module/db_connect");
const connection = conn();

exports.getPosts = async (tagsStr, page, pageSize, tagCount) => {
  const offset = (page - 1) * pageSize;

  const query = `SELECT * FROM post p JOIN post_tag pt ON p.post_index = pt.post_index
  JOIN user u ON p.user_index = u.user_index
  JOIN tag t ON pt.tag_index = t.tag_index
  WHERE t.tag_name IN ('${tagsStr}')
  GROUP BY p.post_index, p.user_index, p.post_title, p.post_content, p.city_index, p.view, p.thumbs, p.created_at, p.updated_at, pt.tag_index
  HAVING COUNT(DISTINCT t.tag_name) = ${tagCount}
  ORDER BY p.created_at DESC
  LIMIT ${pageSize}
  OFFSET ${offset}
  `;

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
