const conversationService = require("./conversation.service");

exports.getConversationByCountry = async (req, res, next) => {
  const country = Number(req.params.country);
  if (typeof country !== "number" || !country) {
    res.status(400).json({
      success: false,
      message: "country값이 없거나, integer 타입이 아닙니다.",
    });
  }
  try {
    const conversation = await conversationService.getMaterialsByCountry(
      country
    );
    res.status(200).json({ success: true, data: conversation });
  } catch (err) {
    next(err);
  }
};
