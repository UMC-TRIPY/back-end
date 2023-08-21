const countryService = require("./country-materials.service");

exports.getMaterialsByCountry = async (req, res, next) => {
  const country = Number(req.params.country);
  if (typeof country !== "number" || !country) {
    res.status(400).json({
      success: false,
      message: "country값이 없거나, integer 타입이 아닙니다.",
    });
  }
  try {
    const materials = await countryService.getMaterialsByCountry(country);
    res.status(200).json({ success: true, data: materials });
  } catch (err) {
    next(err);
  }
};
