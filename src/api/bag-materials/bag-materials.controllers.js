const bagMaterialService = require("./bag-materials.service");

exports.createBagMaterials = async (req, res) => {
  try {
    const { bagIndex, materialIndex } = req.body;
    await bagMaterialService.createBagMaterials(bagIndex, materialIndex);

    res.status(201).send({ message: "준비물 담기 성공!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버 내부 오류" });
  }
};
