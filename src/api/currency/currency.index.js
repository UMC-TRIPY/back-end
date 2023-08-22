const router = require("express").Router();
const currencyController = require("./currency.controller");

/**
 * @swagger
 * /api/currency/{country}:
 *   get:
 *     summary: "특정 나라별 화폐정보 불러오기"
 *     description: "특정 나라의 화폐정보를 조회하는 API"
 *     tags: [Currency]
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         description: 나라 인덱스
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
 *                 currencyKo:
 *                   type: string
 *                   example: "엔"
 *                 currencyEn:
 *                   type: string
 *                   example: "JPY"
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
 *                   example: "country값이 없거나, integer 타입이 아닙니다."
 */
router.get("/:country", currencyController.getCurrency);

module.exports = router;
