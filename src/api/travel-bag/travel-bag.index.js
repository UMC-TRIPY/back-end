const router = require("express").Router();
const travelBagController = require("./travel-bag.controller");

// 내 여행 목록 불러오기 API
/**
 * @swagger
 * /api/travel-bag/user/plans/{uid}:
 *   get:
 *     summary: "내 여행 목록 불러오기"
 *     description: "특정 사용자의 여행 목록을 조회하는 API"
 *     tags: [Travel-Bag]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: 사용자 인덱스
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: 내 여행 목록 조회가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   city_name:
 *                     type: string
 *                     description: 도시 이름
 *                     example: "서울"
 *                   departureDate:
 *                     type: string
 *                     format: date
 *                     description: 출발 날짜
 *                     example: "2023-08-15"
 *                   arrivalDate:
 *                     type: string
 *                     format: date
 *                     description: 도착 날짜
 *                     example: "2023-08-20"
 *                   plna_index:
 *                     type: number
 *                     description: 여행 계획 인덱스
 *                     example: 3
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "plan 인덱스를 확인해주세요."
 */
router.get('/user/plans/:uid', travelBagController.getUserTravelPlan);

// 내 여행 가방 불러오기 API
/**
 * @swagger
 * /api/travel-bag/user/bag/{uid}:
 *   get:
 *     summary: "내 여행 가방 목록 불러오기"
 *     description: "특정 사용자의 여행 가방 목록을 조회하는 API"
 *     tags: [Travel-Bag]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: 사용자 인덱스
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: 내 여행 가방 목록 조회가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bag_name:
 *                     type: string
 *                     description: 가방 이름
 *                     example: "여름 휴가"
 *                   departureDate:
 *                     type: string
 *                     format: date
 *                     description: 출발 날짜
 *                     example: "2023-08-15"
 *                   arrivalDate:
 *                     type: string
 *                     format: date
 *                     description: 도착 날짜
 *                     example: "2023-08-20"
 *                   stay_duration:
 *                     type: string
 *                     description: 숙박 기간
 *                     example: "5박 6일"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "user 인덱스를 확인해주세요."
 */
router.get('/user/bag/:uid',travelBagController.getUserBag);

// 일정 해당하는 가방 생성 API
/**
 * @swagger
 * /api/travel-bag/user/bag/{uid}/{pid}:
 *   post:
 *     summary: "내 여행가방 만들기"
 *     description: "특정 사용자의 여행 계획에 새로운 가방을 만드는 API"
 *     tags: [Travel-Bag]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: 사용자 인덱스
 *         schema:
 *           type: number
 *       - in: path
 *         name: pid
 *         required: true
 *         description: 계획 인덱스
 *         schema:
 *           type: number
 *     requestBody:
 *       description: 새 가방 이름
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bagname:
 *                 type: string
 *                 description: 가방 이름
 *                 example: "여름 휴가 가방"
 *     responses:
 *       "200":
 *         description: 내 여행가방 만들기가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "내 여행가방 생성 성공"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "user 인덱스를 확인해주세요."
 */
router.post('/user/bag/:uid/:pid', travelBagController.createBag);

//여행 가방 리스트와 가방 내 준비물 불러오기 API
/**
 * @swagger
 * /api/travel-bag/user/bag/material/{pid}:
 *   get:
 *     summary: "여행 가방 리스트와 가방 내 준비물 불러오기"
 *     description: "특정 계획에 속한 여행 가방 리스트와 해당 가방 내 준비물을 조회하는 API"
 *     tags: [Travel-Bag]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: 계획 인덱스
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: 여행 가방 리스트와 가방 내 준비물 조회가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bag_name:
 *                     type: string
 *                     description: 가방 이름
 *                     example: "여름 휴가 가방"
 *                   materials_name:
 *                     type: string
 *                     description: 준비물 이름
 *                     example: "수영복"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "plan 인덱스를 확인해주세요."
 */
router.get('/user/bag/material/:pid', travelBagController.getUserBagMaterial);

//여행지별 추천 준비물 불러오기 API
/**
 * @swagger
 * /api/travel-bag/material/{cid}:
 *   get:
 *     summary: "여행지별 준비물 불러오기"
 *     description: "특정 여행지에 필요한 준비물을 조회하는 API"
 *     tags: [Travel-Bag]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: 여행지 인덱스
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: 여행지별 준비물 조회가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   materials_name:
 *                     type: string
 *                     description: 준비물 이름
 *                     example: "해수욕복"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "country 인덱스를 확인해주세요."
 */
router.get('/material/:cid',travelBagController.getCountryMaterial);

//여행지별 날씨 불러오기 API

//가방 내부에 메모 작성 API
/**
 * @swagger
 * /api/travel-bag/bag/memo/{bid}:
 *   post:
 *     summary: "가방 내부에 메모 작성"
 *     description: "특정 가방 내부에 메모를 작성하는 API"
 *     tags: [Travel-Bag]
 *     parameters:
 *       - in: path
 *         name: bid
 *         required: true
 *         description: 가방 인덱스
 *         schema:
 *           type: number
 *     requestBody:
 *       description: 가방 내부 메모
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memo:
 *                 type: string
 *                 description: 가방 내부 메모
 *                 example: "여행용 가방에 필요한 물건들"
 *     responses:
 *       "200":
 *         description: 가방 내부 메모 작성이 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "가방 내부 메모 작성 성공"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "bag 인덱스를 확인해주세요."
 */
router.post('/bag/memo/:bid',travelBagController.createBagMemo);

//가방 준비물 추가 API
/**
 * @swagger
 * /api/travel-bag/bag/material/{bid}:
 *   post:
 *     summary: "가방 내부에 준비물 추가"
 *     description: "특정 가방 내부에 준비물을 추가하는 API"
 *     tags: [Travel-Bag]
 *     parameters:
 *       - in: path
 *         name: bid
 *         required: true
 *         description: 가방 인덱스
 *         schema:
 *           type: number
 *     requestBody:
 *       description: 가방 내부에 추가할 준비물
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               material:
 *                 type: string
 *                 description: 추가할 준비물 이름
 *                 example: "여행용 마스크"
 *     responses:
 *       "200":
 *         description: 가방 내부에 준비물 추가가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "가방 내부에 준비물 추가 성공"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "bag 인덱스를 확인해주세요."
 */
router.post('/bag/material/:bid',travelBagController.createBagMaterial);

//가방 준비물 이름 수정 API
/**
 * @swagger
 * /api/travel-bag/bag/material/{mid}:
 *   put:
 *     summary: "가방 준비물 이름 수정"
 *     description: "특정 가방 준비물의 이름을 수정하는 API"
 *     tags: [Travel-Bag]
 *     parameters:
 *       - in: path
 *         name: mid
 *         required: true
 *         description: 준비물 인덱스
 *         schema:
 *           type: number
 *     requestBody:
 *       description: 수정할 준비물 이름
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               material:
 *                 type: string
 *                 description: 수정할 준비물 이름
 *                 example: "새로운 준비물 이름"
 *     responses:
 *       "200":
 *         description: 가방 준비물 이름 수정이 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "가방 준비물 이름 수정 완료"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "material 인덱스를 확인해주세요."
 */
router.put('/bag/material/:mid',travelBagController.updateBagMaterial);

//가방 준비물 삭제 API
/**
 * @swagger
 * /api/travel-bag/bag/material/{mid}:
 *   delete:
 *     summary: "가방 준비물 삭제"
 *     description: "특정 가방 준비물을 삭제하는 API"
 *     tags: [Travel-Bag]
 *     parameters:
 *       - in: path
 *         name: mid
 *         required: true
 *         description: 준비물 인덱스
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: 가방 준비물 삭제가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "가방 준비물 삭제 성공"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "material 인덱스를 확인해주세요."
 */
router.delete('/bag/material/:mid',travelBagController.deleteBagMaterial);

//가방 준비물 체크박스 체크기능 API
/**
 * @swagger
 * /api/travel-bag/material/check/{bid}/{mid}:
 *   post:
 *     summary: "가방 준비물 체크"
 *     description: "특정 가방 내부의 준비물 체크 상태를 변경하는 API"
 *     tags: [Travel-Bag]
 *     parameters:
 *       - in: path
 *         name: bid
 *         required: true
 *         description: 가방 인덱스
 *         schema:
 *           type: number
 *       - in: path
 *         name: mid
 *         required: true
 *         description: 준비물 인덱스
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: 가방 준비물 체크 변경 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "가방 내부의 준비물 체크 상태 변경 완료"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "bag 인덱스 또는 materials 인덱스를 확인해주세요."
 */
router.post('/material/check/:bid/:mid',travelBagController.MaterialCheck);



//일정에 해당하는 가방 리스트 불러오기 API
/**
 * @swagger
 * /api/travel-bag/user/plan/bag/{pid}:
 *   get:
 *     summary: "일정에 해당하는 가방 모두 불러오기"
 *     description: "특정 일정에 해당하는 모든 가방을 조회하는 API"
 *     tags: [Travel-Bag]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: 일정 인덱스
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: 일정에 해당하는 가방 조회가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bag_index:
 *                     type: number
 *                     description: 가방 인덱스
 *                     example: 1
 *                   user_index:
 *                     type: number
 *                     description: 사용자 인덱스
 *                     example: 123
 *                   bag_name:
 *                     type: string
 *                     description: 가방 이름
 *                     example: "여름 휴가 가방"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "plan 인덱스를 확인해주세요."
 */
router.get('/user/plan/bag/:pid',travelBagController.getUserPlanBag);

module.exports = router;