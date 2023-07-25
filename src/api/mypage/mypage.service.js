const mypageRepository = require("./mypage.repository");

exports.sendRequestFriend = async (user_idx, friend_idx) => {
  try {
    await mypageRepository.insertFriendRequest(user_idx, friend_idx);
    return;
  } catch (err) {
    throw err;
  }
};

exports.cancelRequestFriend = async (user_idx, friend_idx) => {
  try {
    await mypageRepository.deleteFriendRequest(user_idx, friend_idx);
    return;
  } catch (err) {
    throw err;
  }
};

exports.rejectRequestFriend = async (user_idx, friend_idx) => {
  try {
    await mypageRepository.rejectFriendRequest(user_idx, friend_idx);
    return;
  } catch (err) {
    throw err;
  }
};

exports.getRequestFriendList = async (user_idx) => {
  try {
    const result = await mypageRepository.getFriendRequestList(user_idx);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.acceptRequestFriend = async (user_idx, friend_idx) => {
  try {
    await mypageRepository.updateFriendRequest(user_idx, friend_idx);
    return;
  } catch (err) {
    throw err;
  }
};

exports.friendSearch = async (keyword) => {
  try {
    const friendList = await mypageRepository.friendSearch(keyword);
    return friendList;
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
    return;
  } catch (err) {
    throw err;
  }
};

exports.unFriend = async (user_idx, friend_idx) => {
  try {
    await mypageRepository.unFriend(user_idx, friend_idx);
    return;
  } catch (err) {
    throw err;
  }
};
