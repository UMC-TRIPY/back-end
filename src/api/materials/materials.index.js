const router = require("express").Router();
const materialController = require("./materials.controller");

router.get("/", materialController.getMaterials);

module.exports = router;
