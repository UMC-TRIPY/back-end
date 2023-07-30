const router = require("express").Router();
const bagMaterialController = require("./bag-materials.controller");

router.post("/", bagMaterialController.createBagMaterials);

module.exports = router;
