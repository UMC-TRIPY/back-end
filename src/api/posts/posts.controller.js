const postService = require("./posts.service");

exports.getPosts = async (req, res) => {
  try {
    const { tags, page, pageSize, nameQuery, orderField, orderDirection } =
      req.query;

    const tagsStr = tags.join();
    const tagCount = tags.length;

    const postList = await postService.getPosts(
      tagsStr,
      page,
      pageSize,
      tagCount,
      nameQuery,
      orderField,
      orderDirection
    );
    console.log(orderDirection);

    res.send(postList);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getPost = async (req, res) => {
  try {
    const { post_index } = req.params;

    const post = await postService.getPost(post_index);

    res.send(post);
  } catch (err) {
    res.send(err);
  }
};

exports.createPost = async (req, res) => {
  try {
    const {
      user_index,
      post_title,
      post_content,
      city_index,
      tags,
      post_image,
      post_file,
      plan_index,
    } = req.body;

    await postService.createPost(
      user_index,
      post_title,
      post_content,
      city_index,
      plan_index
    );

    const createdPost = await postService.getPostWithTitle(post_title);

    await postService.createPostTags(createdPost.post_index, tags);

    await postService;
  } catch (error) {
    throw error;
  }
};

exports.getPopularPosts = async (req, res) => {
  try {
    const postList = await postService.getPopularPosts();
    res.status(200).json({ message: "성공", data: postList });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버 내부 오류" });
  }
};
