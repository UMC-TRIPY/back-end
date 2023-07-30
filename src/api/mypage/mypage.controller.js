const mypageService = require("./mypage.service");

//접속중인 사용자가 인덱스가 friend_idx인 유저에게 친구요청을 보낸다.
exports.sendFriendRequest = async (req, res) => {
  const { user_idx, friend_idx } = req.body;
  if (
    typeof user_idx !== "number" ||
    typeof friend_idx !== "number" ||
    (user_idx === null && friend_idx === null)
  ) {
    res.status(400).json({
      error: "user_idx 또는 friend_idx 값이 없거나 int 자료형이 아닙니다.",
    });
    return;
  }
  try {
    await mypageService.sendRequestFriend(user_idx, friend_idx);
    res.status(200).json({ message: "친구 요청 성공" });
  } catch (err) {
    if (err.sqlMessage) res.status(400).json({ error: err.sqlMessage });
    console.log(err);
  }
};

//친구 요청 취소 API
exports.cancelFriendRequest = async (req, res) => {
  const { user_idx, friend_idx } = req.body;
  if (
    typeof user_idx !== "number" ||
    typeof friend_idx !== "number" ||
    (user_idx === null && friend_idx === null)
  ) {
    res.status(400).json({
      error: "user_idx 또는 friend_idx 값이 없거나 int 자료형이 아닙니다.",
    });
    return;
  }
  try {
    await mypageService.cancelRequestFriend(user_idx, friend_idx);
    res.status(200).json({ message: "친구 요청 취소 성공" });
  } catch (err) {
    if (err.sqlMessage) res.status(400).json({ error: err.sqlMessage });
    res.status(500).json({ error: "api 호출 실패" });
    console.log(err);
  }
};

//친구 요청 수락 API
exports.acceptFriendRequest = async (req, res) => {
  const { user_idx, friend_idx } = req.body;
  if (
    typeof user_idx !== "number" ||
    typeof friend_idx !== "number" ||
    (user_idx === null && friend_idx === null)
  ) {
    res.status(400).json({
      error: "user_idx 또는 friend_idx 값이 없거나 int 자료형이 아닙니다.",
    });
    return;
  }
  try {
    await mypageService.acceptRequestFriend(user_idx, friend_idx);
    res.status(200).json({ message: "친구 요청 수락 성공" });
  } catch (err) {
    if (err.sqlMessage) res.status(400).json({ error: err.sqlMessage });

    console.log(err);
  }
};

//친구 요청 거절 API
exports.rejectFriendRequest = async (req, res) => {
  const { user_idx, friend_idx } = req.body;
  if (
    typeof user_idx !== "number" ||
    typeof friend_idx !== "number" ||
    (user_idx === null && friend_idx === null)
  ) {
    res.status(400).json({
      error: "user_idx 또는 friend_idx 값이 없거나 int 자료형이 아닙니다.",
    });
    return;
  }
  try {
    await mypageService.rejectRequestFriend(user_idx, friend_idx);
    res.status(200).json({ message: "친구 요청 거절 성공" });
  } catch (err) {
    if (err.sqlMessage) res.status(400).json({ error: err.sqlMessage });
    res.status(500).json({ error: "api 호출 실패" });
    console.log(err);
  }
};

//내가 받은 친구 요청 목록 조회 API
exports.getFriendRequestList = async (req, res) => {
  const { user_idx } = req.body;
  if (typeof user_idx !== "number" || user_idx === null) {
    res.status(400).json({
      error: "user_idx 값이 없거나 int 자료형이 아닙니다.",
    });
    return;
  }
  try {
    const result = await mypageService.getRequestFriendList(user_idx);
    res
      .status(200)
      .json({ message: "받은 친구 요청 목록 조회 성공", data: result });
  } catch (err) {
    if (err.sqlMessage) res.status(400).json({ error: err.sqlMessage });

    console.log(err);
  }
};

exports.friendSearch = async (req, res) => {
  const { nickname, email } = req.body;

  //nickname 또는 email이 string 타입이 아니면 에러 반환
  if (
    typeof nickname !== "string" ||
    typeof email !== "string" ||
    (nickname === null && email === null)
  ) {
    res
      .status(400)
      .json({ error: "nickname 또는 email 값이 없거나 문자열이 아닙니다." });
    return;
  }
  try {
    if (email === "") {
      //해당 문자열로 시작하는 이메일을 가진 유저 결과를 배열형태로 반환
      const { friend } = await mypageService.findUserNickname(nickname);
      res.status(200).json({
        friend_index: friend,
      });
    } else if (nickname === "") {
      //해당 문자열로 시작하는 닉네임을 가진 유저 결과를 배열형태로 반환
      const { friend } = await mypageService.findUserEmail(email);
      res.status(200).json({
        friend_index: friend,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//친구 목록 가져오기 API
exports.friendList = async (req, res) => {
  try {
    const friends = await mypageService.findFriendsList();
    console.log(friends);
    //반환 형태 {user_index : [2,4,5]}
    res.status(200).json({ user_index: friends });
  } catch (err) {
    console.log(err);
  }
};

//접속중인 유저 인덱스와 차단하고자 하는 친구 인덱스를 받아 friend 테이블의 isblocked 값을 1로 만든다.
exports.friendBreak = async (req, res) => {
  const { user_idx, friend_idx } = req.body;
  if (
    typeof user_idx !== "number" ||
    typeof friend_idx !== "number" ||
    user_idx === null ||
    friend_idx === null
  ) {
    res.status(400).json({
      error: "user_idx,friend_idx가 값이 없거나 int 자료형이 아닙니다.",
    });
    return;
  }
  try {
    await mypageService.breakFriend(user_idx, friend_idx);
    res.status(200).json({ message: "친구 차단 success" });
  } catch (err) {
    if (err.sqlMessage) res.status(400).json({ message: err.sqlMessage });

    console.log(err);
  }
};

//kakoId로 나의 정보 조회
exports.getUserByInfoId = async function (req, res) {
  try {
    const kakaoId = req.params.kakaoId;
    
      
    if (!kakaoId) {
      return res.status(400).json({ error: '유저 아이디를 입력해주세요.' });
    }
    const result = await mypageService.getUserByInfoId(kakaoId);

    if (!result) {
      return res.status(404).json({ error: '유저를 찾을 수 없음' });
    }

    return res.status(200).json(result);
  } catch (err) {
      console.log(err)
    return res.status(500).json({ error: '에러' });
  }
};  

// 회원 탈퇴 API
exports.deleteUser = async function(req, res){
  try{
      const kakaoId = req.params.kakaoId;
      
      if(!kakaoId){
          return res.status(400).json({error: '유저 아이디가 없습니다.'});
      }
      const result = await mypageService.deleteUser(kakaoId);
      
      if(!result){
          return res.status(404).json({error: '유저를 찾을 수 없음'});
      }
      return res.status(200).json(result);
  }catch(err){
      return res.status(500).json({error:'err'});
  }
};


//profile img 등록 API
exports.saveProfileImage = async (req, res) => {
  const  kakaoId  = req.params.kakaoId;
  const  profileImg  = req.body.profileImg;
  try {
  const result = await mypageService.saveProfileImage(kakaoId, profileImg);
     if (kakaoId) {
    res.json({ success: true, message: '프로필 URL이 업데이트되었습니다.' });
  } else {
    res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
  }
  } catch (err) {
  res.status(500).json({ error: 'API 호출 실패' });
  console.log(err);
  }
};

//Profile Img 삭제 API
exports.deleteProfileImage = async(req, res) => {
  try{
      const kakaoId = req.params.kakaoId;

      if(!kakaoId){
          return res.status(400).json({error: 'kakaoid 입력'});
      }
      await mypageService.deleteProfileImage(kakaoId);
      return res.status(200).json({message: 'profile 이미지 삭제'});
  } catch (err){
      res.status(500).json({ error: 'API 호출 실패' });
      console.log(err);
  }

}


// 국적 등록 API
exports.saveNationality = async (req, res) => {
  const kakaoId  = req.params.kakaoId;
  const nationality  = req.body.nationality;
  try {
  const result = await mypageService.saveNationality(kakaoId, nationality);
      if (kakaoId) {
      res.json({ success: true, message: '국적이 등록되었습니다.' });
  } else {
      res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
  }
  } catch (err) {
  res.status(500).json({ error: 'API 호출 실패' });
  console.log(err);
  }
};

//국적 수정 API
exports.updateNationality = async (req, res) => {
  const kakaoId  = req.params.kakaoId;
  const nationality  = req.body.nationality;
  try {
  const result = await mypageService.updateNationality(kakaoId, nationality);
      if (kakaoId) {
      res.json({ success: true, message: '국적이 수정되었습니다.' });
  } else {
      res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
  }
  } catch (err) {
  res.status(500).json({ error: 'API 호출 실패' });
  console.log(err);
  }
};

//국적 삭제 API
exports.deleteNationality = async(req, res) => {
  try{
      const kakaoId = req.params.kakaoId;

      if(!kakaoId){
          return res.status(400).json({error: 'kakaoid 입력'});
      }
      await mypageService.deleteNationality(kakaoId);
      return res.status(200).json({message: ' 국적 정보 삭제'});
  } catch (err){
      res.status(500).json({ error: 'API 호출 실패' });
      console.log(err);
  }

};

