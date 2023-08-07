const postRepository = require("./posts.repository");

exports.getPosts = async (
  tagsStr,
  page,
  pageSize,
  tagCount,
  nameQuery,
  orderField,
  orderDirection
) => {
  const postList = await postRepository.getPosts(
    tagsStr,
    page,
    pageSize,
    tagCount,
    nameQuery,
    orderField,
    orderDirection
  );

  return postList;
};

exports.getPopularPosts = async () => {
  const postList = await postRepository.getPopularPosts();
  return postList;
};
