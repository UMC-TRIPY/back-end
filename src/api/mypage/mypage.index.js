const router = require("express").Router();
const mypageController = require("./mypage.controller");

//친구 요청 API
router.post("/friend_request", mypageController.friendRequest);
//친구 검색 API
router.post("/freind_search", mypageController.friendSearch);
//친구 목록 조회 API
router.get("/friend_list", mypageController.friendList);

module.exports = router;
