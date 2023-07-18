const router = require("express").Router();
const travelPlanController = require("./travel-plan.controller");

router.post("/:userId", travelPlanController.createTravelPlan);

module.exports = router;
