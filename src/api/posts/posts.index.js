const router = require("express").Router();
const postController = require("./posts.controller");

/**
 * @swagger
 * /api/posts:
 *   get:
 *    description: "게시물 조회"
 *    tags: [Posts]
 *    parameters:
 *       - in: query
 *         name: tags[]
 *         required: false
 *         description: 태그 name 배열
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: 페이지 번호
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         required: false
 *         description: 페이지 크기
 *         schema:
 *           type: integer
 *       - in: query
 *         name: nameQuery
 *         required: false
 *         description: 게시물 검색어
 *         schema:
 *           type: string
 *
 *    responses:
 *      "200":
 *        description: "게시물 조회 성공"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: "게시물 조회 성공"
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
