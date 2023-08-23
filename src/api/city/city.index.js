const router = require("express").Router();
const cityController = require("./city.controller");

/**
 * @swagger
 * /api/city/{city}:
 *   get:
 *     summary: "특정 도시 영어 이름 불러오기"
 *     description: "특정 도시 영어 이름을 조회하는 API"
 *     tags: [City]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         description: 도시 인덱스
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: string
 *                   example:
 *                     - "Osaka"
 *                     - "Tokyo"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "city값이 없거나, integer 타입이 아닙니다."
 */
router.get("/:country", cityController.getCityName);

module.exports = router;
