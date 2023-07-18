const router = require("express").Router();
const mypageController = require("./mypage.controller");

//친구 요청 API
router.post("/friend_request", mypageController.sendFriendRequest);

//친구 요청 취소 API
router.post("/friend_request_cancel", mypageController.cancelFriendRequest);

//친구 요청 수락 API
router.post("/friend_request_accept", mypageController.acceptFriendRequest);

//친구 요청 거절 API
router.post("/friend_request_reject", mypageController.rejectFriendRequest);

//친구 검색 API
router.post("/freind_search", mypageController.friendSearch);

//친구 목록 조회 API
router.get("/friend_list", mypageController.friendList);

//친구 끊기 API
router.post("/friend_break", mypageController.friendBreak);

module.exports = router;
