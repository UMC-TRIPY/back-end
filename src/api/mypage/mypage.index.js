const router = require("express").Router();
const mypageController = require("./mypage.controller");

//친구 요청 API
/**
 * @swagger
 * /api/mypage/friends/{uid}/request:
 *   post:
 *    description: "마이페이지에서 친구 요청하기 기능 API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: uid
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: number
 *    requestBody:
 *      description: 요청 받는 친구의 user_id
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              friend_idx:
 *                type: number
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
 *                  type: number
 *                  example: "user_idx 또는 friend_idx 값이 없거나 int 자료형이 아닙니다."
 */
router.post("/friends/:uid/request", mypageController.sendFriendRequest);

//받은 친구 요청 조회 API
/**
 * @swagger
 * /api/mypage/friends/{uid}/receive:
 *   get:
 *    description: "마이페이지에서 받은 친구 요청 조회 API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: uid
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: number
 *    responses:
 *      "200":
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "받은 친구 요청 조회 성공"
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "user_idx값이 없거나 int 자료형이 아닙니다."
 */
router.get("/friends/:uid/receive", mypageController.getFriendRecieveList);

//보낸 친구 요청 조회 API
/**
 * @swagger
 * /api/mypage/friends/{uid}/request:
 *   get:
 *    description: "마이페이지에서 보낸 친구 요청 조회 API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: uid
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: number
 *    responses:
 *      "200":
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "보낸 친구 요청 조회 성공"
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "user_idx값이 없거나 int 자료형이 아닙니다."
 */
router.get("/friends/:uid/request", mypageController.getFriendRequestList);

//친구 요청 취소 API
router.post("/friends/request_cancel", mypageController.cancelFriendRequest);

//친구 요청 수락 API
router.post("/friends/request_accept", mypageController.acceptFriendRequest);

//친구 요청 거절 API
router.post("/friends/request_reject", mypageController.rejectFriendRequest);

//유저 검색 API
router.post("/users/search", mypageController.userSearch);

//uid를 통해 사용자 정보 가져오는 API, 수정 필요
router.get("/", mypageController.friendSearch);

//친구 검색 API
router.post("/freinds/search", mypageController.friendSearch);

//친구 목록 조회 API
router.get("/friends", mypageController.friendList);

//친구 차단 API
router.post("/friends/break", mypageController.friendBreak);

//친구 끊기 API
router.delete("/friends", mypageController.unFriend);

// 내 정보 조회 API
router.get("/user/:kakaoId", mypageController.getUserByInfoId);

// 회원 탈퇴 API
router.delete("/user/delete/:kakaoId", mypageController.deleteUser);

// profile 등록 API
router.post("/user/profile/:kakaoId", mypageController.saveProfileImage);

// profile 삭제 API
router.delete("/user/profile/:kakaoId", mypageController.deleteProfileImage);

// 국적 등록 API
router.post("/user/nationality/:kakaoId", mypageController.saveNationality);

// 국적 수정 API
router.put("/user/nationality/:kakaoId", mypageController.updateNationality);

// 국적 삭제 API
router.delete("/user/nationality/:kakaoId", mypageController.deleteNationality);

module.exports = router;
