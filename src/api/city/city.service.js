const cityRepository = require("./city.repository");

exports.getCityName = async (city) => {
  return await cityRepository.getCityName(city);
};
