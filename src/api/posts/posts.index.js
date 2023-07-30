const router = require("express").Router();
const postController = require("./posts.controller");

/**
 * @swagger
 * /api/posts:
 *   get:
 *    description: "게시물 조회"
 *    tags: [Posts]
 *    requestBody:
 *      description: "태그, 페이지 정보"
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              tags:
 *                type: number[]
 *                description: "태그 아이디 배열"
 *              page:
 *                type: number
 *                description: "페이지 번호"
 *              pageSize:
 *                type: number
 *                description: "페이지 크기"
 *
 *
 *    responses:
 *      "200":
 *        description: "여행지 조회 성공"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: "여행 등록 성공"
 *      "400":
 *        description: 요청 값이 없거나 형식에 맞지 않습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: number
 *                message:
 *                  type: string
 *
 */

router.get("/", postController.getPosts);

module.exports = router;
