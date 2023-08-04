const authRepository = require("./auth.repository");



exports.findUserById = async (userRequest) => {
  const kakaoId = userRequest.id;
  const email = userRequest.kakao_account.email;
  if ((!kakaoId, !email)) throw new Error("Not Found KEY", 400);
  console.log(kakaoId, email);
  try {
    const user = await authRepository.findUserById(kakaoId, email);
    console.log(user);
    
    //해당되는 user가 없을 시 회원가입
    if (user.length === 0) {
      console.log("회원가입");
      await authRepository.signUp(kakaoId, email);
    }
  } catch (err) {
    console.log(err);
    return;
  }
  return;
};
