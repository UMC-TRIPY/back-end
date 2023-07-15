const mypageRepository = require("./mypage.repository");

exports.findUserEmail = async (email) => {
  try {
    const userEmail = await mypageRepository.userEmail();
    return userEmail;
  } catch (err) {
    throw err;
  }
};
exports.findUserNickname = async (nickname) => {
  try {
    const userNickname = await mypageRepository.userNickname();
    return userNickname;
  } catch (err) {
    throw err;
  }
};
