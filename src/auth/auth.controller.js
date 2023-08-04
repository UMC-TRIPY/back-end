const path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const authService = require("./auth.service");
const jwt = require("jsonwebtoken");
const { redisClient, redisCli } = require("../../module/redis_connect");
const template = path.join(__dirname, "../public", "index.html");

let bool = await redisCli.set("key", "123");

//jwt 검증
exports.verifyJWT = (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Unauthorized", 401);
  }
};

exports.makeJWT = (nickname) => {
  try {
    const token = jwt.sign(
      {
        type: "JWT",
        nickname,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m", // 만료시간 15분
        issuer: "csy",
      }
    );
    return token;
  } catch (err) {
    console.log(err);
  }
};

exports.kakaoLogin = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    client_id: process.env.KAKAO_APP_KEY,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:5000/api/auth/kakao",
    code: req.query.code,
  };

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  try {
    const kakaoTokenRequest = await (
      await fetch(finalUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      })
    ).json();
    console.log(kakaoTokenRequest);

    //카카오톡 정보 가져오기
    if ("access_token" in kakaoTokenRequest) {
      const { access_token } = kakaoTokenRequest;
      const userRequest = await (
        await fetch("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-type": "application/json",
          },
        })
      ).json();
      console.log(userRequest);
      await authService.findUserById(userRequest);

      //access token 생성
      const token = this.makeJWT(userRequest.kakao_account.profile.nickname);
      //쿠키에 토큰을 담는다.
      res.cookie("jwt", token);
      return res.status(200).json({
        success: true,
        access_token: token,
      });
      // return res.send(JSON.stringify(userRequest));
    } else {
      throw new Error("카카오톡 토큰 발급 실패", 500);
      // return res.send(JSON.stringify(kakaoTokenRequest));
    }
  } catch (err) {
    console.log(err);
  }
};

//인가코드 테스트
exports.getAccessCode = async (req, res) => {
  res.sendFile(template);
};
