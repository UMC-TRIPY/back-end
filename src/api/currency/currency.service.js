const currencyRepository = require("./currency.repository");

exports.getCurrency = async (country) => {
  return await currencyRepository.getCurrency(country);
};
