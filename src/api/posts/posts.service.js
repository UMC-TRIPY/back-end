const postRepository = require("./posts.repository");
const tagsService = require("../tags/tags.service");

exports.getPosts = async (
  tagsStr,
  city_index,
  page,
  pageSize,
  tagCount,
  nameQuery,
  orderField,
  orderDirection
) => {
  console.log(city_index);
  const postList = await postRepository.getPosts(
    tagsStr,
    city_index,
    page,
    pageSize,
    tagCount,
    nameQuery,
    orderField,
    orderDirection
  );

  return postList;
};

exports.getPost = async (post_index) => {
  const post = await postRepository.getPost(post_index);
  return post;
};

exports.createPost = async (
  user_index,
  post_title,
  post_content,
  city_index,
  plan_index
) => {
  await postRepository.createPost(
    user_index,
    post_title,
    post_content,
    city_index,
    plan_index
  );
};

exports.updatePost = async (
  post_index,
  user_index,
  post_title,
  post_content,
  city_index,
  plan_index
) => {
  await postRepository.updatePost(
    post_index,
    user_index,
    post_title,
    post_content,
    city_index,
    plan_index
  );
};

exports.deletePost = async (post_index) => {
  await postRepository.deletePost(post_index);
};

exports.getPostWithTitle = async (post_title, post_content) => {
  const post = await postRepository.getPostWithTitle(post_title, post_content);
  return post;
};

exports.createPostTags = async (postId, tags) => {
  await Promise.all(
    tags.map(async (tag_name) => {
      const tag = await tagsService.findOrCreateTag(tag_name);
      console.log(tag);

      await postRepository.createPostTags(postId, tag.tag_index);
    })
  );
};

exports.getPopularPosts = async () => {
  const postList = await postRepository.getPopularPosts();
  return postList;
};
