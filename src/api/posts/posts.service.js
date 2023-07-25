const postRepository = require("./posts.repository");

exports.getPosts = async (tagsStr, page, pageSize, tagCount) => {
  const postList = await postRepository.getPosts(
    tagsStr,
    page,
    pageSize,
    tagCount
  );

  return postList;
};
