const router = require("express").Router();
const bagMaterialController = require("./bag-materials.controller");

/**
 * @swagger
 * /api/bag-materials:
 *   post:
 *    description: "가방에 준비물 담기"
 *    tags: [Bag-materials]
 *    requestBody:
 *      description: "가방 index, 준비물 index"
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              bagIndex:
 *                type: number
 *                description: "가방 Index"
 *              materialIndex:
 *                type: number
 *                description: "준비물 Index"
 *
 *
 *    responses:
 *      "200":
 *        description: "준비물 담기 성공!"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statusCode:
 *                  type: number
 *                message:
 *                  type: string
 *                  example: "준비물 담기 성공!"
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

router.post("/", bagMaterialController.createBagMaterials);

module.exports = router;
