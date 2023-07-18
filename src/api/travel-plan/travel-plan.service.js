const travelPlanRepository = require("./travel-plan.repository");

exports.createTravel = async (userId, departureDate, arrivalDate) => {
  const createdTravelPlan = await travelPlanRepository.createTravelPlan(
    userId,
    departureDate,
    arrivalDate
  );

  return createdTravelPlan;
};

exports.createCityPlan = async (travelPlanId, userId) => {
  const createdCityPlan = await travelPlanRepository.createCityPlan(
    travelPlanId,
    userId
  );

  return createdCityPlan;
};
