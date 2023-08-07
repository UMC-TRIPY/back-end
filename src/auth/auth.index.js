const router = require("express").Router();
const { refresh } = require("../utils/jwt.middleware");
const authController = require("./auth.controller");

//카카오 로그인
/**
 * @swagger
 * /api/auth/kakao:
 *   get:
 *    summary: "카카오 로그인"
 *    description: "카카오 로그인"
 *    tags: [Auth]
 *    parameters:
 *      - in: query
 *        name: code
 *        required: true
 *        description: authorization code
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 성공
 *        headers:
 *          Set-Cookie:
 *             type: string
 *             description: "로그인 성공 시 쿠키에 refresh token 설정"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: true
 *                uid:
 *                  type: integer
 *                  example: 11
 *                access_token:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTEyNTAxNTMsImV4cCI6MTY5MjQ1OTc1MywiaXNzIjoiY3N5In0.2pMuLck04hEP9rUj7Wm1nzeVXpfL_e0qyGjvbSIEWpk
 *      "401":
 *        description: 로그인 실패
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "카카오톡 토큰 발급 실패 or 로그인 실패"
 */
router.get("/kakao", authController.kakaoLogin);
//authorization code test
router.get("/code", authController.getAccessCode);
//google login
/**
 * @swagger
 * /api/auth/google:
 *   get:
 *    summary: "구글 로그인"
 *    description: "구글 로그인"
 *    tags: [Auth]
 *    parameters:
 *      - in: query
 *        name: code
 *        required: true
 *        description: authorization code
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 성공
 *        headers:
 *          Set-Cookie:
 *             type: string
 *             description: "로그인 성공 시 쿠키에 refresh token 설정"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: true
 *                uid:
 *                  type: integer
 *                  example: 11
 *                access_token:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTEyNTAxNTMsImV4cCI6MTY5MjQ1OTc1MywiaXNzIjoiY3N5In0.2pMuLck04hEP9rUj7Wm1nzeVXpfL_e0qyGjvbSIEWpk
 *      "401":
 *        description: 로그인 실패
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "구글 토큰 발급 실패 or 로그인 실패"
 */
router.get("/google", authController.googleLogin);
//access token이 유효한지 검증
router.post("/verify/access_token", authController.verifyAccessToken);
//access token 재발급
/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *    summary: "access token 재발급"
 *    description: "Header에 Access Token 필요, 쿠키에 Refresh Token 필요"
 *    tags: [Auth]
 *    parameters:
 *      - in: cookie
 *        name: refresh_token
 *        required: true
 *        description: refresh token
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                sucess:
 *                  type: boolean
 *                  example: true
 *                access_token:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTEyNTAxNTMsImV4cCI6MTY5MjQ1OTc1MywiaXNzIjoiY3N5In0.2pMuLck04hEP9rUj7Wm1nzeVXpfL_e0qyGjvbSIEWpk
 *      "401":
 *        description: access token을 디코딩한 결과가 없습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "권한이 없습니다."
 *      "403":
 *        description: access token과 refresh token 모두 만료된 상황입니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "새로 로그인해야 합니다."
 *      "400":
 *        description: Acess Token이 아직 유효한 상황입니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Acess Token이 만료되지 않았습니다."
 *      "406":
 *        description: access token 또는 refresh token이 요청값에 없는 상황입니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "재발급 받기 위해 Access Token과 Refresh Token이 필요합니다."
 */
router.post("/refresh", refresh);
//logout api
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *    summary: "로그아웃"
 *    description: "로그아웃"
 *    tags: [Auth]
 *    parameters:
 *      - in: cookie
 *        name: refresh_token
 *        required: true
 *        description: refresh token
 *        schema:
 *          type: string
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
 *                  example: "로그아웃 성공"
 *      "400":
 *        description: 요청 쿠키에 refresh token이 없습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "refresh_token이 없습니다."
 */
router.post("/logout", authController.logout);
module.exports = router;