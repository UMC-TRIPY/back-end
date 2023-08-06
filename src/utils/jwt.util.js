const { getRefreshToekInRedis } = require("../auth/auth.repository");
const jwt = require("jsonwebtoken");
//Access Token 생성
exports.makeAccessToken = (email) => {
  try {
    const token = jwt.sign(
      {
        type: "JWT",
        email,
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

//Refresh Token 생성, Redis에 저장
exports.makeRefreshToken = () => {
  try {
    const token = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: "14d", // 만료기간 14일
      issuer: "csy",
    });
    return token;
  } catch (err) {
    console.log(err);
  }
};

//Access Token 검증
exports.verifyAccessToken = (token) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      success: true,
      email: decoded.email,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};
//Refresh Token 검증
exports.verifyRefreshToken = async (token, email) => {
  try {
    const data = await getRefreshTokenInRedis(email); // refresh token 가져오기
    if (token === data) {
      try {
        jwtUtil.verify(token, process.env.JWT_SECRET);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
