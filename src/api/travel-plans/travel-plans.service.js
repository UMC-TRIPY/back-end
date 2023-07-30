const travelPlanRepository = require("./travel-plans.repository");

exports.createTravel = async (userId, departureDate, arrivalDate) => {
  const createdTravelPlanId = await travelPlanRepository.createTravelPlan(
    userId,
    departureDate,
    arrivalDate
  );

  return createdTravelPlanId;
};

exports.createCityPlan = async (travelPlanId, cityId) => {
  const createdCityPlan = await travelPlanRepository.createCityPlan(
    travelPlanId,
    cityId
  );
};
