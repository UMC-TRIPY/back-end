const landMarksService = require("./landmarks.service");

exports.searchLandmark = async (req, res) => {
  try {
    const nameQuery = req?.query.nameQuery;

    if (typeof nameQuery != "string") {
      res
        .status(400)
        .json(
          "입력한 검색어가 잘못된 입력값입니다. 올바른 값으로 다시 입력해주세요"
        );
    }

    console.log(nameQuery);

    const landmarkList = await landMarksService.findLandmarkByLandmarkNameQuery(
      nameQuery
    );

    res.send(landmarkList);
  } catch (err) {
    throw err;
  }
};
