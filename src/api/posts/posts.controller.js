const postService = require("./posts.service");

exports.getPosts = async (req, res) => {
  try {
    const { tags, page, pageSize, nameQuery } = req.query;

    const tagsStr = tags.join();
    const tagCount = tags.length;

    const postList = await postService.getPosts(
      tagsStr,
      page,
      pageSize,
      tagCount,
      nameQuery
    );

    res.send(postList);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버 내부 오류" });
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
