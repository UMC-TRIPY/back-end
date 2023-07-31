const landMarksService = require("./landmarks.service");

exports.searchLandmark = async (req, res) => {
  try {
    const nameQuery = req.query.nameQuery;

    console.log(nameQuery);

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
