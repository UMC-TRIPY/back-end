const { query } = require("express");
const landMarksService = require("./landmarks.service");

exports.searchLandmark = async (req, res) => {
  try {
    const nameQuery = req.query.nameQuery;
    const city_index = req.query.city_index;

    console.log(nameQuery);

    const landmarkList = await landMarksService.findLandmarkByLandmarkNameQuery(
      nameQuery,
      city_index
    );

    res.send(landmarkList);
  } catch (err) {
    res.status(500).send({ message: "서버 내부 오류" });
  }
};

exports.getPopularLandmark = async (req, res) => {
  try {
    const { city_index } = req.query;
    const landmarkList = await landMarksService.getPopularLandmark(city_index);

    res.send(landmarkList);
  } catch (err) {
    res.send(err);
  }
};

exports.filteringSearch = async (req, res) => {
  const continent = req.query.continent; //대륙
  const country = req.query.country;
  const city = req.query.city;
  if (
    typeof continent != "string" ||
    typeof country != "string" ||
    typeof city != "string"
  ) {
    res.status(400).send({
      message:
        "입력한 검색어가 잘못된 입력값입니다. 올바른 값으로 다시 입력해주세요",
    });
  }
  try {
    const landmarkList = await landMarksService.filteringSearch(
      continent,
      country,
      city
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
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
