const cityService = require("./city.service");

exports.getCityName = async (req, res, next) => {
  const country = Number(req.params.country);
  if (typeof country !== "number" || !country) {
    res.status(400).json({
      success: false,
      message: "country값이 없거나, integer 타입이 아닙니다.",
    });
  }
  try {
    const city = await cityService.getCityName(country);
    const data = city.map((rows) => rows.city_name_en);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
