const { conn } = require("../../../module/db_connect");
const connection = conn();

exports.getPosts = async (tagsStr, page, pageSize, tagCount, nameQuery) => {
  const offset = (page - 1) * pageSize;

  const likeQuery = "%" + nameQuery + "%";

  let query = `SELECT * FROM post p JOIN post_tag pt ON p.post_index = pt.post_index
  JOIN user u ON p.user_index = u.user_index
  JOIN tag t ON pt.tag_index = t.tag_index
  WHERE t.tag_name IN ('${tagsStr}')
  GROUP BY p.post_index, p.user_index, p.post_title, p.post_content, p.city_index, p.view, p.thumbs, p.created_at, p.updated_at, pt.tag_index
  HAVING COUNT(DISTINCT t.tag_name) = ${tagCount}
  ORDER BY p.created_at DESC
  LIMIT ${pageSize}
  OFFSET ${offset}
  `;

  if (nameQuery) {
    query = `SELECT * FROM post p JOIN post_tag pt ON p.post_index = pt.post_index
    JOIN user u ON p.user_index = u.user_index
    JOIN tag t ON pt.tag_index = t.tag_index
    WHERE t.tag_name IN ('${tagsStr}') AND p.post_title LIKE ?
    GROUP BY p.post_index, p.user_index, p.post_title, p.post_content, p.city_index, p.view, p.thumbs, p.created_at, p.updated_at, pt.tag_index
    HAVING COUNT(DISTINCT t.tag_name) = ${tagCount}
    ORDER BY p.created_at DESC
    LIMIT ${pageSize}
    OFFSET ${offset}
    `;
  }
  try {
    const result = await new Promise((resolve, reject) => {
      console.log(query);
      connection.query(query, [likeQuery], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    console.log(result);

    const filteredResult = result.map(({ _timer, _object, ...rest }) => rest);

    console.log(filteredResult);
    return filteredResult;
  } catch (error) {
    throw error;
  }
};
