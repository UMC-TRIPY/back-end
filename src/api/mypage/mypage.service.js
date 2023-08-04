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
    const result = await mypageRepository.getFriendRequestRecieveList(user_idx);
    return result;
  } catch (err) {
    throw err;
  }
};

//보낸 친구 요청 목록 조회 API
exports.getFriendRequestList = async (user_idx) => {
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

exports.userSearch = async (keyword) => {
  try {
    const userList = await mypageRepository.userSearch(keyword);
    return userList;
  } catch (err) {
    throw err;
  }
};

exports.friendSearch = async (user_idx, keyword) => {
  try {
    const friendList = await mypageRepository.friendSearch(user_idx, keyword);
    return friendList;
  } catch (err) {
    throw err;
  }
};

exports.findFriendsList = async (user_idx) => {
  try {
    const friendList = await mypageRepository.userFriendList(user_idx);
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
// 유저 정보 조회 API
exports.getUserByInfoId = async (uid) => {
  try {
    const result = await mypageRepository.getUserByInfoId(uid);
    return result;
  } catch (err) {
    throw err;
  }
};

//유저 삭제 API
exports.deleteUser = async (uid) => {
  try {
    const result = await mypageRepository.deleteUser(uid);
    return result;
  } catch (err) {
    throw err;
  }
};

// profile Img 등록 API
exports.saveProfileImage = async (uid, profileImg) => {
  try {
    await mypageRepository.saveProfileImage(uid, profileImg);
    return;
  } catch (err) {
    throw err;
  }
};

//profile Img 삭제 API
exports.deleteProfileImage = async (uid) => {
  try {
    await mypageRepository.deleteProfileImage(uid);
    return;
  } catch (err) {
    throw err;
  }
};

// 국적 등록  API
exports.saveNationality = async (uid, nationality) => {
  try {
    await mypageRepository.saveNationality(uid, nationality);
    return;
  } catch (err) {
    throw err;
  }
};

// 국적 수정 API
exports.updateNationality = async (uid, nationality) => {
  try {
    await mypageRepository.updateNationality(uid, nationality);
    return;
  } catch (err) {
    throw err;
  }
};

//국적 삭제 API
exports.deleteNationality = async (uid) => {
  try {
    await mypageRepository.deleteNationality(uid);
    return;
  } catch (err) {
    throw err;
  }
};
