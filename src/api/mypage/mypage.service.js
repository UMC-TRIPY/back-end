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

//프로필Img 국적 수정 API
exports.updateUserInfo = async (uid,profileImg,nationality) => {
  try{
    const updateUserInfo = await mypageRepository.updateUserInfo(
      uid,
      profileImg,
      nationality
    );

    return updateUserInfo;
  }catch(err){
    console.error(err);
    throw err;
  }
};