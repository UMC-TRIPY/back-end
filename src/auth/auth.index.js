const router = require("express").Router();
const { refresh } = require("../utils/jwt.middleware");
const authController = require("./auth.controller");

//카카오 로그인
router.get("/kakao", authController.kakaoLogin);
//authorization code test
router.get("/code", authController.getAccessCode);
//access token이 유효한지 검증
router.post("/verify/access_token", authController.verifyAccessToken);
//access token 재발급
router.post("/refresh", refresh);
//logout api
router.post("/logout", authController.logout);
module.exports = router;
