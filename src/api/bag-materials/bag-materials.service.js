const bagMaterialRepository = require("./bag-materials.repository");

exports.createBagMaterials = async (bagIndex, materialIndex) => {
  await bagMaterialRepository.createBagMaterials(bagIndex, materialIndex);
};
