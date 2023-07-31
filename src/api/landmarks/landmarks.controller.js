const landMarksService = require("./landmarks.service");

exports.searchLandmark = async (req, res) => {
  try {
    const nameQuery = req.query.nameQuery;

    if (typeof nameQuery != "string") {
      res.status(400).send({
        message:
          "입력한 검색어가 잘못된 입력값입니다. 올바른 값으로 다시 입력해주세요",
      });
    }

    const landmarkList = await landMarksService.findLandmarkByLandmarkNameQuery(
      nameQuery
    );

    res.send(landmarkList);
  } catch (err) {
    res.status(500).send({ message: "서버 내부 오류" });
  }
};

exports.getPopularLandmark = async (req, res) => {
  try {
    const landmarkList = await landMarksService.getPopularLandmark();

    res.send(landmarkList);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버 내부 오류" });
  }
};
