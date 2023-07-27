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
    return;
  } catch (err) {
    throw err;
  }
};

// 유저 정보 조회 API
exports.getUserByInfoId = async (kakaoId) => {
  try {
      const result = await myPageRepository.getUserByInfoId(kakaoId);
      return result;

  } catch (err) {
      throw err;
  }
};

//유저 삭제 API
exports.deleteUser = async (kakaoId) => {
  try{
      const result = await myPageRepository.deleteUser(kakaoId);
      return result;
  } catch (err){
      throw err;
  }
};

// profile Img 등록 API
exports.saveProfileImage = async (kakaoId, profileImg) => {
  try {
  await myPageRepository.saveProfileImage(kakaoId, profileImg);
  return;

  } catch (err) {
  throw err;
  }
};

//profile Img 삭제 API
exports.deleteProfileImage = async(kakaoId) => {
  try{
      await myPageRepository.deleteProfileImage(kakaoId);
      return;

  } catch(err){
      throw err;
  }
}

// 국적 등록  API
exports.saveNationality = async (kakaoId, nationality) => {
  try {
  await myPageRepository.saveNationality(kakaoId, nationality);
  return;

  } catch (err) {
  throw err;
  }
};

// 국적 수정 API
exports.updateNationality = async (kakaoId, nationality) => {
  try {
  await myPageRepository.updateNationality(kakaoId, nationality);
  return;

  } catch (err) {
  throw err;
  }
};

//국적 삭제 API
exports.deleteNationality = async(kakaoId) => {
  try{
      await myPageRepository.deleteNationality(kakaoId);
      return;

  } catch(err){
      throw err;
  }
}