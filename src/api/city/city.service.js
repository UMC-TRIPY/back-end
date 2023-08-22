const cityRepository = require("./city.repository");

exports.getCityName = async (country) => {
  return await cityRepository.getCityName(country);
};
