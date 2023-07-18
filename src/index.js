const express = require("express");
const router = express.Router();

router.use(express.json());

const mypageRouter = require("./api/mypage/mypage.index"); //맡은 도메인 연결
const landmarkRouter = require("./api/landmarks/landmarks.index");
const travelPlanRouter = require("./api/travel-plan/travel-plan.index");

router.use("/", mypageRouter);
router.use("/", landmarkRouter);
router.use("/travel-plan", travelPlanRouter);

module.exports = router;
