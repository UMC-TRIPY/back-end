const router = require("express").Router();
const mypageController = require("./mypage.controller");

router.post("/api/mypage/friend_request", mypageController.friendRequest);
router.post("/api/mypage/freind_search", mypageController.friendSearch);

module.exports = router;
