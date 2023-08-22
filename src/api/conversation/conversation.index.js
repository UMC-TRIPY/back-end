const router = require("express").Router();
const conversationController = require("./conversation.controller");

/**
 * @swagger
 * /api/conversation/{country}:
 *   get:
 *     summary: "특정 나라별 회화정보 불러오기"
 *     description: "특정 나라의 회화정보를 조회하는 API"
 *     tags: [Conversation]
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
 *                       conver_korean:
 *                         type: string
 *                         description: 한국말
 *                         example: "안녕하세요(아침)"
 *                       country_translation:
 *                         type: string
 *                         description: 번역
 *                         example: "おはようございます"
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
router.get("/:country", conversationController.getConversationByCountry);

module.exports = router;
