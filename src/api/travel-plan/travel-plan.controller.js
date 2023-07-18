let travelPlanService = require("./travel-plan.service");

exports.createTravelPlan = async (req, res) => {
  try {
    const userId = req.param.userId;
    const { departureDate, arrivalDate, cityId } = req.body;

    const travelPlan = await this.travelPlanService.createTravel(
      userId,
      departureDate,
      arrivalDate
    );

    await this.travelPlanService.createCityPlan(travelPlan.id, cityId);

    res.send(travelPlan);
  } catch (err) {
    throw err;
  }
};
