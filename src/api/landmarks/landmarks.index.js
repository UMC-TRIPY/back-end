const router = require("express").Router();
const landmarkController = require("./landmarks.controller");

router.get("/search-landmarks", landmarkController.searchLandmark);
router.get("/popular", landmarkController.getPopularLandmark);

// GET /api/landmarks/filtering-search?continent={continent}&country={country}&city={city}
router.post("/filtering-search", landmarkController.filteringSearch);

module.exports = router;
