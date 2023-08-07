const { resolve } = require("path");
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

//나라 이름은 어떻게 가져오지?
exports.getPopularPosts = async () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT post_index,post_title,view,thumbs,t.country_name FROM post p INNER JOIN city c ON p.city_index = c.city_index INNER JOIN country t ON c.country_index = t.country_index ORDER BY p.thumbs DESC LIMIT 10`,

      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};
