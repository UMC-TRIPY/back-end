let travelPlanService = require("./travel-plan.service");

exports.createTravelPlan = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { departureDate, arrivalDate, cityId } = req.body;

    console.log(userId, departureDate, arrivalDate);

    const travelPlanId = await travelPlanService.createTravel(
      userId,
      departureDate,
      arrivalDate
    );

    console.log(travelPlanId);

    await travelPlanService.createCityPlan(travelPlanId, cityId);

    res.status(201).send({ message: "여행 계획 등록에 성공하였습니다!" });
  } catch (err) {
    res.status(500).send({ message: "서버 내부 오류" });
  }
};
