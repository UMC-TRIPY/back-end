const router = require("express").Router();
const travelPlanController = require("./travel-plans.controller");

router.post("/user/:userId", travelPlanController.createTravelPlan);

module.exports = router;
