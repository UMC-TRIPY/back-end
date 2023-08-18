const { logging } = require("googleapis/build/src/apis/logging");
const tagRepository = require("./tag.repository");

exports.findOrCreateTag = async (tag_name) => {
  const tag = await tagRepository.getTagByName(tag_name);

  if (tag.length === 0) {
    await tagRepository.createTag(tag_name);

    const tag = await tagRepository.getTagByName(tag_name);

    return tag;
  }

  return tag[0];
};
