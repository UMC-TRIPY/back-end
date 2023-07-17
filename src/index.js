var express = require("express");
var router = express.Router();


router.use(express.json());

const mypageRouter = require("./api/mypage/mypage.index"); //맡은 도메인 연결
//const loginRouter = require("./api/oauth/google.js")

router.use("/mypage", mypageRouter);
//router.use("/oauth", loginRouter)
//router.use('/db', require('./lib/database.js'))

module.exports = router;
