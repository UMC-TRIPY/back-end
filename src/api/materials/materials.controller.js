const materialService = require("./meterials.service");

exports.getMaterials = async (req, res) => {
  try {
    const materialList = await materialService.getMaterials();

    res.send(materialList);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버 내부 오류" });
  }
};
