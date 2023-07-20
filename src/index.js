const express = require("express");
const router = express.Router();

router.use(express.json());

const mypageRouter = require("./api/mypage/mypage.index"); //맡은 도메인 연결
/**
 * @swagger
 * tags:
 *   name: MyPage
 *   description:
 */
router.use("/mypage", mypageRouter);

module.exports = router;
