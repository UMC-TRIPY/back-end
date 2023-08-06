const router = require("express").Router();
const landmarkController = require("./landmarks.controller");

router.get("/search-landmarks", landmarkController.searchLandmark);

/**
 * @swagger
 * /api/landmarks/search-landmarks:
 *   get:
 *    description: "여행지 검색 조회"
 *    tags: [Lamdmarks]
 *    parameters:
 *      - in: query
 *        name: nameQuery
 *        required: false
 *        description: "검색어"
 *        schema:
 *          type: string
 *
 *
 *    responses:
 *      "200":
 *        description: "여행지 검색 성공"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: "여행 검색 성공"
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

router.get("/search-landmarks", landmarkController.searchLandmark);

/**
 * @swagger
 * /api/landmarks/popular:
 *   get:
 *    description: "인기 여행지 조회"
 *    tags: [Lamdmarks]
 *
 *    responses:
 *      "200":
 *        description: "인기 여행지 조회 성공"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: "여행 검색 성공"
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

router.get("/popular", landmarkController.getPopularLandmark);

// GET /api/landmarks/filtering-search?continent={continent}&country={country}&city={city}
router.post("/filtering-search", landmarkController.filteringSearch);

//기능명세서2.4 커뮤니티 인기글 목록 조회 API -> 추천수 상위 10개를 가져온다.
router.get("/popular", landmarkController.getPopularPosts);
module.exports = router;
