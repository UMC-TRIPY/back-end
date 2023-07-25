const postService = require("./posts.service");

exports.getPosts = async (req, res) => {
  try {
    const { tags, page, pageSize } = req.body;
    const tagsStr = tags.join();
    const tagCount = tags.length;

    console.log(typeof page);

    const postList = await postService.getPosts(
      tagsStr,
      page,
      pageSize,
      tagCount
    );

    res.send(postList);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버 내부 오류" });
  }
};
