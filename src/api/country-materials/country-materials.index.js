const router = require("express").Router();
const countryController = require("./country-materials.controller");

/**
 * @swagger
 * /api/country-materials/{country}:
 *   get:
 *     summary: "특정 나라에 필요한 준비물 불러오기"
 *     description: "특정 나라의 여행 준비물을 조회하는 API"
 *     tags: [Country-materials]
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         description: 나라 인덱스(3에 더미데이터가 많습니다.)
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       material_description:
 *                         type: string
 *                         description: 준비물 설명
 *                         example: "일본은 우리나라와 전압이 다른 110v를 사용해요. 일본에서 사용 가능한 변압기나 멀티어댑터를 챙겨가야 해요!"
 *                       materials_name:
 *                         type: string
 *                         description: 준비물 이름
 *                         example: "멀티어댑터"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "country값이 없거나, integer 타입이 아닙니다."
 */
router.get("/:country", countryController.getMaterialsByCountry);

module.exports = router;
