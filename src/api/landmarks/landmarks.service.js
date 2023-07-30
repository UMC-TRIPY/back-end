const landmarkRepository = require("./landmarks.repository");

exports.findLandmarkByLandmarkNameQuery = async (nameQuery) => {
  const landmarkList = await landmarkRepository.findLandmarkByLandmarkNameQuery(
    nameQuery
  );

  console.log(landmarkList);

  return landmarkList;
};

exports.getPopularLandmark = async () => {
  const landmarkList = await landmarkRepository.getPopularLandmark();

  return landmarkList;
};
