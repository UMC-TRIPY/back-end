const router = require("express").Router();
const mypageController = require("./mypage.controller");

//친구 요청 API
/**
 * @swagger
 * /api/mypage/friends/{uid}/request:
 *   post:
 *    summary: "친구 요청"
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
 *    summary: "받은 친구 요청 조회"
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
 *    summary: "보낸 친구 요청 조회"
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
 *                  example: "보낸 친구 요청 목록 조회 성공"
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
/**
 * @swagger
 * /api/mypage/friends/{uid}/cancel:
 *   post:
 *    summary: "친구 요청 취소"
 *    description: "마이페이지에서 친구 요청 취소 API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: uid
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: number
 *    requestBody:
 *      description: 친구 요청 취소할 친구의 user_id
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
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "친구 요청 취소 성공"
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "user_idx 또는 friend_idx값이 없거나 int 자료형이 아닙니다."
 */
router.post("/friends/:uid/cancel", mypageController.cancelFriendRequest);

//친구 요청 수락 API
/**
 * @swagger
 * /api/mypage/friends/{uid}/accept:
 *   post:
 *    summary: "친구 요청 수락"
 *    description: "마이페이지에서 친구 요청 수락 API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: uid
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: number
 *    requestBody:
 *      description: 친구 요청 수락할 친구의 user_id
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
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "친구 요청 수락 성공"
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "user_idx 또는 friend_idx값이 없거나 int 자료형이 아닙니다."
 */
router.post("/friends/:uid/accept", mypageController.acceptFriendRequest);

//친구 요청 거절 API
/**
 * @swagger
 * /api/mypage/friends/{uid}/reject:
 *   post:
 *    summary: "친구 요청 거절"
 *    description: "마이페이지에서 친구 요청 거절 API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: uid
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: number
 *    requestBody:
 *      description: 친구 요청 거절할 친구의 user_id
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
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "친구 요청 거절 성공"
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "user_idx 또는 friend_idx값이 없거나 int 자료형이 아닙니다."
 */
router.post("/friends/:uid/reject", mypageController.rejectFriendRequest);

//유저 검색 API
/**
 * @swagger
 * /api/mypage/users/search?keyword:
 *   get:
 *    summary: "유저 검색"
 *    description: "마이페이지에서 유저 검색 API"
 *    tags: [MyPage]
 *    responses:
 *      "200":
 *        description: 성공, 검색해서 나온 사용자들의 uid 반환
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "유저 검색 성공"
 *                users_index:
 *                  type: array
 *                  example: [1,4]
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "keyword 값이 없거나 문자열이 아닙니다."
 */
router.get("/users/search", mypageController.userSearch);

//uid를 통해 사용자 정보 가져오는 API, 수정 필요
router.get("/", mypageController.friendSearch);

//친구 검색 API
/**
 * @swagger
 * /api/mypage/friends/{uid}/search?keyword:
 *   get:
 *    summary: "친구 검색"
 *    description: "마이페이지에서 친구 검색 API"
 *    tags: [MyPage]
 *    responses:
 *      "200":
 *        description: 성공, 검색해서 나온 친구들의 uid 반환
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "친구 검색 성공"
 *                friends_index:
 *                  type: array
 *                  example: [1,4]
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "keyword 값이 없거나 문자열이 아닙니다."
 */
router.get("/friends/:uid/search", mypageController.friendSearch);

//친구 목록 조회 API
/**
 * @swagger
 * /api/mypage/friends:
 *   get:
 *    summary: "친구 목록 조회"
 *    description: "마이페이지에서 친구 목록 조회 API"
 *    tags: [MyPage]
 *    responses:
 *      "200":
 *        description: 성공, 검색해서 나온 친구들의 uid 반환
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "친구 목록 조회 성공"
 *                users_index:
 *                  type: array
 *                  example: [1,4]
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "uid 값이 없거나 int형이 아닙니다."
 */
router.get("/:uid/friends", mypageController.friendList);

//친구 차단 API
/**
 * @swagger
 * /api/mypage/friends/{uid}/break:
 *   post:
 *    summary: "친구 차단"
 *    description: "마이페이지에서 친구 차단 API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: uid
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: number
 *    requestBody:
 *      description: 친구 차단할 친구의 user_id
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
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "친구 차단 성공"
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "user_idx 또는 friend_idx값이 없거나 int 자료형이 아닙니다."
 */
router.post("/friends/:uid/break", mypageController.friendBreak);

//친구 끊기 API
/**
 * @swagger
 * /api/mypage/friends/{uid}:
 *   delete:
 *    summary: "친구 끊기(삭제)"
 *    description: "마이페이지에서 친구 끊기(삭제) API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: uid
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: number
 *    requestBody:
 *      description: 친구 끊을 친구의 user_id
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
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "친구 끊기(삭제) 성공"
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "user_idx 또는 friend_idx값이 없거나 int 자료형이 아닙니다."
 */
router.delete("/friends/:uid", mypageController.unFriend);

// 내 정보 조회 API
/**
 * @swagger
 * /api/mypage/user/{kakaoId}:
 *   get:
 *    summary: "유저 데이터 정보조회"
 *    description: "kakaoId로 나의 정보 조회"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: kakaoId
 *        required: true
 *        description: 카카오아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 정보조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nickname:
 *                  type: string
 *                  description: 사용자 닉네임
 *                  example: john Doe
 *                email:
 *                  type: string
 *                  description: 사용자 이메일
 *                  example: jeti@naver.com
 *                nationality:
 *                  type: string
 *                  description: 사용자 국적
 *                  example: UK
 *                profileImg:
 *                  type: string
 *                  description: 사용자 프로필 이미지
 *                  example: URL
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "에러 메시지"
 */
router.get("/user/:kakaoId", mypageController.getUserByInfoId);

// 회원 탈퇴 API
/**
 * @swagger
 * /api/mypage/user/delete/{kakaoId}:
 *   delete:
 *    summary: "회원 탈퇴 API"
 *    description: "회원 탈퇴"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: kakaoId
 *        required: true
 *        description: 카카오 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 탈퇴가 성공적으로 이루어진 경우
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  description: 회원탈퇴 성공 여부
 *                  example: "회원이 정상 탈퇴 되었습니다."
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "에러 메시지"
 */
router.delete("/user/delete/:kakaoId", mypageController.deleteUser);

// profile 등록 API
/**
 * @swagger
 * /api/mypage/user/profile/{kakaoId}:
 *   post:
 *    summary: "프로필 이미지 등록"
 *    description: "프로필 이미지 등록 API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: kakaoId
 *        required: true
 *        description: 카카오 아이디
 *        schema:
 *          type: string
 *      - in: body
 *        name: profileImg
 *        description: 프로필 이미지 URL
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                profileImg:
 *                  type: string
 *                  description: 프로필 이미지 URL
 *                  example: "URL"
 *    responses:
 *      "200":
 *        description: 프로필 이미지 URL이 성공적으로 업데이트 된 경우
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  description: 성공 여부
 *                  example: true
 *                message:
 *                  description: 메시지
 *                  example: "프로필 이미지 URL이 성공적으로 업데이트 되었습니다."
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "에러 메시지"
 */
router.post("/user/profile/:kakaoId", mypageController.saveProfileImage);

// profile 삭제 API
/**
 * @swagger
 * /api/mypage/user/profile/{kakaoId}:
 *   delete:
 *    summary: "이미지 삭제 API"
 *    description: "Profile 이미지 삭제 API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: kakaoId
 *        required: true
 *        description: 카카오 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Profile 이미지가 성공적으로 삭제된 경우
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: string
 *                  description: 응답 메시지
 *                  example: "profile 이미지 삭제"
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "에러 메시지"
 */
router.delete("/user/profile/:kakaoId", mypageController.deleteProfileImage);

// 국적 등록 API
/**
 * @swagger
 * /api/mypage/user/nationality/{kakaoId}:
 *   post:
 *    summary: "국적 등록"
 *    description: "국적 등록 API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: kakaoId
 *        required: true
 *        description: 카카오 아이디
 *        schema:
 *          type: string
 *      - in: body
 *        name: nationailty
 *        description: 국적 정보
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nationality:
 *                  type: string
 *                  description: 국적정보
 *                  example: "대한민국"
 *    responses:
 *      "200":
 *        description: 국적이 성공적으로 등록된 경우
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  description: 성공 여부
 *                  example: true
 *                message:
 *                  description: 메시지
 *                  example: "국적이 등록되었습니다"
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "에러 메시지"
 */
router.post("/user/nationality/:kakaoId", mypageController.saveNationality);

// 국적 수정 API
/**
 * @swagger
 * /api/mypage/user/nationality/{kakaoId}:
 *   put:
 *    summary: "국적 수정"
 *    description: "국적 수정 API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: kakaoId
 *        required: true
 *        description: 카카오 아이디
 *        schema:
 *          type: string
 *      - in: body
 *        name: nationailty
 *        description: 국적 정보
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nationality:
 *                  type: string
 *                  description: 수정할 국적 정보
 *                  example: "영국"
 *    responses:
 *      "200":
 *        description: 국적이 성공적으로 수정된 경우
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  description: 성공 여부
 *                  example: true
 *                message:
 *                  description: 메시지
 *                  example: "국적이 수정되었습니다"
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "에러 메시지"
 */
router.put("/user/nationality/:kakaoId", mypageController.updateNationality);

// 국적 삭제 API
/**
 * @swagger
 * /api/mypage/user/nationality/{kakaoId}:
 *   delete:
 *    summary: "국적 삭제 API"
 *    description: "국적 삭제 API"
 *    tags: [MyPage]
 *    parameters:
 *      - in: path
 *        name: kakaoId
 *        required: true
 *        description: 카카오 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 국적이 성공적으로 삭제된 경우
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: 응답 메시지
 *                  example: "국적이 삭제되었습니다."
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "에러 메시지"
 */
router.delete("/user/nationality/:kakaoId", mypageController.deleteNationality);

module.exports = router;
