const mypageService = require("./myapge.service");

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
