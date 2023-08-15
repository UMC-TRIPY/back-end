const router = require("express").Router();
const postController = require("./posts.controller");

/**
 * @swagger
 * /api/posts:
 *   get:
 *    description: "게시물 검색"
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
 *       - in: query
 *         name: orderField
 *         required: false
 *         description: 정렬 필드
 *         schema:
 *           type: string
 *           enum: [created_at, thumbs]
 *       - in: query
 *         name: orderDirection
 *         required: false
 *         description: 정렬 방향
 *         schema:
 *           type: string
 *           enum: [asc, desc]
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

/**
 * @swagger
 * /api/posts/{post_index}:
 *   get:
 *    description: "게시물 조회"
 *    tags: [Posts]
 *    parameters:
 *       - in: path
 *         name: post_index
 *         required: true
 *         description: 게시물 index
 *         schema:
 *           type: integer
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
 *                post:
 *                  type: object
 *                  properties:
 *
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

router.get("/:post_index", postController.getPost);

router.post("/", postController.createPost);

router.put("/", postController.updatePost);

//기능명세서2.4 커뮤니티 인기글 목록 조회 API -> 추천수 상위 10개를 가져온다.
router.get("/popular", postController.getPopularPosts);
module.exports = router;
