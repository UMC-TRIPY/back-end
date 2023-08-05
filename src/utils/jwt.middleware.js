const {
  verifyAccessToken,
  verifyRefreshToken,
  makeAccessToken,
} = require("./jwt.util");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
//JWT 인증 미들웨어 -> 권한이 필요한곳에 미들웨어로 넣으면 됨.
exports.verifyJWT = async (req, res, next) => {
  if (!headers.hasOwnProperty("authorization")) {
    return res.status(403).json({
      success: false,
      message: "로그인이 필요합니다.",
    });
  }
  const token =
    req.headers.authorization.split("Bearer ")[1] ||
    req.headers["x-access-token"];

  if (!token || token === null) {
    return res.status(403).json({
      success: false,
      message: "로그인이 필요합니다.",
    });
  }

  //액세스 토큰이 유효한지 검증
  const verification = new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      //액세스 토큰이 유효하지 않음.
      if (err) {
        console.log(err);
        return res.status(403).json({
          success: false,
          message: "토큰이 일치하지 않습니다.",
        });
      }
      resolve(decoded);
    });
  });

  verification.then((decoded) => {
    req.decoded = decoded;
    next();
  });
};

//Access Token 재발급
exports.refresh = async (req, res) => {
  // access token과 refresh token의 존재 유무를 체크합니다.
  if (req.headers.authorization && req.cookies.refresh_token) {
    const accessToken = req.headers.authorization.split("Bearer ")[1];
    const refreshToken = req.cookies.refresh_token;

    // access token 검증 -> expired여야 함.
    const authResult = verifyAccessToken(accessToken);
    console.log("authResult", authResult);
    // access token 디코딩하여 user의 email정보를 가져온다.
    const decoded = jwt.decode(accessToken);
    console.log("decoded", decoded);

    // 디코딩 결과가 없으면 권한이 없음을 응답.
    if (decoded === null) {
      return res.status(401).send({
        success: false,
        message: "권한이 없습니다!",
      });
    }
    /* access token의 decoding 된 값에서
            유저의 아이디를 가져와 refresh token을 검증 */
    const refreshResult = verifyRefreshToken(refreshToken, decoded.email);

    // 재발급을 위해서는 access token이 만료되어 있어야합니다.
    if (authResult.success === false && authResult.message === "jwt expired") {
      // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인
      if (refreshResult.success === false) {
        res.status(401).send({
          success: false,
          message: "새로 로그인해야 합니다.",
        });
      } else {
        // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
        const newAccessToken = makeAccessToken(decoded.email);

        res.cookie("refresh_token", refreshToken, { httpOnly: true });
        return res.status(200).send({
          // 새로 발급한 access token과 원래 있던 refresh token 모두 클라이언트에게 반환합니다.
          success: true,
          accessToken: newAccessToken,
        });
      }
    } else {
      // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
      return res.status(400).send({
        success: false,
        message: "Access Token이 만료되지 않았습니다.",
      });
    }
  } else {
    // access token 또는 refresh token이 헤더에 없는 경우
    return res.status(400).send({
      success: false,
      message: "재발급 받기 위해 Access Token과 Refresh Token이 필요합니다.",
    });
  }
};
