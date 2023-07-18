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

exports.findFriendsList = async () => {
  try {
    const friendList = await mypageRepository.userFriendList();
    return friendList;
  } catch (err) {
    throw err;
  }
};

exports.breakFriend = async (user_idx, friend_idx) => {
  try {
    await mypageRepository.breakFriend(user_idx, friend_idx);
  } catch (err) {
    throw err;
  }
};
