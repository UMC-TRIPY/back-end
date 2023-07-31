const landmarkRepository = require("./landmarks.repository");

exports.findLandmarkByLandmarkNameQuery = async (nameQuery) => {
  const landmarkList = await landmarkRepository.findLandmarkByLandmarkNameQuery(
    nameQuery
  );

  return landmarkList;
};

exports.getPopularLandmark = async () => {
  const landmarkList = await landmarkRepository.getPopularLandmark();

  return landmarkList;
};
