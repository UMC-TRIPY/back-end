const landmarkRepository = require("./landmarks.repository");

exports.findLandmarkByLandmarkNameQuery = async (nameQuery, city_index) => {
  const landmarkList = await landmarkRepository.findLandmarkByLandmarkNameQuery(
    nameQuery,
    city_index
  );

  return landmarkList;
};

exports.getPopularLandmark = async (city_index) => {
  const landmarkList = await landmarkRepository.getPopularLandmark(city_index);

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
