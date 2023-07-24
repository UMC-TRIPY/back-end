const materialRepository = require("./materials.repository");

exports.getMaterials = async () => {
  const materialList = await materialRepository.getMaterials();

  return materialList;
};
