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

exports.filteringSearch = async (continent, country, city) => {
  const landmarkList = await landmarkRepository.filteringSearchQuery(
    continent,
    country,
    city
  );
  return landmarkList;
};

exports.getPopularPosts = async () => {
  const postList = await postRepository.getPopularPosts();
  return postList;
};
