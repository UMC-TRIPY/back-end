const conversationRepository = require("./conversation.repository");

exports.getMaterialsByCountry = async (country) => {
  return await conversationRepository.getConversationByCountry(country);
};
