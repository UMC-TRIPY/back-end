const mypageService = require("./mypage.service");

exports.friendRequest = async (req, res) => {
  const { target } = req.body;
};

exports.friendSearch = async (req, res) => {
  const { nickname, email } = req.body;

  //nickname 또는 email이 string 타입이 아니면 에러 반환
  if (typeof nickname !== string || typeof email !== string) {
    res.status(400).json({ error: "nickname or email is not string" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.friendList = async (req, res) => {
  try {
    const friends = await mypageService.findFriendsList();
    console.log(friends);
    //반환 형태 {user_index : [2,4,5]}
    res.status(200).json({ user_index: friends });
  } catch (err) {
    res.status(500).json({ message: "친구 목록을 가져오지 못했습니다." });
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
      error: "user_idx,friend_idx가 비어있거나 int 자료형이 아닙니다.",
    });
    return;
  }
  try {
    await mypageService.breakFriend(user_idx, friend_idx);
    res.status(200).json({ message: "친구 차단 success" });
  } catch (err) {
    res.status(400).json({ message: err.sqlMessage });
    console.log(err);
  }
};
