const router = require("express").Router();
const mypageController = require("./mypage.controller");

//친구 요청 API
/**
 * @swagger
 * /api/mypage/{user_id}/friend:
 *   post:
 *    description: "마이페이지에서 친구 요청하기 기능 API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 요청 받는 친구의 user_id
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              friend_idx:
 *                type: string
 *                description: "친구의 유저 아이디"
 *    responses:
 *      "200":
 *        description: 친구 요청에 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "친구 요청 성공"
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "user_idx 또는 friend_idx 값이 없거나 int 자료형이 아닙니다."
 */
router.post("/friend/request", mypageController.sendFriendRequest);

//받은 친구 요청 조회 API
router.post("/friend_request_receive", mypageController.getFriendRequestList);
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

// 내 정보 조회 API
router.get('/user/:kakaoId', mypageController.getUserByInfoId);

// 회원 탈퇴 API
router.delete('/user/delete/:kakaoId', mypageController.deleteUser);

// profile 등록 API
router.post('/user/profile/:kakaoId', mypageController.saveProfileImage );

// profile 삭제 API 
router.delete('/user/profile/:kakaoId',mypageController.deleteProfileImage);

// 국적 등록 API
router.post('/user/nationality/:kakaoId', mypageController.saveNationality );

// 국적 수정 API
router.put('/user/nationality/:kakaoId',mypageController.updateNationality);

// 국적 삭제 API
router.delete('/user/nationality/:kakaoId',mypageController.deleteNationality);

module.exports = router;
