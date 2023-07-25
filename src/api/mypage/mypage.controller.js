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

//검색한 keyword로 시작하는 email,nickname을 가진 유저들 반환,
exports.userSearch = async (req, res) => {
  const { keyword } = req.body;

  if (typeof keyword !== "string" || keyword === null) {
    res.status(400).json({ error: "keyword 값이 없거나 문자열이 아닙니다." });
    return;
  }
  try {
    const userList = await mypageService.userSearch(keyword);
    res.status(200).json({ user_index: userList });
  } catch (err) {
    if (err.sqlMessage) res.status(400).json({ error: err.sqlMessage });
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

exports.unFriend = async (req, res) => {
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
    await mypageService.unFriend(user_idx, friend_idx);
    res.status(200).json({ message: "친구 끊기 success" });
  } catch (err) {
    if (err.sqlMessage) res.status(400).json({ message: err.sqlMessage });
    console.log(err);
  }
};
