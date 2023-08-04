const router = require("express").Router();
const authController = require("./auth.controller");

// api/auth/kakao, 프론트에서 받은 인가코드를 통해 access token을 발급받는다.
router.get("/kakao", authController.kakaoLogin);
router.get("/code", authController.getAccessCode);
module.exports = router;
