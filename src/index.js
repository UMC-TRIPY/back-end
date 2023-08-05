var express = require("express");
var router = express.Router();

// router.use(express.json());

const mypageRouter = require("./api/mypage/mypage.index");
const landmarkRouter = require("./api/landmarks/landmarks.index");
const travelPlanRouter = require("./api/travel-plans/travel-plans.index");
const materialRouter = require("./api/materials/materials.index");
const postRouter = require("./api/posts/posts.index");
//const loginRouter = require("./api/oauth/google.js")
/**
 * @swagger
 * tags:
 *   name: MyPage
 *   description:
 */
router.use("/mypage", mypageRouter);
//router.use("/oauth", loginRouter)
// router.use("/db", require("./lib/database.js"));
router.use("/landmarks", landmarkRouter);
router.use("/travel-plans", travelPlanRouter);
router.use("/materials", materialRouter);
router.use("/posts", postRouter);

module.exports = router;
