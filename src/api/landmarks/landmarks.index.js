const router = require("express").Router();
const landmarkController = require("./landmarks.controller");

router.get("/", function (req, res) {
  res.send("Hello World");
});

router.get("/search-landmarks", landmarkController.searchLandmark);

router.get("/popular", landmarkController.getPopularLandmark);

module.exports = router;
