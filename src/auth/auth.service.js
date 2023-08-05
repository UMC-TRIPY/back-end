const { makeRefreshToken, makeAccessToken } = require("../utils/jwt.util");
const authRepository = require("./auth.repository");

exports.findUserById = async (userRequest) => {
  const kakaoId = userRequest.id;
  const email = userRequest.kakao_account.email;

  if ((!kakaoId, !email)) throw new Error("Not Found KEY", 400);
  console.log(kakaoId, email);
  try {
    let user_index = await authRepository.findUserById(kakaoId, email);
    console.log("유저 인덱스", user_index[0].user_index);

    //해당되는 user가 없을 시 회원가입

    if (user_index.length === 0) {
      console.log("회원가입");
      user_index = await authRepository.signUp(kakaoId, email);
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
