const path = require("path");
const jwt = require("jsonwebtoken");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const authService = require("./auth.service");
const template = path.join(__dirname, "../public", "index.html");

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

      const data = await authService.kakaoLogin(userRequest);

      //쿠키에 리프레쉬 토큰을 담는다.
      res.cookie("refresh_token", data.refreshToken, { httpOnly: true });
      return res.status(200).json({
        success: true,
        uid: data.user_index,
        access_token: data.accessToken,
      });
      // return res.send(JSON.stringify(userRequest));
    } else {
      throw new Error("카카오톡 토큰 발급 실패", 500);
      // return res.send(JSON.stringify(kakaoTokenRequest));
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "로그인 실패",
    });
  }
};

//구글 OAuth
exports.googleLogin = async (req, res) => {
  console.log("code", req.query.code);
  const baseUrl = "https://oauth2.googleapis.com/token";
  const config = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_SECRET_KEY,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:5000/api/auth/google",
    code: req.query.code,
  };

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  try {
    const googleTokenRequest = await (
      await fetch(finalUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      })
    ).json();
    console.log(googleTokenRequest);

    if ("access_token" in googleTokenRequest) {
      const { access_token } = googleTokenRequest;
      const userRequest = await (
        await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-type": "application/json",
          },
        })
      ).json();
      console.log(userRequest);

      const data = await authService.googleLogin(userRequest);

      // //쿠키에 리프레쉬 토큰을 담는다.
      res.cookie("refresh_token", data.refreshToken, { httpOnly: true });
      return res.status(200).json({
        success: true,
        uid: data.user_index,
        access_token: data.accessToken,
      });
      // return res.send(JSON.stringify(userRequest));
    } else {
      throw new Error("구글 토큰 발급 실패", 500);
      // return res.send(JSON.stringify(kakaoTokenRequest));
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "로그인 실패",
    });
  }
};

//인가코드 테스트
exports.getAccessCode = async (req, res) => {
  res.sendFile(template);
};

//Access token 검증
exports.verifyAccessToken = async (req, res) => {
  const { accessToken } = req.body;
  try {
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
      //액세스 토큰이 유효하지 않음.
      if (err) {
        console.log("토큰이 유효하지 않음", err);
        return res.status(403).json({
          success: false,
          message: "토큰이 유효하지 않습니다.",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "토큰이 유효합니다.",
        });
      }
    });
  } catch (err) {
    console.log(err);
    throw new Error("Unauthorized", 401);
  }
};

exports.logout = async (req, res) => {
  try {
    if (!req.cookies.refresh_token || req.cookies.refresh_token === null) {
      res.status(400).json({ message: "refresh_token이 없습니다." });
    }
    await authService.logout(req.cookies.refresh_token);
    res.clearCookie("refresh_token");
    res.status(200).json({ message: "로그아웃 성공" });
  } catch (err) {
    console.log(err);
  }
};