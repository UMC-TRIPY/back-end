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
 *         name: city_index
 *         required: false
 *         description: 도시 index
 *         schema:
 *           type: integer
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

/**
 * @swagger
 * /api/posts:
 *   post:
 *    summary: "게시물 생성"
 *    description: "게시물 생성"
 *    tags: [Posts]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user_index:
 *                type: integer
 *              post_title:
 *                type: string
 *              post_content:
 *                type: string
 *              city_index:
 *                type: integer
 *              tags:
 *                type: array
 *                items:
 *                  type: string
 *              post_image:
 *                type: string
 *              post_file:
 *                type: string
 *              plan_index:
 *                type: integer
 *    responses:
 *      "200":
 *        description: "게시물 생성 성공"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: "게시물 생성 성공"
 *                post:
 *                  type: object
 *                  properties:
 *                    // 생성된 게시물의 정보를 정의
 *      "400":
 *        description: "요청 값이 없거나 형식에 맞지 않습니다."
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: number
 *                message:
 *                  type: string
 */
router.post("/", postController.createPost);

/**
 * @swagger
 * /api/posts:
 *   put:
 *    summary: "게시물 수정"
 *    description: "게시물 수정"
 *    tags: [Posts]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user_index:
 *                type: integer
 *              post_title:
 *                type: string
 *              post_content:
 *                type: string
 *              city_index:
 *                type: integer
 *              tags:
 *                type: array
 *                items:
 *                  type: string
 *              post_image:
 *                type: string
 *              post_file:
 *                type: string
 *              plan_index:
 *                type: integer
 *    responses:
 *      "200":
 *        description: "게시물 수정 성공"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: "게시물 수정 성공"
 *                post:
 *                  type: object
 *                  properties:
 *                    // 생성된 게시물의 정보를 정의
 *      "400":
 *        description: "요청 값이 없거나 형식에 맞지 않습니다."
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: number
 *                message:
 *                  type: string
 */
router.put("/", postController.updatePost);

/**
 * @swagger
 * /api/posts/{post_index}:
 *   delete:
 *    summary: "게시물 삭제"
 *    description: "게시물 삭제"
 *    tags: [Posts]
 *    parameters:
 *       - in: path
 *         name: post_index
 *         required: true
 *         description: 삭제할 게시물 index
 *         schema:
 *           type: integer
 *    responses:
 *      "200":
 *        description: "게시물 삭제 성공"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: "게시물 삭제 성공"
 *      "404":
 *        description: "게시물을 찾을 수 없음"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: number
 *                message:
 *                  type: string
 */

router.delete("/:post_index", postController.deletePost);

//기능명세서2.4 커뮤니티 인기글 목록 조회 API -> 추천수 상위 10개를 가져온다.
router.get("/popular", postController.getPopularPosts);
module.exports = router;
