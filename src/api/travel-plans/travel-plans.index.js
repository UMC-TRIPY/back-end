const router = require("express").Router();
const travelPlanController = require("./travel-plans.controller");

/**
 * @swagger
 * /api/travel-plans/user/{userId}:
 *   post:
 *    description: "여행 등록"
 *    tags: [Travel-Plans]
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: number
 *    requestBody:
 *      description: "여행지 정보"
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              arrivalDate:
 *                type: string
 *                format: "date"
 *                description: "도착일"
 *              departureDate:
 *                type: string
 *                format: "date"
 *                description: "출발일"
 *              cityId:
 *                type: number
 *                description: "도시 ID"
 *    responses:
 *      "201":
 *        description: "여행 등록 성공"
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
router.post("/user/:userId", travelPlanController.createTravelPlan);

module.exports = router;
