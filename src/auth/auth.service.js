const { makeRefreshToken, makeAccessToken } = require("../utils/jwt.util");
const authRepository = require("./auth.repository");

exports.kakaoLogin = async (userRequest) => {
  const kakaoId = Number(userRequest.id);
  const email = userRequest.kakao_account.email;

  if ((!kakaoId, !email)) throw new Error("Not Found KEY", 400);
  console.log(kakaoId, email);
  try {
    let user_index = await authRepository.findUserByKakaoId(kakaoId, email);
    console.log("유저 인덱스", user_index);

    //해당되는 user가 없을 시 회원가입

    if (user_index.length === 0) {
      console.log("회원가입");
      user_index = await authRepository.signUpWithKakao(kakaoId, email);
    }

    const accessToken = makeAccessToken(email);
    const refreshToken = makeRefreshToken();
    await authRepository.saveRefreshTokenInRedis(email, refreshToken);
    return {
      user_index: user_index[0].user_index,
      accessToken,
      refreshToken,
    };
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

exports.googleLogin = async (userRequest) => {
  const googleId = Number(userRequest.id);
  const email = userRequest.email;
  console.log(googleId, email, typeof googleId, typeof email);
  if ((!googleId, !email)) throw new Error("Not Found KEY", 400);

  try {
    let user_index = await authRepository.findUserByGoogleId(googleId, email);
    console.log("유저 인덱스", user_index);

    //해당되는 user가 없을 시 회원가입

    if (user_index.length === 0) {
      console.log("회원가입");
      user_index = await authRepository.signUpWithGoogle(googleId, email);
    }
    console.log(user_index);
    const accessToken = makeAccessToken(email);
    const refreshToken = makeRefreshToken();
    await authRepository.saveRefreshTokenInRedis(email, refreshToken);
    return {
      user_index: user_index,
      accessToken,
      refreshToken,
    };
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

exports.logout = async (token) => {
  try {
    return await authRepository.logout(token);
  } catch (err) {
    throw err;
  }
};
