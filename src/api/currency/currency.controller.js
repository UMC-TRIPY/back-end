const currencyService = require("./currency.service");

exports.getCurrency = async (req, res, next) => {
  const country = Number(req.params.country);
  if (typeof country !== "number" || !country) {
    res.status(400).json({
      success: false,
      message: "country값이 없거나, integer 타입이 아닙니다.",
    });
  }
  try {
    const data = await currencyService.getCurrency(country);
    const currencyKo = data[0].currencyKo;
    const currencyEn = data[0].currencyEn;
    res.status(200).json({ success: true, currencyKo, currencyEn });
  } catch (err) {
    next(err);
  }
};
