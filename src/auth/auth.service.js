const { makeRefreshToken, makeAccessToken } = require("../utils/jwt.util");
const authRepository = require("./auth.repository");

exports.kakaoLogin = async (userRequest) => {
  const kakaoId = Number(userRequest.id);
  const email = userRequest.kakao_account.email;
  let newUser = false;
  if ((!kakaoId, !email)) throw new Error("Not Found KEY", 400);

  try {
    let user = await authRepository.findUserByKakaoId(kakaoId, email);

    //해당되는 user가 없을 시 회원가입

    if (user.length === 0) {
      newUser = true;
      console.log("회원가입");
      user = await authRepository.signUpWithKakao(kakaoId, email);
    }

    const accessToken = makeAccessToken(email);
    const refreshToken = makeRefreshToken();
    await authRepository.saveRefreshTokenInRedis(email, refreshToken);
    return {
      user: {
        user_index: user[0].user_index,
        newUser,
        email: user[0].email,
        nickname: newUser ? "닉네임 설정이 필요합니다." : user[0].nickname,
        profileImg: user[0].profileImg,
      },
      accessToken,
      refreshToken,
    };
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

exports.googleLogin = async (userRequest) => {
  const googleId = userRequest.id;
  const email = userRequest.email;
  let newUser = false;

  if ((!googleId, !email)) throw new Error("Not Found KEY", 400);

  try {
    let user = await authRepository.findUserByGoogleId(googleId, email);

    //해당되는 user가 없을 시 회원가입

    if (user.length === 0) {
      newUser = true;
      console.log("회원가입");
      user = await authRepository.signUpWithGoogle(googleId, email);
    }

    const accessToken = makeAccessToken(email);
    const refreshToken = makeRefreshToken();
    await authRepository.saveRefreshTokenInRedis(email, refreshToken);
    return {
      user: {
        user_index: user[0].user_index,
        newUser,
        email: user[0].email,
        nickname: newUser ? "닉네임 설정이 필요합니다." : user[0].nickname,
        profileImg: user[0].profileImg,
      },
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

exports.setNickname = async (user_index, nickname) => {
  try {
    return await authRepository.setNickname(user_index, nickname);
  } catch (err) {
    throw err;
  }
};
