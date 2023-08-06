const postRepository = require("./posts.repository");

exports.getPosts = async (tagsStr, page, pageSize, tagCount, nameQuery) => {
  const postList = await postRepository.getPosts(
    tagsStr,
    page,
    pageSize,
    tagCount,
    nameQuery
  );

  return postList;
};

exports.getPopularPosts = async () => {
  const postList = await postRepository.getPopularPosts();
  return postList;
};
