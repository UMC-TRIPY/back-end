const router = require("express").Router();
const materialController = require("./materials.controller");

/**
 * @swagger
 * /api/materials:
 *   get:
 *    description: "준비물 조회"
 *    tags: [Materials]
 *
 *    responses:
 *      "200":
 *        description: "준비물 조회 성공"
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

router.get("/", materialController.getMaterials);

module.exports = router;
