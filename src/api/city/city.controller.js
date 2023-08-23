const cityService = require("./city.service");

exports.getCityName = async (req, res, next) => {
  const city = Number(req.params.city);
  if (typeof city !== "number" || !city) {
    res.status(400).json({
      success: false,
      message: "city값이 없거나, integer 타입이 아닙니다.",
    });
  }
  try {
    const city = await cityService.getCityName(city);
    const data = city.map((rows) => rows.city_name_en);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
