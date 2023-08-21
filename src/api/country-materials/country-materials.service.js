const countryRepository = require("./country-materials.repository");

exports.getMaterialsByCountry = async (country) => {
  return await countryRepository.getMaterialsByCountry(country);
};
