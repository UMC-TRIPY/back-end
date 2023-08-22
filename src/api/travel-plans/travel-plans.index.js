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

//여행 등록 API
/**
 * @swagger
 * /api/travel-plans/user/travel/{uid}:
 *   post:
 *     summary: "여행 등록"
 *     description: "사용자의 여행 계획을 등록하는 API"
 *     tags: [Travel-Plan]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: 유저 인덱스
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cityname:
 *                 type: string
 *                 description: 도시 이름
 *               departureDate:
 *                 type: string
 *                 format: date
 *                 description: 출발 날짜
 *               arrivalDate:
 *                 type: string
 *                 format: date
 *                 description: 도착 날짜
 *     responses:
 *       "200":
 *         description: 여행 계획 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "여행 계획 등록에 성공하였습니다!"
 *       "400":
 *         description: 서버 내부 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 내부 오류"
 */
router.post("/user/travel/:uid", travelPlanController.postTravelPlan);

//내가 생성한 여행 목록 조회 API
/**
 * @swagger
 * /api/travel-plans/user/made/plan/{uid}:
 *   get:
 *     summary: 내가 생성한 여행 목록 조회
 *     description: 내가 생성한 여행 목록을 조회하는 API
 *     tags: [Travel-Plan]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: 사용자 인덱스
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: 여행 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 travelPlans:
 *                   type: array
 *                   description: 여행 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       city_name:
 *                         type: string
 *                         description: 도시 이름
 *                         example: "서울"
 *                       departureDate:
 *                         type: string
 *                         format: date
 *                         description: 출발 날짜
 *                         example: "2023-08-15"
 *                       arrivalDate:
 *                         type: string
 *                         format: date
 *                         description: 도착 날짜
 *                         example: "2023-08-20"
 *                       plan_index:
 *                         type: number
 *                         description: 여행 계획 인덱스
 *                         example: 1
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
 *       "500":
 *         description: 서버 내부 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "에러"
 */
router.get("/user/made/plan/:uid",travelPlanController.UserMadeTravelPlan);


//내 여행 목록 조회 API
/**
 * @swagger
 * /api/travel-plans/user/plans/{uid}:
 *   get:
 *     summary: "사용자 여행 계획 조회"
 *     description: "특정 사용자의 여행 계획을 조회하는 API"
 *     tags: [Travel-Plan]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: 사용자 인덱스
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: 여행 계획 조회가 성공한 경우
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
 *                   plan_index:
 *                     type: number
 *                     description: 여행 계획 인덱스
 *                     example: 2
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
router.get('/user/plans/:uid', travelPlanController.getUserTravelPlan);

//일정 공유 중인 친구 조회 API
/**
 * @swagger
 * /api/travel-plans/user/plans/friend/{uid}:
 *   get:
 *     summary: "일정 공유 중인 친구 조회"
 *     description: "일정 공유 중인 친구 API"
 *     tags: [Travel-Plan]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: 사용자 인덱스 (친구의 인덱스)
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: 친구의 여행 계획 조회가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: number
 *                     description: 친구의 인덱스
 *                     example: 2
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "user_index 확인해주세요."
 */
router.get('/user/plans/friend/:uid', travelPlanController.getFriendTravelPlan);

//일정에 친구 초대 기능 API
/**
 * @swagger
 * /api/travel-plans/user/plans/friend/{uid}/{pid}:
 *   post:
 *     summary: "일정에 친구 초대"
 *     description: "특정 일정에 친구를 초대하는 API"
 *     tags: [Travel-Plan]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: 유저1 인덱스
 *         schema:
 *           type: number
 *       - in: path
 *         name: pid
 *         required: true
 *         description: 일정 인덱스
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid2:
 *                 type: number
 *                 description: 친구 유저 인덱스
 *                 example: 1
 *     responses:
 *       "200":
 *         description: 친구 초대가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   description: 쿼리 결과
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "plan_index 확인해주세요"
 */
router.post('/user/plans/friend/:uid/:pid',travelPlanController.postFriendTravelPlan);

//상세 일정 추가 기능 API
/**
 * @swagger
 * /api/travel-plans/user/plans/detailed/{pid}:
 *   post:
 *     summary: "상세 일정 추가"
 *     description: "특정 일정에 상세 일정을 추가하는 API"
 *     tags: [Travel-Plan]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: 일정 인덱스
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan_date:
 *                 type: string
 *                 format: date
 *                 description: 상세 일정 날짜
 *                 example: "2023-08-15"
 *               plan_color:
 *                 type: string
 *                 description: 상세 일정 색상
 *                 example: "1"
 *               plan_lineColor:
 *                 type: string
 *                 description: plan line color
 *                 example: "1"
 *               plan_title:
 *                 type: string
 *                 description: 상세 일정 제목
 *                 example: "맛집 탐방"
 *               plan_column:
 *                 type: number
 *                 description: column
 *                 example: "3"
 *               start_time:
 *                 type: number
 *                 format: time
 *                 description: 시작 시간
 *                 example: "09:00:00"
 *               plan_halfHour:
 *                 type: number
 *                 description: 시간 사이클
 *                 example: "3"
 *               plan_place:
 *                 type: string
 *                 description: 장소
 *                 example: "SEOUL"
 *               plan_budget:
 *                 type: string
 *                 description: 예산
 *                 example: 10000만원
 *               plan_memo:
 *                 type: string
 *                 description: 메모
 *                 example: "맛있는 음식 맛보기"
 *               plan_image:
 *                 type: string
 *                 description: 이미지 URL
 *                 example: "https://example.com/image.jpg"
 *               plan_file:
 *                 type: string
 *                 description: 파일 URL
 *                 example: "https://example.com/file.pdf"
 *     responses:
 *       "200":
 *         description: 상세 일정 추가가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "여행 세부 계획 등록에 성공하였습니다!"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "plan_index 확인해주세요"
 */
router.post('/user/plans/detailed/:pid',travelPlanController.postUserDetailedPlan);

//상세 일정 수정 기능 API
/**
 * @swagger
 * /api/travel-plans/user/plans/detailed/{tid}:
 *   put:
 *     summary: "상세 일정 수정"
 *     description: "특정 일정의 상세 일정을 수정하는 API"
 *     tags: [Travel-Plan]
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         description: 상세 일정 인덱스
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan_date:
 *                 type: string
 *                 format: date
 *                 description: 상세 일정 날짜
 *                 example: "2023-08-15"
 *               plan_color:
 *                 type: string
 *                 description: 상세 일정 색상
 *                 example: "2"
 *               plan_lineColor:
 *                 type: string
 *                 description: plan line color
 *                 example: "3"
 *               plan_title:
 *                 type: string
 *                 description: 상세 일정 제목
 *                 example: "주변 둘러보기"
 *               plan_column:
 *                 type: number
 *                 description: column
 *                 example: "2"
 *               start_time:
 *                 type: number
 *                 format: time
 *                 description: 시작 시간
 *                 example: "09:00:00"
 *               plan_halfHour:
 *                 type: number
 *                 description: 시간 사이클
 *                 example: "2"
 *               plan_place:
 *                 type: string
 *                 description: 장소
 *                 example: "OSAKA"
 *               plan_budget:
 *                 type: string
 *                 description: 예산
 *                 example: 5만원
 *               plan_memo:
 *                 type: string
 *                 description: 메모
 *                 example: "오사카 성 가기"
 *               plan_image:
 *                 type: string
 *                 description: 이미지 URL
 *                 example: "https://example.com/image.jpg"
 *               plan_file:
 *                 type: string
 *                 description: 파일 URL
 *                 example: "https://example.com/file.pdf"
 *     responses:
 *       "200":
 *         description: 상세 일정 수정이 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "여행 세부 계획 수정에 성공하였습니다!"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "서버 내부 오류"
 */
router.put('/user/plans/detailed/:tid',travelPlanController.putUserDetailedPlan);

//상세 일정 삭제 기능 API
/**
 * @swagger
 * /api/travel-plans/user/plans/detailed/{tid}:
 *   delete:
 *     summary: "상세 일정 삭제"
 *     description: "특정 일정의 상세 일정을 삭제하는 API"
 *     tags: [Travel-Plan]
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         description: 상세 일정 인덱스
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: 상세 일정 삭제가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "상세 일정 삭제"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "timeplan index입력"
 */

router.delete('/user/plans/detailed/:tid',travelPlanController.deleteUserDetailedPlan);

//전체 일정 조회 기능 API
/**
 * @swagger
 * /api/travel-plans/user/plans/all/{pid}:
 *   get:
 *     summary: "전체 일정 조회"
 *     description: "특정 사용자의 전체 일정을 조회하는 API"
 *     tags: [Travel-Plan]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: 일정 인덱스
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: 전체 일정 조회가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   plan_color:
 *                     type: string
 *                     description: 일정 색상
 *                     example: "1"
 *                   plan_lineColor:
 *                     type: string
 *                     description: plan line color
 *                     example: "2"
 *                   plan_date:
 *                     type: string
 *                     format: date
 *                     description: 일정 날짜
 *                     example: "2023-08-15"
 *                   start_time:
 *                     type: number
 *                     format: time
 *                     description: 시작 시간
 *                     example: "09:00"
 *                   plan_halfHour:
 *                     type: number
 *                     description: 시간 사이클
 *                     example: "4"
 *                   plan_title:
 *                     type: string
 *                     description: 일정 제목
 *                     example: "관광"
 *                   plan_memo:
 *                     type: string
 *                     description: 일정 메모
 *                     example: "유명 관광지 방문"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "plan index 입력"
 */
router.get('/user/plans/all/:pid',travelPlanController.getUserAllTravelPlan);

//상세 일정 조회 기능(하나) API
/**
 * @swagger
 * /api/travel-plans/user/plans/one/{tid}:
 *   get:
 *     summary: "상세 일정 조회 (하나)"
 *     description: "특정 상세 일정을 조회하는 API"
 *     tags: [Travel-Plan]
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         description: 상세 일정 인덱스
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: 상세 일정 조회가 성공한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plan_date:
 *                   type: string
 *                   format: date
 *                   description: 일정 날짜
 *                   example: "2023-08-16"
 *                 plan_color:
 *                   type: string
 *                   description: 일정 색상
 *                   example: "3"
 *                 plan_lineColor:
 *                   type: string
 *                   description: plan line color
 *                   example: "4"
 *                 plan_title:
 *                   type: string
 *                   description: 일정 제목
 *                   example: "관광"
 *                 plan_column:
 *                   type: number
 *                   description: column
 *                   example: "3"
 *                 start_time:
 *                   type: number
 *                   format: time
 *                   description: 시작 시간
 *                   example: "09:00"
 *                 plan_halfHour:
 *                   type: number
 *                   description: 시간 사이클
 *                   example: "1"
 *                 plan_place:
 *                   type: string
 *                   description: 일정 장소
 *                   example: "유명 관광지"
 *                 plan_budget:
 *                   type: string
 *                   description: 일정 예산
 *                   example: "5만원"
 *                 plan_memo:
 *                   type: string
 *                   description: 일정 메모
 *                   example: "유명 관광지 방문"
 *                 plan_image:
 *                   type: string
 *                   description: 일정 이미지 URL
 *                   example: "https://example.com/image.jpg"
 *                 plan_file:
 *                   type: string
 *                   description: 일정 파일 URL
 *                   example: "https://example.com/file.pdf"
 *       "400":
 *         description: 잘못된 요청 또는 값이 들어온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "timeplan_index 입력"
 */
router.get('/user/plans/one/:tid',travelPlanController.getUserOneTravelPlan);


module.exports = router;